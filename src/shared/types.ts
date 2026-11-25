export type Lang = 'bg' | 'en' | 'de';
export const LANGS: Lang[] = ['bg', 'en', 'de'];

export interface ElementText { n: string; f: string; h: string }

export interface ElementDef {
  id: string;
  cat: string;
  emoji: string;
  start?: boolean;
  /** the key element closes its chapter */
  key?: boolean;
  recipes: [string, string][];
  t: Record<Lang, ElementText>;
}

export interface NearMiss { pair: [string, string]; t: Record<Lang, string> }

export interface ChapterDef {
  id: string;
  elements: ElementDef[];
  near: NearMiss[];
}

/** what the client gets: everything except the recipes */
export interface ContentElement {
  id: string;
  chapter: string;
  cat: string;
  emoji: string;
  icon: boolean;
  start: boolean;
  key: boolean;
  tier: number;
  t: Record<Lang, ElementText>;
}

export interface Content {
  chapters: { id: string; size: number }[];
  elements: ContentElement[];
}

export interface Discovery { id: string; at: number; via: 'start' | 'combine' | 'skip'; points: number }

export interface HintState {
  target: string | null;
  level: number;
  /** level 2+: the first ingredient, level 3: the second one too (shown as a silhouette) */
  ingredients: string[];
  free: boolean;
  canSkip: boolean;
}

export interface ChapterState { id: string; total: number; found: number; unlocked: boolean; done: boolean }

export interface GameState {
  profile: { id: number; name: string; avatar: string; points: number; hints: number; streak: number };
  discovered: Discovery[];
  exhausted: string[];
  hint: HintState;
  chapters: ChapterState[];
  unlockPercent: number;
}

export interface CombineResult {
  results: { id: string; isNew: boolean; points: number }[];
  tried: boolean;
  /** an "almost!" clue for a pair that makes sense but comes too early */
  near: Record<Lang, string> | null;
  bonus: { streak: number; chapter: number };
  state: GameState;
}

// points by tier and title thresholds, shared so the client can show them
export const TIER_POINTS = [10, 20, 30, 50];
export const HINT_FACTOR = [1, 0.75, 0.5, 0.25];
export const STREAK_EVERY = 5;
export const STREAK_BONUS = 25;
export const CHAPTER_BONUS = 200;
export const HINT_EVERY = 5;
export const START_HINTS = 3;
/** this many or fewer left in a chapter: hints are free */
export const FREE_HINTS_LEFT = 4;
export const TITLES = [0, 100, 250, 500, 900, 1500, 2500];
