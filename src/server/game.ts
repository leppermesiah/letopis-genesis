import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { CHAPTERS } from '../shared/chapters';
import { DEPTH, ELEMENTS, PAIRS, STARTERS, USES, pairKey, tierOf } from '../shared/graph';
import {
  CHAPTER_BONUS, FREE_HINTS_LEFT, HINT_EVERY, HINT_FACTOR, START_HINTS, STREAK_BONUS, STREAK_EVERY, TIER_POINTS,
  type ChapterState, type CombineResult, type Discovery, type GameState, type HintState,
} from '../shared/types';
import type { Db } from './db';

export class HttpError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}

interface ProfileRow {
  id: number; name: string; avatar: string; pin_salt: string; pin_hash: string;
  points: number; hints: number; streak: number; earned: number;
  hint_target: string | null; hint_level: number; fails: number; locked_until: number;
}

const hashPin = (pin: string, salt: string) => scryptSync(pin, salt, 32).toString('hex');
const checkPinFormat = (pin: unknown): string => {
  if (typeof pin !== 'string' || !/^\d{4}$/.test(pin)) throw new HttpError(400, 'pin_format');
  return pin;
};

export class Game {
  constructor(private db: Db, private unlockPercent: number, private adminPin: string) {}

  // ---------- profiles ----------

  listProfiles() {
    return this.db.prepare('SELECT id, name, avatar, points FROM profiles ORDER BY id').all();
  }

