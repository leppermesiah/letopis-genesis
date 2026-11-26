import { SpaceBackground } from './bg';
import { CATS, CHAPTER_NAMES, TITLE_NAMES, UI, detectLang } from './i18n';
import {
  LANGS, TITLES, pairKey, type ChapterState, type CombineResult, type Content, type ContentElement, type GameState, type Lang,
} from '../shared/types';

declare const __BUILD__: string;
declare const __VERSION__: string;

// ---------- small helpers ----------

type Attrs = Record<string, string | number | boolean | ((e: any) => void) | undefined>;
function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs = {}, ...kids: (Node | string | null | false | undefined)[]) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v as EventListener);
    else if (k === 'class') el.className = String(v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  for (const k of kids) if (k !== null && k !== false && k !== undefined) el.append(k);
  return el;
}
const fill = (el: HTMLElement, ...kids: (Node | string | null | false | undefined)[]) =>
  el.replaceChildren(...kids.filter((k): k is Node | string => k !== null && k !== false && k !== undefined));
const $ = (sel: string) => document.querySelector(sel) as HTMLElement;
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string | null) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* private mode */ } },
};

let lang: Lang = detectLang();
const T = () => UI[lang];
let content: Content;
const EL = new Map<string, ContentElement>();
let state: GameState | null = null;
let token = store.get('genesis.token');
let info: { admin: boolean; build?: string; version?: string } = { admin: false };
const bg = new SpaceBackground($('#space') as HTMLCanvasElement);

class ApiError extends Error { constructor(public status: number, public code: string) { super(code); } }

async function api<R>(path: string, body?: unknown): Promise<R> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    toast(T().offline, 'warn');
    throw new ApiError(0, 'offline');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) { token = null; store.set('genesis.token', null); showProfiles(); }
    throw new ApiError(res.status, data.error || 'error');
  }
  return data as R;
}

const name = (id: string) => EL.get(id)?.t[lang].n ?? id;

function icon(id: string, cls = '') {
  const e = EL.get(id);
  if (e?.icon) return h('img', { class: `icon ${cls}`, src: `icons/${id}.webp`, alt: '', draggable: 'false' });
  return h('span', { class: `icon emoji ${cls}` }, e?.emoji ?? '?');
}

function toast(text: string, kind: 'info' | 'warn' | 'good' | 'near' = 'info') {
  const t = h('div', { class: `toast ${kind}` }, text);
  $('#toasts').append(t);
  // longer texts stay longer, so kids can read them
  const ms = Math.max(2200, Math.min(7000, text.length * 55));
  setTimeout(() => t.classList.add('out'), ms);
  setTimeout(() => t.remove(), ms + 500);
}

// ---------- modal ----------

function modal(build: (close: () => void) => HTMLElement, opts: { wide?: boolean; onClose?: () => void } = {}) {
  const back = h('div', { class: 'modal-back' });
  const close = () => { back.classList.add('out'); setTimeout(() => back.remove(), 200); opts.onClose?.(); };
  const box = h('div', { class: `modal ${opts.wide ? 'wide' : ''}` });
  box.append(build(close));
  back.append(box);
  back.addEventListener('pointerdown', (e) => { if (e.target === back) close(); });
  $('#modals').append(back);
  return close;
}
const modalOpen = () => $('#modals').children.length > 0;

/** a 4-digit PIN pad; calls done with the PIN */
function pinPad(title: string, done: (pin: string, pad: { error(msg: string): void; reset(): void }) => void) {
  let pin = '';
  const dots = h('div', { class: 'pin-dots' });
  const msg = h('div', { class: 'pin-msg' });
  const draw = () => { dots.replaceChildren(...[0, 1, 2, 3].map((i) => h('span', { class: i < pin.length ? 'on' : '' }))); };
  const pad = {
    error(m: string) { msg.textContent = m; dots.classList.add('shake'); setTimeout(() => dots.classList.remove('shake'), 400); pin = ''; draw(); },
    reset() { pin = ''; msg.textContent = ''; draw(); },
  };
  const press = (k: string) => {
    if (k === '⌫') pin = pin.slice(0, -1);
    else if (pin.length < 4) pin += k;
    msg.textContent = '';
    draw();
    if (pin.length === 4) { const p = pin; setTimeout(() => done(p, pad), 120); }
  };
  draw();
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];
  const el = h('div', { class: 'pin' },
    h('div', { class: 'pin-title' }, title), dots, msg,
    h('div', { class: 'pin-keys' }, ...keys.map((k) => k ? h('button', { class: 'key', onclick: () => press(k) }, k) : h('span'))));
  const onKey = (e: KeyboardEvent) => {
    if (!el.isConnected) { removeEventListener('keydown', onKey); return; }
    if (/^\d$/.test(e.key)) press(e.key);
    else if (e.key === 'Backspace') press('⌫');
  };
  addEventListener('keydown', onKey);
  return el;
}

