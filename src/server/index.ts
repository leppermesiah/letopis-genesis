import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildContent, validate } from '../shared/graph';
import { openDb } from './db';
import { Game, HttpError } from './game';

const PORT = Number(process.env.GENESIS_PORT || 2230);
const DATA = process.env.GENESIS_DATA || '/data';
const UNLOCK = Math.min(100, Math.max(1, Number(process.env.GENESIS_UNLOCK_PERCENT || 100)));
const ADMIN_PIN = (process.env.GENESIS_ADMIN_PIN || '').trim();
const PUBLIC = join(fileURLToPath(new URL('.', import.meta.url)), 'public');

const problems = validate();
if (problems.length) {
  console.error('content problems:\n' + problems.join('\n'));
  process.exit(1);
}

const game = new Game(openDb(DATA), UNLOCK, ADMIN_PIN);
const content = JSON.stringify(buildContent((id) => existsSync(join(PUBLIC, 'icons', `${id}.webp`))));
const version = existsSync(join(PUBLIC, 'version.json')) ? readFileSync(join(PUBLIC, 'version.json'), 'utf8') : '{}';

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.map': 'application/json',
};

function send(res: ServerResponse, status: number, body: unknown) {
  const s = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(s);
}

async function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const c of req) {
    size += (c as Buffer).length;
    if (size > 16_384) throw new HttpError(413, 'too_big');
    chunks.push(c as Buffer);
  }
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new HttpError(400, 'json'); }
}

const token = (req: IncomingMessage) => req.headers.authorization?.replace(/^Bearer\s+/i, '') || undefined;

async function api(req: IncomingMessage, res: ServerResponse, path: string) {
  const m = req.method || 'GET';
  if (m === 'GET' && path === '/api/health') return send(res, 200, { ok: true });
  if (m === 'GET' && path === '/api/info') return send(res, 200, { unlockPercent: UNLOCK, admin: game.adminEnabled, ...JSON.parse(version) });
  if (m === 'GET' && path === '/api/profiles') return send(res, 200, game.listProfiles());
  if (m === 'GET' && path === '/api/state') return send(res, 200, game.state(game.auth(token(req))));
  if (m !== 'POST') throw new HttpError(404, 'not_found');
  const b = await readBody(req);
  switch (path) {
    case '/api/profiles': return send(res, 200, game.createProfile(b.name, b.avatar, b.pin));
    case '/api/login': return send(res, 200, game.login(b.id, b.pin));
    case '/api/logout': { const t = token(req); if (t) game.logout(t); return send(res, 200, { ok: true }); }
    case '/api/combine': return send(res, 200, game.combine(game.auth(token(req)), b.a, b.b));
    case '/api/hint': return send(res, 200, game.hint(game.auth(token(req))));
    case '/api/skip': return send(res, 200, game.skip(game.auth(token(req))));
    case '/api/reset': return send(res, 200, game.reset(game.auth(token(req)), b.pin));
    case '/api/admin/pin': game.adminSetPin(b.admin, b.id, b.pin); return send(res, 200, { ok: true });
    case '/api/admin/delete': game.adminDelete(b.admin, b.id); return send(res, 200, { ok: true });
  }
  throw new HttpError(404, 'not_found');
}

function serveStatic(req: IncomingMessage, res: ServerResponse, path: string) {
  if (path === '/content.json') {
    res.writeHead(200, { 'content-type': TYPES['.json'], 'cache-control': 'no-cache' });
    return res.end(content);
  }
  const rel = normalize(decodeURIComponent(path === '/' ? '/index.html' : path)).replace(/^(\.\.[/\\])+/, '');
  const file = join(PUBLIC, rel);
  if (!file.startsWith(PUBLIC) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    return res.end('not found');
  }
  const ext = extname(file);
  const immutable = ext === '.webp' || ext === '.png';
  res.writeHead(200, {
    'content-type': TYPES[ext] || 'application/octet-stream',
    'cache-control': immutable ? 'public, max-age=604800' : 'no-cache',
  });
  res.end(readFileSync(file));
}

createServer(async (req, res) => {
  const path = (req.url || '/').split('?')[0];
  try {
    if (path.startsWith('/api/')) await api(req, res, path);
    else serveStatic(req, res, path);
  } catch (e) {
    if (e instanceof HttpError) return send(res, e.status, { error: e.code });
    console.error(e);
    send(res, 500, { error: 'server' });
  }
}).listen(PORT, () => console.log(`Letopis - Genesis on :${PORT}, data in ${DATA}, unlock at ${UNLOCK}%`));