  createProfile(name: unknown, avatar: unknown, pin: unknown) {
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 24) throw new HttpError(400, 'name');
    if (typeof avatar !== 'string' || avatar.length > 16) throw new HttpError(400, 'avatar');
    const p = checkPinFormat(pin);
    const salt = randomBytes(16).toString('hex');
    const r = this.db.prepare('INSERT INTO profiles (name, avatar, pin_salt, pin_hash, created, hints) VALUES (?, ?, ?, ?, ?, ?)')
      .run(name.trim(), avatar, salt, hashPin(p, salt), Date.now(), START_HINTS);
    const id = Number(r.lastInsertRowid);
    this.seed(id);
    return this.newSession(id);
  }

  private seed(id: number) {
    const ins = this.db.prepare("INSERT OR IGNORE INTO discoveries (profile_id, element, at, via, points) VALUES (?, ?, ?, 'start', 0)");
    for (const s of STARTERS) ins.run(id, s, Date.now());
  }

  private row(id: number): ProfileRow {
    const r = this.db.prepare('SELECT * FROM profiles WHERE id = ?').get(id) as ProfileRow | undefined;
    if (!r) throw new HttpError(404, 'no_profile');
    return r;
  }

  /** wrong PINs: after 5 the profile waits 30 seconds */
  private verifyPin(r: ProfileRow, pin: unknown) {
    const p = checkPinFormat(pin);
    if (r.locked_until > Date.now()) throw new HttpError(429, 'locked');
    const ok = timingSafeEqual(Buffer.from(hashPin(p, r.pin_salt), 'hex'), Buffer.from(r.pin_hash, 'hex'));
    if (!ok) {
      const fails = r.fails + 1;
      this.db.prepare('UPDATE profiles SET fails = ?, locked_until = ? WHERE id = ?')
        .run(fails >= 5 ? 0 : fails, fails >= 5 ? Date.now() + 30_000 : 0, r.id);
      throw new HttpError(403, 'wrong_pin');
    }
    if (r.fails) this.db.prepare('UPDATE profiles SET fails = 0 WHERE id = ?').run(r.id);
  }

  login(id: unknown, pin: unknown) {
    this.verifyPin(this.row(Number(id)), pin);
    return this.newSession(Number(id));
  }

  private newSession(profileId: number) {
    const token = randomBytes(24).toString('base64url');
    this.db.prepare('INSERT INTO sessions (token, profile_id, created) VALUES (?, ?, ?)').run(token, profileId, Date.now());
    return { token, id: profileId };
  }

  logout(token: string) {
    this.db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  }

  auth(token: string | undefined): number {
    if (!token) throw new HttpError(401, 'auth');
    const r = this.db.prepare('SELECT profile_id FROM sessions WHERE token = ?').get(token) as { profile_id: number } | undefined;
    if (!r) throw new HttpError(401, 'auth');
    return r.profile_id;
  }

  /** a new game: everything of this profile is wiped and it starts again from the beginning */
  reset(id: number, pin: unknown) {
    this.verifyPin(this.row(id), pin);
    this.db.exec('BEGIN');
    try {
      this.db.prepare('DELETE FROM discoveries WHERE profile_id = ?').run(id);
      this.db.prepare('DELETE FROM tried WHERE profile_id = ?').run(id);
      this.db.prepare('UPDATE profiles SET points = 0, hints = ?, streak = 0, earned = 0, hint_target = NULL, hint_level = 0 WHERE id = ?')
        .run(START_HINTS, id);
      this.seed(id);
      this.db.exec('COMMIT');
    } catch (e) { this.db.exec('ROLLBACK'); throw e; }
    return this.state(id);
  }

  // ---------- admin ----------

  get adminEnabled() { return this.adminPin.length > 0; }

  private checkAdmin(pin: unknown) {
    if (!this.adminEnabled) throw new HttpError(403, 'admin_off');
    if (typeof pin !== 'string' || pin.length !== this.adminPin.length
      || !timingSafeEqual(Buffer.from(pin), Buffer.from(this.adminPin))) throw new HttpError(403, 'wrong_pin');
  }

  adminSetPin(adminPin: unknown, id: unknown, pin: unknown) {
    this.checkAdmin(adminPin);
    const r = this.row(Number(id));
    const p = checkPinFormat(pin);
    const salt = randomBytes(16).toString('hex');
    this.db.prepare('UPDATE profiles SET pin_salt = ?, pin_hash = ?, fails = 0, locked_until = 0 WHERE id = ?').run(salt, hashPin(p, salt), r.id);
    this.db.prepare('DELETE FROM sessions WHERE profile_id = ?').run(r.id);
  }

  adminDelete(adminPin: unknown, id: unknown) {
    this.checkAdmin(adminPin);
    this.db.prepare('DELETE FROM profiles WHERE id = ?').run(this.row(Number(id)).id);
  }

  // ---------- the game ----------

  private discovered(id: number): Discovery[] {
    return this.db.prepare('SELECT element AS id, at, via, points FROM discoveries WHERE profile_id = ? ORDER BY at, rowid').all(id) as unknown as Discovery[];
  }

  private chapters(found: Set<string>): ChapterState[] {
    const out: ChapterState[] = [];
    let unlocked = true;
    for (const ch of CHAPTERS) {
      const total = ch.elements.length;
      const n = ch.elements.filter((e) => found.has(e.id)).length;
      out.push({ id: ch.id, total, found: n, unlocked, done: n === total });
      unlocked = unlocked && (n / total) * 100 >= this.unlockPercent;
    }
    return out;
  }

  private unlockedSet(found: Set<string>) {
    const ok = new Set<string>();
    for (const c of this.chapters(found)) if (c.unlocked) for (const e of CHAPTERS.find((x) => x.id === c.id)!.elements) ok.add(e.id);
    return ok;
  }

  /** an undiscovered element that can be made right now from what the player has, the simplest first */
  private pickHintTarget(found: Set<string>): string | null {
    const open = this.unlockedSet(found);
    let best: string | null = null;
    for (const e of ELEMENTS.values()) {
      if (found.has(e.id) || !open.has(e.id)) continue;
      if (!e.recipes.some(([a, b]) => found.has(a) && found.has(b))) continue;
      if (!best || (DEPTH.get(e.id) ?? 0) < (DEPTH.get(best) ?? 0)) best = e.id;
    }
    return best;
  }

  private hintRecipe(target: string, found: Set<string>) {
    return ELEMENTS.get(target)!.recipes.find(([a, b]) => found.has(a) && found.has(b)) ?? ELEMENTS.get(target)!.recipes[0];
  }

  private hintsAreFree(found: Set<string>) {
    return this.chapters(found).some((c) => c.unlocked && !c.done && c.total - c.found <= FREE_HINTS_LEFT);
  }

  state(id: number): GameState {
    const r = this.row(id);
    const discovered = this.discovered(id);
    const found = new Set(discovered.map((d) => d.id));
    const exhausted = [...found].filter((e) => [...(USES.get(e) ?? [])].every((x) => found.has(x)));
    const hint: HintState = { target: null, level: 0, ingredients: [], free: this.hintsAreFree(found), canSkip: false };
    if (r.hint_target && !found.has(r.hint_target) && r.hint_level > 0) {
      const [a, b] = this.hintRecipe(r.hint_target, found);
      hint.target = r.hint_target;
      hint.level = r.hint_level;
      hint.ingredients = r.hint_level >= 3 ? [a, b] : r.hint_level >= 2 ? [a] : [];
      hint.canSkip = r.hint_level >= 3;
    }
    return {
      profile: { id: r.id, name: r.name, avatar: r.avatar, points: r.points, hints: r.hints, streak: r.streak },
      discovered, exhausted, hint, chapters: this.chapters(found), unlockPercent: this.unlockPercent,
    };
  }

  /** the next hint level; a new target costs a hint unless hints are free at the end of a chapter */
  hint(id: number): GameState {
    const r = this.row(id);
    const found = new Set(this.discovered(id).map((d) => d.id));
    const free = this.hintsAreFree(found);
    let target = r.hint_target && !found.has(r.hint_target) ? r.hint_target : null;
    let level = target ? r.hint_level : 0;
    if (level >= 3) return this.state(id);
    if (!target) {
      target = this.pickHintTarget(found);
      if (!target) throw new HttpError(409, 'no_hint');
    }
    if (!free) {
      if (r.hints <= 0) throw new HttpError(409, 'no_hints_left');
      this.db.prepare('UPDATE profiles SET hints = hints - 1 WHERE id = ?').run(id);
    }
    level += 1;
    this.db.prepare('UPDATE profiles SET hint_target = ?, hint_level = ? WHERE id = ?').run(target, level, id);
    return this.state(id);
  }

  combine(id: number, a: unknown, b: unknown): CombineResult {
    const r = this.row(id);
    if (typeof a !== 'string' || typeof b !== 'string') throw new HttpError(400, 'pair');
    const discovered = this.discovered(id);
    const found = new Set(discovered.map((d) => d.id));
    if (!found.has(a) || !found.has(b)) throw new HttpError(400, 'not_yours');
    const key = pairKey(a, b);
    const open = this.unlockedSet(found);
    const makes = (PAIRS.get(key) ?? []).filter((x) => open.has(x));
    const bonus = { streak: 0, chapter: 0 };
    if (makes.length === 0) {
      const before = this.db.prepare('SELECT 1 FROM tried WHERE profile_id = ? AND pair = ?').get(id, key);
      if (!before) this.db.prepare('INSERT INTO tried (profile_id, pair) VALUES (?, ?)').run(id, key);
      return { results: [], tried: !!before, bonus, state: this.state(id) };
    }
    const results: CombineResult['results'] = [];
    let { points, streak, earned, hint_target, hint_level, hints } = r;
    const chaptersBefore = this.chapters(found);
    for (const x of makes) {
      if (found.has(x)) { results.push({ id: x, isNew: false, points: 0 }); continue; }
      const usedHint = hint_target === x ? hint_level : 0;
      const p = Math.round(TIER_POINTS[tierOf(x)] * HINT_FACTOR[usedHint]);
      this.db.prepare("INSERT INTO discoveries (profile_id, element, at, via, points) VALUES (?, ?, ?, 'combine', ?)").run(id, x, Date.now(), p);
      found.add(x);
      results.push({ id: x, isNew: true, points: p });
      points += p;
      earned += 1;
      if (earned % HINT_EVERY === 0) hints += 1;
      if (usedHint) streak = 0;
      else {
        streak += 1;
        if (streak % STREAK_EVERY === 0) { bonus.streak += STREAK_BONUS; points += STREAK_BONUS; }
      }
      if (hint_target === x) { hint_target = null; hint_level = 0; }
    }
    const chaptersAfter = this.chapters(found);
    for (let i = 0; i < chaptersAfter.length; i++) {
      if (chaptersAfter[i].done && !chaptersBefore[i].done) { bonus.chapter += CHAPTER_BONUS; points += CHAPTER_BONUS; }
    }
    if (hint_target && found.has(hint_target)) { hint_target = null; hint_level = 0; }
    this.db.prepare('UPDATE profiles SET points = ?, streak = ?, earned = ?, hints = ?, hint_target = ?, hint_level = ? WHERE id = ?')
      .run(points, streak, earned, hints, hint_target, hint_level, id);
    return { results, tried: false, bonus, state: this.state(id) };
  }

  /** after the last hint: take the element without points */
  skip(id: number): CombineResult {
    const r = this.row(id);
    const found = new Set(this.discovered(id).map((d) => d.id));
    if (!r.hint_target || r.hint_level < 3 || found.has(r.hint_target)) throw new HttpError(409, 'no_skip');
    const x = r.hint_target;
    const before = this.chapters(found);
    this.db.prepare("INSERT INTO discoveries (profile_id, element, at, via, points) VALUES (?, ?, ?, 'skip', 0)").run(id, x, Date.now());
    found.add(x);
    const after = this.chapters(found);
    const bonus = { streak: 0, chapter: 0 };
    for (let i = 0; i < after.length; i++) if (after[i].done && !before[i].done) bonus.chapter += CHAPTER_BONUS;
    this.db.prepare('UPDATE profiles SET points = points + ?, streak = 0, hint_target = NULL, hint_level = 0 WHERE id = ?').run(bonus.chapter, id);
    return { results: [{ id: x, isNew: true, points: 0 }], tried: false, bonus, state: this.state(id) };
  }
}