// ---------- language ----------

function langSwitch() {
  return h('div', { class: 'langs' }, ...LANGS.map((l) => h('button', {
    class: l === lang ? 'on' : '',
    onclick: () => { lang = l; store.set('genesis.lang', l); document.documentElement.lang = l; state ? renderGame() : showProfiles(); },
  }, l.toUpperCase())));
}

// ---------- profiles ----------

const AVATARS = ['🦊', '🐻', '🐼', '🦉', '🐸', '🐙', '🐱', '🐶', '🦄', '🐲', '👽', '🤖', '🚀', '🌟', '🐢', '🐬'];

async function showProfiles() {
  state = null;
  bg.setDiscoveries([]);
  const app = $('#app');
  app.className = 'screen-profiles';
  let profiles: { id: number; name: string; avatar: string; points: number }[] = [];
  try { profiles = await api('/api/profiles'); } catch { /* offline: show the empty screen */ }
  app.replaceChildren(
    h('header', { class: 'top-plain' }, h('span'), langSwitch()),
    h('div', { class: 'hero' },
      h('img', { class: 'logo', src: 'icon-192.png', alt: '' }),
      h('h1', {}, 'Letopis', h('span', {}, 'Genesis')),
      h('p', { class: 'sub' }, T().subtitle)),
    h('h2', {}, T().whoPlays),
    h('div', { class: 'profiles' },
      ...profiles.map((p) => h('button', { class: 'profile glass', onclick: () => login(p) },
        h('span', { class: 'avatar' }, p.avatar), h('span', { class: 'pname' }, p.name),
        h('span', { class: 'ppoints' }, `★ ${p.points}`))),
      h('button', { class: 'profile glass add', onclick: newPlayer }, h('span', { class: 'avatar' }, '+'), h('span', { class: 'pname' }, T().newPlayer))),
    h('footer', { class: 'foot' },
      info.admin ? h('button', { class: 'link', onclick: adminPanel }, '⚙ ' + T().admin) : null,
      h('span', {}, `${T().version} ${__VERSION__}`)),
  );
}

function login(p: { id: number; name: string; avatar: string }) {
  modal((close) => h('div', {},
    h('div', { class: 'modal-avatar' }, p.avatar),
    h('h3', {}, p.name),
    pinPad(T().enterPin, async (pin, pad) => {
      try {
        const r = await api<{ token: string }>('/api/login', { id: p.id, pin });
        token = r.token;
        store.set('genesis.token', token);
        close();
        startGame();
      } catch (e) {
        pad.error(e instanceof ApiError && e.code === 'locked' ? T().locked : T().wrongPin);
      }
    })));
}

function newPlayer() {
  let nm = '', av = AVATARS[Math.floor(Math.random() * AVATARS.length)], first = '';
  modal((close) => {
    const body = h('div', {});
    const step1 = () => {
      const input = h('input', { class: 'text', maxlength: 24, placeholder: T().name, value: nm, autocomplete: 'off' }) as HTMLInputElement;
      const avs = h('div', { class: 'avatars' }, ...AVATARS.map((a) => h('button', {
        class: a === av ? 'on' : '', onclick: (e: Event) => { av = a; avs.querySelectorAll('button').forEach((b) => b.classList.remove('on')); (e.currentTarget as HTMLElement).classList.add('on'); },
      }, a)));
      const go = () => { nm = input.value.trim(); if (nm) step2(); else input.focus(); };
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      fill(body, h('h3', {}, T().newPlayer), input, h('div', { class: 'label' }, T().avatar), avs,
        h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: close }, T().cancel), h('button', { class: 'btn', onclick: go }, T().next)));
      setTimeout(() => input.focus(), 50);
    };
    const step2 = () => {
      fill(body, h('div', { class: 'modal-avatar' }, av), h('h3', {}, nm),
        pinPad(T().choosePin, (pin) => { first = pin; step3(); }),
        h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: step1 }, T().back)));
    };
    const step3 = () => {
      fill(body, h('div', { class: 'modal-avatar' }, av), h('h3', {}, nm),
        pinPad(T().repeatPin, async (pin, pad) => {
          if (pin !== first) { pad.error(T().pinMismatch); setTimeout(step2, 900); return; }
          try {
            const r = await api<{ token: string }>('/api/profiles', { name: nm, avatar: av, pin });
            token = r.token;
            store.set('genesis.token', token);
            close();
            startGame(true);
          } catch { pad.error('!'); }
        }),
        h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: step2 }, T().back)));
    };
    step1();
    return body;
  });
}

