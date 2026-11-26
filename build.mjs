import { build } from 'esbuild';
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// every build gets its own id: the page reloads itself when the server runs a newer build
const BUILD = process.env.GENESIS_BUILD || Date.now().toString(36);
// shown version: the full one from package.json, e.g. "0.20.3"
const VERSION = JSON.parse(readFileSync('package.json', 'utf8')).version;

if (process.argv.includes('--check')) {
  await build({ entryPoints: ['scripts/check.ts'], bundle: true, platform: 'node', target: 'node22', format: 'esm', outfile: 'dist/check.mjs', logLevel: 'warning' });
  await import(new URL('./dist/check.mjs', import.meta.url).href);
  process.exit(0);
}

mkdirSync('dist/public', { recursive: true });
cpSync('public', 'dist/public', { recursive: true });

await build({
  entryPoints: ['src/server/index.ts'],
  bundle: true, platform: 'node', target: 'node22', format: 'esm',
  outfile: 'dist/server.js', sourcemap: true,
});

await build({
  entryPoints: ['src/client/main.ts'],
  bundle: true, platform: 'browser', target: 'es2022', format: 'esm',
  outfile: 'dist/public/app.js', minify: true, sourcemap: true,
  define: { __BUILD__: JSON.stringify(BUILD), __VERSION__: JSON.stringify(VERSION) },
});
const html = readFileSync('dist/public/index.html', 'utf8')
  .replace('href="style.css"', `href="style.css?v=${BUILD}"`)
  .replace('src="app.js"', `src="app.js?v=${BUILD}"`);
writeFileSync('dist/public/index.html', html);
writeFileSync('dist/public/version.json', JSON.stringify({ build: BUILD, version: VERSION }));
console.log('build ok', VERSION, BUILD);
