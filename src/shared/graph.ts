import { CHAPTERS } from './chapters';
import { LANGS, pairKey, type Content, type ElementDef, type Lang } from './types';

export { pairKey };

export const ELEMENTS = new Map<string, ElementDef & { chapter: string }>();
for (const ch of CHAPTERS) for (const e of ch.elements) ELEMENTS.set(e.id, { ...e, chapter: ch.id });


/** pair -> what it makes */
export const PAIRS = new Map<string, string[]>();
/** element -> the elements it is an ingredient of */
export const USES = new Map<string, Set<string>>();
for (const e of ELEMENTS.values()) {
  for (const [a, b] of e.recipes) {
    const k = pairKey(a, b);
    PAIRS.set(k, [...(PAIRS.get(k) ?? []), e.id]);
    for (const x of [a, b]) {
      if (!USES.has(x)) USES.set(x, new Set());
      USES.get(x)!.add(e.id);
    }
  }
}

/** "almost!" clues by pair */
export const NEAR = new Map<string, Record<Lang, string>>();
for (const ch of CHAPTERS) for (const n of ch.near) NEAR.set(pairKey(n.pair[0], n.pair[1]), n.t);

/** steps from the starting elements: the shortest way to make it */
export const DEPTH = new Map<string, number>();
for (const e of ELEMENTS.values()) if (e.start) DEPTH.set(e.id, 0);
for (let changed = true; changed; ) {
  changed = false;
  for (const e of ELEMENTS.values()) {
    for (const [a, b] of e.recipes) {
      const da = DEPTH.get(a), db = DEPTH.get(b);
      if (da === undefined || db === undefined) continue;
      const d = Math.max(da, db) + 1;
      if (d < (DEPTH.get(e.id) ?? Infinity)) { DEPTH.set(e.id, d); changed = true; }
    }
  }
}

export const tierOf = (id: string) => {
  const d = DEPTH.get(id) ?? 0;
  return d <= 3 ? 0 : d <= 6 ? 1 : d <= 9 ? 2 : 3;
};

export const STARTERS = [...ELEMENTS.values()].filter((e) => e.start).map((e) => e.id);

/** content for the client: no recipes */
export function buildContent(hasIcon: (id: string) => boolean): Content {
  return {
    chapters: CHAPTERS.map((c) => ({ id: c.id, size: c.elements.length })),
    elements: [...ELEMENTS.values()].map((e) => ({
      id: e.id, chapter: e.chapter, cat: e.cat, emoji: e.emoji, icon: hasIcon(e.id),
      start: !!e.start, key: !!e.key, tier: tierOf(e.id), t: e.t,
    })),
  };
}

/** problems with the data: unknown ingredients, unreachable elements, missing texts */
export function validate(): string[] {
  const errors: string[] = [];
  for (const e of ELEMENTS.values()) {
    if (!e.start && e.recipes.length === 0) errors.push(`${e.id}: no recipe`);
    for (const [a, b] of e.recipes) for (const x of [a, b]) if (!ELEMENTS.has(x)) errors.push(`${e.id}: unknown ingredient ${x}`);
    if (!DEPTH.has(e.id)) errors.push(`${e.id}: cannot be reached from the start`);
    for (const l of LANGS) {
      const t = e.t[l];
      if (!t || !t.n || !t.f || !t.h) errors.push(`${e.id}: missing ${l} text`);
    }
  }
  const seen = new Set<string>();
  for (const e of ELEMENTS.values()) {
    for (const [a, b] of e.recipes) {
      const k = `${pairKey(a, b)}=${e.id}`;
      if (seen.has(k)) errors.push(`${e.id}: duplicate recipe ${k}`);
      seen.add(k);
    }
  }
  for (const ch of CHAPTERS) {
    for (const n of ch.near) {
      const k = pairKey(n.pair[0], n.pair[1]);
      for (const x of n.pair) if (!ELEMENTS.has(x)) errors.push(`near ${k}: unknown ${x}`);
      if (PAIRS.has(k)) errors.push(`near ${k}: this pair already makes something`);
      for (const l of LANGS) if (!n.t[l]) errors.push(`near ${k}: missing ${l} text`);
    }
    if (ch.elements.filter((e) => e.key).length !== 1) errors.push(`chapter ${ch.id}: needs exactly one key element`);
    // every recipe of a chapter must use elements of this or earlier chapters
    const idx = CHAPTERS.indexOf(ch);
    const allowed = new Set(CHAPTERS.slice(0, idx + 1).flatMap((c) => c.elements.map((e) => e.id)));
    for (const e of ch.elements) for (const [a, b] of e.recipes) for (const x of [a, b]) if (!allowed.has(x)) errors.push(`${e.id}: uses ${x} from a later chapter`);
  }
  return errors;
}
