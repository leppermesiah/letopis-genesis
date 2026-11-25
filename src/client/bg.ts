// The living background: drifting nebula, three layers of twinkling stars,
// and the player's own constellation: every discovery lights a star of its own.

interface Star { x: number; y: number; r: number; tw: number; ph: number; layer: number }

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  // final mix, so that similar names do not land on similar spots
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

export class SpaceBackground {
  private ctx: CanvasRenderingContext2D;
  private nebula = document.createElement('canvas');
  private stars: Star[] = [];
  private own: { id: string; x: number; y: number; born: number }[] = [];
  private w = 0;
  private h = 0;
  private dpr = 1;
  private t0 = performance.now();
  private still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private running = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this.loop(); });
    this.resize();
  }

  /** the discovered elements, oldest first */
  setDiscoveries(ids: string[]) {
    const known = new Set(this.own.map((o) => o.id));
    const now = performance.now();
    const fresh = this.own.length > 0;
    this.own = ids.map((id) => {
      const old = this.own.find((o) => o.id === id);
      if (old) return old;
      // keep away from the very edges
      return { id, x: 0.06 + hash('x:' + id) * 0.88, y: 0.08 + hash('y:' + id) * 0.84, born: fresh && !known.has(id) ? now : 0 };
    });
    if (this.still) this.draw();
  }

  private resize() {
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.w = innerWidth;
    this.h = innerHeight;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
    this.makeNebula();
    this.makeStars();
    this.draw();
    this.loop();
  }

  private makeStars() {
    const n = Math.round((this.w * this.h) / 2600);
    this.stars = [];
    for (let i = 0; i < n; i++) {
      const layer = i % 3;
      this.stars.push({
        x: Math.random(), y: Math.random(),
        r: (0.35 + Math.random() * 0.6) * (layer + 1) * 0.55,
        tw: 0.4 + Math.random() * 1.6, ph: Math.random() * 6.28, layer,
      });
    }
  }

  /** soft clouds drawn once into a small canvas, then stretched */
  private makeNebula() {
    const W = 480, H = Math.round(480 * (this.h / Math.max(1, this.w))) || 480;
    this.nebula.width = W;
    this.nebula.height = H;
    const c = this.nebula.getContext('2d')!;
    c.fillStyle = '#05060f';
    c.fillRect(0, 0, W, H);
    const colors = ['88,40,160', '30,60,170', '20,120,160', '150,40,120', '60,30,120', '200,110,40'];
    c.globalCompositeOperation = 'lighter';
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 26; i++) {
      const x = rnd() * W, y = rnd() * H, r = (0.12 + rnd() * 0.35) * Math.max(W, H);
      const col = colors[Math.floor(rnd() * (i < 22 ? 5 : 6))];
      const a = i < 22 ? 0.05 + rnd() * 0.08 : 0.04;
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col},${a})`);
      g.addColorStop(0.5, `rgba(${col},${a * 0.45})`);
      g.addColorStop(1, `rgba(${col},0)`);
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);
    }
    // darker corners
    c.globalCompositeOperation = 'source-over';
    const v = c.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.75);
    v.addColorStop(0, 'rgba(0,0,0,0)');
    v.addColorStop(1, 'rgba(0,0,0,0.55)');
    c.fillStyle = v;
    c.fillRect(0, 0, W, H);
  }

  private loop() {
    if (this.running || this.still) return;
    this.running = true;
    const tick = () => {
      if (document.hidden) { this.running = false; return; }
      this.draw();
      // ~24 fps is plenty for slow drifting, and easy on phones
      setTimeout(() => requestAnimationFrame(tick), 40);
    };
    requestAnimationFrame(tick);
  }

  private draw() {
    const { ctx, w, h, dpr } = this;
    const t = this.still ? 0 : (performance.now() - this.t0) / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // the nebula breathes and drifts very slowly
    const s = 1.12 + Math.sin(t / 40) * 0.03;
    const dx = Math.sin(t / 55) * w * 0.03, dy = Math.cos(t / 70) * h * 0.03;
    ctx.drawImage(this.nebula, (w - w * s) / 2 + dx, (h - h * s) / 2 + dy, w * s, h * s);

    for (const st of this.stars) {
      const speed = [0.0015, 0.004, 0.009][st.layer];
      const x = ((st.x + t * speed * 0.1) % 1) * w;
      const y = st.y * h;
      const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * st.tw + st.ph));
      ctx.globalAlpha = a * (0.45 + st.layer * 0.25);
      ctx.fillStyle = st.layer === 2 ? '#fff6e0' : '#cfe0ff';
      ctx.beginPath();
      ctx.arc(x, y, st.r, 0, 6.283);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    this.drawConstellation(t);
  }

  private drawConstellation(t: number) {
    const { ctx, w, h } = this;
    const now = performance.now();
    if (this.own.length > 1) {
      ctx.strokeStyle = 'rgba(140,190,255,0.10)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // each new star links to the nearest older one: the drawing grows like a real constellation
      for (let i = 1; i < this.own.length; i++) {
        const p = this.own[i];
        let best = this.own[0], bd = Infinity;
        for (let j = 0; j < i; j++) {
          const q = this.own[j];
          const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
          if (d < bd) { bd = d; best = q; }
        }
        ctx.moveTo(p.x * w, p.y * h);
        ctx.lineTo(best.x * w, best.y * h);
      }
      ctx.stroke();
    }
    for (const o of this.own) {
      const x = o.x * w, y = o.y * h;
      const age = o.born ? (now - o.born) / 1000 : 99;
      const flash = age < 3 ? 1 - age / 3 : 0;
      const pulse = 0.75 + 0.25 * Math.sin(t * 1.3 + x);
      const r = 2.2 + flash * 18;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
      g.addColorStop(0, `rgba(255,236,190,${0.55 * pulse + flash * 0.45})`);
      g.addColorStop(1, 'rgba(255,236,190,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 4, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = '#fff8e8';
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, 6.283);
      ctx.fill();
    }
  }
}