function adminPanel() {
  modal((close) => {
    const body = h('div', {});
    const ask = () => fill(body, h('h3', {}, T().admin), (() => {
      const input = h('input', { class: 'text', type: 'password', inputmode: 'numeric', placeholder: T().adminPin, autocomplete: 'off' }) as HTMLInputElement;
      const go = () => list(input.value);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      setTimeout(() => input.focus(), 50);
      return h('div', {}, input, h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: close }, T().cancel), h('button', { class: 'btn', onclick: go }, T().next)));
    })());
    const list = async (admin: string) => {
      const profiles = await api<{ id: number; name: string; avatar: string }[]>('/api/profiles');
      fill(body, h('h3', {}, T().admin), h('div', { class: 'admin-list' }, ...profiles.map((p) => {
        const pinIn = h('input', { class: 'text small', inputmode: 'numeric', maxlength: 4, placeholder: T().setPin }) as HTMLInputElement;
        const del = h('button', { class: 'btn danger small' }, T().delete);
        let armed = false;
        del.addEventListener('click', async () => {
          if (!armed) { armed = true; del.textContent = T().sure; return; }
          try { await api('/api/admin/delete', { admin, id: p.id }); list(admin); } catch { toast(T().wrongPin, 'warn'); }
        });
        return h('div', { class: 'admin-row' }, h('span', { class: 'avatar' }, p.avatar), h('span', { class: 'pname' }, p.name), pinIn,
          h('button', { class: 'btn small', onclick: async () => {
            try { await api('/api/admin/pin', { admin, id: p.id, pin: pinIn.value }); pinIn.value = ''; toast(T().saved, 'good'); } catch { toast(T().wrongPin, 'warn'); }
          } }, '✓'), del);
      })), h('div', { class: 'row' }, h('button', { class: 'btn', onclick: () => { close(); showProfiles(); } }, T().close)));
    };
    ask();
    return body;
  });
}

// ---------- the game ----------

let slots: (string | null)[] = [null, null];
let busy = false;
let cat = 'all';

async function startGame(fresh = false) {
  try {
    state = await api<GameState>('/api/state');
  } catch { return; }
  bg.setDiscoveries([]);
  bg.setDiscoveries(state.discovered.map((d) => d.id));
  slots = [null, null];
  renderGame();
  if (fresh) toast(T().howTo, 'info');
}

function titleIndex(points: number) {
  let i = 0;
  while (i + 1 < TITLES.length && points >= TITLES[i + 1]) i++;
  return i;
}

function renderGame() {
  if (!state) return;
  const s = state;
  const app = $('#app');
  app.className = 'screen-game';
  const ti = titleIndex(s.profile.points);
  const nextAt = TITLES[ti + 1];
  const ch = s.chapters.find((c) => c.unlocked && !c.done) ?? s.chapters[s.chapters.length - 1];

  const top = h('header', { class: 'top glass' },
    h('button', { class: 'me', onclick: profileMenu }, h('span', { class: 'avatar' }, s.profile.avatar), h('span', { class: 'pname' }, s.profile.name)),
    h('div', { class: 'chapter' },
      h('div', { class: 'ch-name' }, `${CHAPTER_NAMES[ch.id]?.[lang] ?? ch.id}`, h('b', {}, ` ${ch.found}/${ch.total}`)),
      h('div', { class: 'bar' }, h('i', { style: `width:${(ch.found / ch.total) * 100}%` }))),
    h('div', { class: 'score', title: nextAt ? `${nextAt}` : '' },
      h('b', {}, `★ ${s.profile.points}`), h('span', {}, TITLE_NAMES[lang][ti])),
    h('button', { class: 'journal-btn', onclick: showJournal, title: T().journal }, '📜'),
    h('button', { class: `hint-btn ${s.hint.free ? 'free' : ''}`, onclick: openHint, title: T().hint },
      '💡', h('span', {}, s.hint.free ? '∞' : String(s.profile.hints))),
    langSwitch());

  app.replaceChildren(top, stage(), library());
  markTried();
}

