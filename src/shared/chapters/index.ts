import type { ChapterDef } from '../types';
import { COSMOS } from './cosmos';
import { COSMOS_NEAR } from './cosmos-near';

export const CHAPTERS: ChapterDef[] = [
  { id: 'cosmos', elements: COSMOS, near: COSMOS_NEAR },
];
