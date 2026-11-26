import type { ChapterDef } from '../types';
import { COSMOS } from './cosmos';
import { COSMOS_NEAR } from './cosmos-near';
import { EARTH } from './earth';
import { EARTH_NEAR } from './earth-near';

export const CHAPTERS: ChapterDef[] = [
  { id: 'cosmos', elements: COSMOS, near: COSMOS_NEAR },
  { id: 'earth', elements: EARTH, near: EARTH_NEAR },
];