function stage() {
  const mk = (i: number) => {
    const id = slots[i];
    const el = h('div', { class: `slot ${id ? 'full' : ''}`, 'data-slot': i, onclick: () => { if (busy) return; slots[i] = null; refreshStage(); } },
      id ? icon(id) : h('span', { class: 'slot-empty' }, '?'),
      id ? h('span', { class: 'slot-name' }, name(id)) : null);
    return el;
  };
  return h('section', { class: 'stage', id: 'stage' },
    h('div', { class: 'pair' }, mk(0), h('span', { class: 'plus' }, '+'), mk(1)),
    h('div', { class: 'stage-msg', id: 'stage-msg' }, !slots[0] && !slots[1] ? T().pickTwo : !slots[0] || !slots[1] ? T().triedMarks : ''),
    nearNote());
}

/** the last "almost!" stays under the slots until its element is found or a new clue replaces it */
let nearFlash = false;
function nearNote() {
  const n = state?.near;
  if (!n) return null;
  const el = h('div', { class: `near-note${nearFlash ? ' flash' : ''}` }, h('b', {}, T().almost), ' ', n.text[lang]);
  nearFlash = false;
  return el;
}

function refreshStage() { $('#stage').replaceWith(stage()); markTried(); }

/** with one element waiting in a circle, every tile it was already tried with gets a mark */
function markTried() {
  if (!state) return;
  const one = slots[0] && !slots[1] ? slots[0] : slots[1] && !slots[0] ? slots[1] : null;
  const failed = new Set(state.tried);
  document.querySelectorAll<HTMLElement>('.tile').forEach((t) => {
    t.classList.remove('tried-no', 'tried-yes');
    if (!one) return;
    const k = pairKey(one, t.dataset.id!);
    if (failed.has(k)) t.classList.add('tried-no');
    else if (state!.made[k]?.length) t.classList.add('tried-yes');
  });
}

function recipeRow(a: string, b: string, c?: string) {
  const part = (id: string) => h('span', { class: 'rp' }, icon(id), h('span', {}, name(id)));
  return h('div', { class: 'recipe' }, part(a), h('i', {}, '+'), part(b), c ? h('i', {}, '=') : null, c ? part(c) : null);
}

function showJournal() {
  const s = state!;
  const list = [...s.discovered].reverse();
  modal((close) => h('div', { class: 'journal' },
    h('h3', {}, `📜 ${T().journal}`),
    h('div', { class: 'jlist' }, ...list.map((d) => d.a && d.b
      ? h('div', { class: `jrow ${d.via === 'skip' ? 'skip' : ''}` }, recipeRow(d.a, d.b, d.id), d.via === 'skip' ? h('span', { class: 'jskip', title: T().skipped }, '⤼') : null)
      : h('div', { class: 'jrow start' }, h('div', { class: 'recipe' }, h('span', { class: 'rp' }, icon(d.id), h('span', {}, name(d.id))), h('i', {}, `· ${T().startEl}`))))),
    h('div', { class: 'row' }, h('button', { class: 'btn', onclick: close }, T().close))), { wide: true });
}

function library() {
  const s = state!;
  const found = new Set(s.discovered.map((d) => d.id));
  const skipped = new Set(s.discovered.filter((d) => d.via === 'skip').map((d) => d.id));
  const exhausted = new Set(s.exhausted);
  const cats = [...new Set(content.elements.filter((e) => found.has(e.id)).map((e) => e.cat))];
  if (cat !== 'all' && !cats.includes(cat)) cat = 'all';
  const items = content.elements.filter((e) => found.has(e.id) && (cat === 'all' || e.cat === cat));
  // the order of discovery, newest last, stays stable while playing
  const order = new Map(s.discovered.map((d, i) => [d.id, i]));
  items.sort((a, b) => Number(exhausted.has(a.id)) - Number(exhausted.has(b.id)) || order.get(a.id)! - order.get(b.id)!);
  return h('section', { class: 'library glass' },
    h('nav', { class: 'cats' },
      h('button', { class: cat === 'all' ? 'on' : '', onclick: () => { cat = 'all'; renderGame(); } }, `${T().all} ${found.size}`),
      ...cats.map((c) => h('button', { class: cat === c ? 'on' : '', onclick: () => { cat = c; renderGame(); } }, CATS[c]?.[lang] ?? c))),
    h('div', { class: 'grid' }, ...items.map((e) => tile(e.id, exhausted.has(e.id), skipped.has(e.id)))));
}

