// npm run check: the content must be complete and every element reachable
import { DEPTH, ELEMENTS, tierOf, validate } from '../src/shared/graph';

const errors = validate();
const byTier = [0, 0, 0, 0];
for (const e of ELEMENTS.values()) byTier[tierOf(e.id)]++;
console.log(`${ELEMENTS.size} elements, deepest ${Math.max(...DEPTH.values())} steps, tiers ${byTier.join('/')}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('content ok');