function tile(id: string, done: boolean, skipped: boolean) {
  const el = h('div', { class: `tile ${done ? 'done' : ''}`, 'data-id': id },
    icon(id), h('span', { class: 'tname' }, name(id)),
    h('button', { class: 'info', title: T().didYouKnow, onclick: (e: Event) => { e.stopPropagation(); showFact(id); } }, 'i'),
    skipped ? h('span', { class: 'skipped', title: T().skipped }, '⤼') : null);
  dragOrTap(el, id);
  return el;
}

/** tap: fill the next free slot. drag: drop onto a slot. */
function dragOrTap(el: HTMLElement, id: string) {
  el.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('.info') || busy) return;
    const sx = e.clientX, sy = e.clientY;
    let ghost: HTMLElement | null = null;
    const move = (ev: PointerEvent) => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 10) {
        ghost = h('div', { class: 'drag-ghost' }, icon(id));
        document.body.append(ghost);
      }
      if (ghost) {
        ghost.style.transform = `translate(${ev.clientX - 36}px, ${ev.clientY - 36}px)`;
        document.querySelectorAll('.slot').forEach((s) => s.classList.toggle('over', s === slotAt(ev.clientX, ev.clientY)));
      }
    };
    const up = (ev: PointerEvent) => {
      removeEventListener('pointermove', move);
      removeEventListener('pointerup', up);
      removeEventListener('pointercancel', up);
      if (ghost) {
        ghost.remove();
        const s = slotAt(ev.clientX, ev.clientY);
        if (s) put(id, Number(s.dataset.slot));
      } else if (ev.type === 'pointerup') put(id);
    };
    addEventListener('pointermove', move);
    addEventListener('pointerup', up);
    addEventListener('pointercancel', up);
  });
}

function slotAt(x: number, y: number) {
  return [...document.querySelectorAll<HTMLElement>('.slot')].find((s) => {
    const r = s.getBoundingClientRect();
    return x >= r.left - 12 && x <= r.right + 12 && y >= r.top - 12 && y <= r.bottom + 12;
  });
}

function put(id: string, at?: number) {
  if (busy) return;
  const i = at ?? (slots[0] === null ? 0 : slots[1] === null ? 1 : 1);
  slots[i] = id;
  refreshStage();
  if (slots[0] && slots[1]) combine();
}

async function combine() {
  const [a, b] = slots as [string, string];
  busy = true;
  $('#stage').classList.add('merging');
  await new Promise((r) => setTimeout(r, 420));
  let r: CombineResult;
  try {
    r = await api<CombineResult>('/api/combine', { a, b });
  } catch {
    busy = false;
    $('#stage')?.classList.remove('merging');
    return;
  }
  const chaptersBefore = state?.chapters ?? [];
  state = r.state;
  const fresh = r.results.filter((x) => x.isNew);
  if (fresh.length) {
    bg.setDiscoveries(state.discovered.map((d) => d.id));
    slots = [null, null];
    renderGame();
    busy = false;
    showDiscoveries(fresh.map((x) => ({ id: x.id, points: x.points })), r.bonus, newlyUnlocked(chaptersBefore));
    return;
  }
  const stage = $('#stage');
  stage.classList.remove('merging');
  if (r.results.length) {
    toast(`${T().already} ${r.results.map((x) => name(x.id)).join(', ')}`, 'info');
  } else {
    stage.classList.add('fail');
    if (r.near) nearFlash = true;
    else toast(r.tried ? T().triedBefore : T().nothing, 'warn');
  }
  setTimeout(() => { slots = [null, null]; busy = false; renderGame(); }, 650);
}

function newlyUnlocked(before: ChapterState[]) {
  return state!.chapters.find((c, i) => c.unlocked && before[i] && !before[i].unlocked)?.id;
}

function showDiscoveries(list: { id: string; points: number }[], bonus: { streak: number; chapter: number }, unlocked?: string) {
  const [first, ...rest] = list;
  const s = state!;
  const doneNow = bonus.chapter > 0 ? s.chapters.filter((c) => c.done).at(-1) : undefined;
  modal((close) => h('div', { class: 'discovery' },
    h('div', { class: 'disc-label' }, T().newElement),
    h('div', { class: 'disc-icon' }, h('div', { class: 'burst' }), icon(first.id, 'big')),
    h('h2', {}, name(first.id)),
    first.points > 0 ? h('div', { class: 'disc-points' }, `+${first.points} ${T().points}`) : null,
    bonus.streak ? h('div', { class: 'disc-bonus' }, `+${bonus.streak} · ${T().streakBonus}`) : null,
    bonus.chapter ? h('div', { class: 'disc-bonus' }, `+${bonus.chapter} · ${T().chapterBonus}`) : null,
    h('div', { class: 'fact' }, h('b', {}, T().didYouKnow), h('p', {}, EL.get(first.id)!.t[lang].f)),
    doneNow ? h('div', { class: 'chapter-done' },
      h('p', {}, T().chapterDone.replace('{0}', CHAPTER_NAMES[doneNow.id]?.[lang] ?? doneNow.id)),
      s.chapters.every((c) => c.done) ? h('p', {}, T().comingSoon) : null) : null,
    unlocked ? h('div', { class: 'chapter-done' }, h('p', {}, T().chapterUnlocked.replace('{0}', CHAPTER_NAMES[unlocked]?.[lang] ?? unlocked))) : null,
    h('button', { class: 'btn big', onclick: close }, T().great)),
  { onClose: () => { if (rest.length) setTimeout(() => showDiscoveries(rest, { streak: 0, chapter: 0 }), 150); } });
}

function showFact(id: string) {
  const d = state?.discovered.find((x) => x.id === id);
  modal((close) => h('div', { class: 'discovery' },
    h('div', { class: 'disc-icon' }, icon(id, 'big')),
    h('h2', {}, name(id)),
    h('div', { class: 'disc-meta' }, `${CATS[EL.get(id)!.cat]?.[lang] ?? ''}${d && d.points ? ` · ★ ${d.points}` : ''}${d?.via === 'skip' ? ` · ${T().skipped}` : ''}`),
    h('div', { class: 'fact' }, h('b', {}, T().didYouKnow), h('p', {}, EL.get(id)!.t[lang].f)),
    h('div', { class: 'origin' },
      h('div', { class: 'olabel' }, T().madeFrom),
      d?.a && d.b ? recipeRow(d.a, d.b) : h('div', { class: 'onote' }, T().startEl)),
    usedIn(id),
    h('button', { class: 'btn', onclick: close }, T().close)));
}

function usedIn(id: string) {
  const s = state!;
  const made = s.discovered.filter((d) => d.a === id || d.b === id);
  const left = s.pending[id] ?? 0;
  return h('div', { class: 'origin' },
    h('div', { class: 'olabel' }, T().usedIn),
    made.length ? h('div', { class: 'uses' }, ...made.map((d) => h('span', { class: 'rp' }, icon(d.id), h('span', {}, name(d.id))))) : null,
    h('div', { class: 'onote' }, left ? T().stillMakes.replace('{0}', String(left)) : T().allMade));
}

async function openHint() {
  if (!state) return;
  if (state.hint.level === 0) {
    if (!state.hint.free && state.profile.hints <= 0) return toast(T().noHintsLeft, 'warn');
    try { state = await api<GameState>('/api/hint', {}); } catch (e) {
      if (e instanceof ApiError && e.code === 'no_hint') toast(T().noHint, 'info');
      if (e instanceof ApiError && e.code === 'no_hints_left') toast(T().noHintsLeft, 'warn');
      return;
    }
    renderGame();
  }
  hintModal();
}

function hintModal() {
  modal((close) => {
    const body = h('div', { class: 'hint' });
    const draw = () => {
      const hs = state!.hint;
      if (!hs.target) { close(); return; }
      const canMore = hs.level < 3 && (hs.free || state!.profile.hints > 0);
      fill(body, 
        h('h3', {}, `💡 ${T().hint}`),
        hs.free ? h('div', { class: 'hint-free' }, T().hintFree) : null,
        h('div', { class: 'hint-step' }, h('span', {}, T().hintL1), h('p', { class: 'riddle' }, lang === 'en' ? `“${EL.get(hs.target)!.t[lang].h}”` : `„${EL.get(hs.target)!.t[lang].h}“`)),
        hs.level >= 2 ? h('div', { class: 'hint-step' }, h('span', {}, T().hintL2),
          h('div', { class: 'hint-el' }, icon(hs.ingredients[0]), h('b', {}, name(hs.ingredients[0])))) : null,
        hs.level >= 3 ? h('div', { class: 'hint-step' }, h('span', {}, T().hintL3),
          h('div', { class: 'hint-el silhouette' }, icon(hs.ingredients[1]), h('b', {}, '???'))) : null,
        h('div', { class: 'row' },
          h('button', { class: 'btn ghost', onclick: close }, T().close),
          hs.level < 3 ? h('button', { class: 'btn', disabled: !canMore, onclick: async () => {
            try { state = await api<GameState>('/api/hint', {}); renderGame(); draw(); } catch { /* toast shown */ }
          } }, `${T().moreHint}${hs.free ? '' : ` (💡 ${state!.profile.hints})`}`) : null,
          hs.canSkip ? h('button', { class: 'btn danger', onclick: async () => {
            try {
              const r = await api<CombineResult>('/api/skip', {});
              const chaptersBefore = state!.chapters;
              state = r.state;
              bg.setDiscoveries(state.discovered.map((d) => d.id));
              close();
              renderGame();
              showDiscoveries(r.results.map((x) => ({ id: x.id, points: 0 })), r.bonus, newlyUnlocked(chaptersBefore));
            } catch { /* toast shown */ }
          } }, T().skip) : null),
        hs.canSkip ? h('div', { class: 'note' }, T().skipNote) : null);
    };
    draw();
    return body;
  });
}

function profileMenu() {
  modal((close) => {
    const body = h('div', {});
    const main = () => fill(body, 
      h('div', { class: 'modal-avatar' }, state!.profile.avatar),
      h('h3', {}, state!.profile.name),
      h('div', { class: 'menu' },
        h('button', { class: 'btn', onclick: async () => {
          try { await api('/api/logout', {}); } catch { /* ignore */ }
          token = null; store.set('genesis.token', null); close(); showProfiles();
        } }, T().logout),
        h('button', { class: 'btn danger', onclick: confirmReset }, T().newGame),
        h('button', { class: 'btn ghost', onclick: close }, T().close)),
      h('div', { class: 'note' }, `${T().version} ${__VERSION__}`));
    const confirmReset = () => fill(body, 
      h('h3', {}, T().newGame), h('p', { class: 'warn' }, T().newGameWarn),
      h('div', { class: 'menu' },
        h('button', { class: 'btn danger', onclick: () => fill(body, 
          h('h3', {}, T().newGame),
          pinPad(T().pinToConfirm, async (pin, pad) => {
            try {
              state = await api<GameState>('/api/reset', { pin });
              close();
              bg.setDiscoveries([]);
              bg.setDiscoveries(state.discovered.map((d) => d.id));
              slots = [null, null];
              renderGame();
            } catch (e) { pad.error(e instanceof ApiError && e.code === 'locked' ? T().locked : T().wrongPin); }
          }),
          h('div', { class: 'row' }, h('button', { class: 'btn ghost', onclick: main }, T().cancel))) }, T().newGameConfirm),
        h('button', { class: 'btn ghost', onclick: main }, T().cancel)));
    main();
    return body;
  });
}

// ---------- start ----------

async function boot() {
  document.documentElement.lang = lang;
  try {
    [content, info] = await Promise.all([
      fetch('content.json').then((r) => r.json()),
      fetch('/api/info').then((r) => r.json()),
    ]);
  } catch {
    $('#app').replaceChildren(h('div', { class: 'hero' }, h('p', {}, UI[lang].offline)));
    setTimeout(boot, 5000);
    return;
  }
  for (const e of content.elements) EL.set(e.id, e);
  if (token) startGame(); else showProfiles();
  // a newer build on the server: reload when nothing is open
  setInterval(async () => {
    try {
      const v = await fetch('version.json', { cache: 'no-store' }).then((r) => r.json());
      if (v.build && v.build !== __BUILD__ && !modalOpen() && !busy) location.reload();
    } catch { /* offline */ }
  }, 60_000);
}

boot();
