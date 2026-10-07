import "./hero-motion.css";

/*
 * Decorative hero loop: the AI voice agent answers a call, qualifies the lead,
 * books the showing, then the week fills itself. Pure CSS animation on one
 * shared 16s clock (see hero-motion.css). Markup is a static, author-controlled
 * string built once at module load with a seeded PRNG, so SSR and the client
 * render identical output.
 */

const ACC = "#C19A83";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rnd = seeded(7);

const PHONE_PATH =
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z";
const CHECK = (size: number, stroke: string, width = 3.2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 12.5 10 17.5 19 7"></polyline></svg>`;
const CAL = (size: number, stroke: string) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round"><rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M4 10h16M9 3v4M15 3v4"></path></svg>`;
const SPARKLE = (size: number, fill: string) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z"></path></svg>`;
const HANDSET = (size: number, rotate = false) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#FDF8F5"${rotate ? ' style="transform: rotate(135deg)"' : ""}><path d="${PHONE_PATH}"></path></svg>`;

// background dust, spread around the phone
const dust = Array.from({ length: 40 }, () => {
  const x = -100 + rnd() * 760;
  const y = -40 + rnd() * 840;
  const big = rnd() < 0.16;
  const s = big ? 5 + rnd() * 5 : 1.5 + rnd() * 2.5;
  const b = big ? 3 + rnd() * 3 : rnd() * 1.2;
  const o = 0.3 + rnd() * 0.55;
  const dx = (rnd() - 0.5) * 70;
  const dy = -20 - rnd() * 60;
  const k = rnd() < 0.5 ? 1 : 0.5;
  const ph = rnd();
  const c = rnd() < 0.55 ? "#FDF8F5" : rnd() < 0.5 ? "#E8D2BF" : ACC;
  return `<div class="a dust" style="position: absolute; border-radius: 50%; left: ${x.toFixed(0)}px; top: ${y.toFixed(0)}px; width: ${s.toFixed(1)}px; height: ${s.toFixed(1)}px; background: ${c}; filter: blur(${b.toFixed(1)}px); box-shadow: 0 0 8px ${c}; --o: ${o.toFixed(2)}; --dx: ${dx.toFixed(0)}px; --dy: ${dy.toFixed(0)}px; animation-duration: calc(var(--T) * ${k}); animation-delay: calc(var(--T) * -${ph.toFixed(3)})"></div>`;
}).join("");

const sparkData = Array.from({ length: 18 }, (_, i) => {
  const ang = (i / 18) * Math.PI * 2 + rnd() * 0.3;
  const r = 40 + rnd() * 70;
  return {
    x: (Math.cos(ang) * r).toFixed(0),
    y: (Math.sin(ang) * r * 0.8).toFixed(0),
    s: (2 + rnd() * 3.5).toFixed(1),
    j: (rnd() * 0.006).toFixed(4),
    c: rnd() < 0.5 ? "#FDF8F5" : "#E8D2BF",
  };
});
const sparks = (halo: string) =>
  `<div class="a burst" style="position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d">${sparkData
    .map(
      (s) =>
        `<div class="a spark" style="position: absolute; left: 0; top: 0; border-radius: 50%; background: ${s.c}; box-shadow: 0 0 10px ${s.c}, 0 0 20px ${halo}; width: ${s.s}px; height: ${s.s}px; --px: ${s.x}px; --py: ${s.y}px; --j: ${s.j}"></div>`,
    )
    .join("")}</div>`;

const wave = [16, 30, 52, 26, 70, 96, 58, 110, 64, 92, 44, 74, 30, 40, 18]
  .map(
    (h, i) =>
      `<div class="wb wave" style="height: ${h}px; animation-delay: calc(var(--T) * -${(((i * 0.37) % 1) * 0.045).toFixed(4)})"></div>`,
  )
  .join("");
const miniWave = Array.from(
  { length: 22 },
  () =>
    `<div class="wave" style="width: 3px; border-radius: 2px; background: color-mix(in srgb, var(--acc) 80%, #FDF8F5); height: ${(6 + rnd() * 20).toFixed(0)}px; animation-delay: calc(var(--T) * -${(rnd() * 0.045).toFixed(4)})"></div>`,
).join("");
const panelWave = [14, 30, 44, 24, 50, 34, 42, 20, 12]
  .map(
    (h, i) =>
      `<div class="wb wave" style="height: ${h}px; animation-delay: calc(var(--T) / -${[1000, 90, 60, 45, 36, 30, 26, 23, 21][i]})"></div>`,
  )
  .join("");

const busy = [2, 5, 8, 9, 12, 15, 16, 19, 22, 23, 26, 29, 30];
const cells = Array.from(
  { length: 35 },
  (_, i) =>
    `<div style="height: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px"><div style="width: 12px; height: 5px; border-radius: 3px; background: rgba(253,248,245,${i < 2 || i > 31 ? ".1" : ".45"})"></div><div style="width: 4px; height: 4px; border-radius: 50%; background: var(--acc); opacity: ${busy.includes(i) ? 0.8 : 0}"></div></div>`,
).join("");
const weekdays = Array.from(
  { length: 7 },
  () =>
    `<div style="flex: 1; display: flex; justify-content: center"><div style="width: 12px; height: 4px; border-radius: 2px; background: rgba(253,248,245,.25)"></div></div>`,
).join("");
const hours = Array.from(
  { length: 7 },
  (_, i) =>
    `<div style="position: absolute; left: 0; right: 0; top: ${(i + 1) * 44}px; height: 1px; background: rgba(253,248,245,.06)"></div>`,
).join("");
const tones = [
  { bg: "color-mix(in srgb, var(--acc) 30%, #1E1A18)", bd: ACC },
  { bg: "rgba(77,179,128,.22)", bd: "#4DB380" },
  { bg: "rgba(232,210,191,.18)", bd: "#E8D2BF" },
];
const slots = [
  [0, 12, 64], [2, 20, 52], [1, 58, 70], [4, 30, 60], [3, 96, 52], [0, 110, 76], [2, 150, 64],
  [4, 128, 70], [1, 168, 56], [3, 188, 80], [0, 226, 60], [2, 252, 70], [4, 238, 58], [1, 264, 64],
];
const appts = slots
  .map(([col, t, h], i) => {
    const tone = tones[i % 3];
    return `<div class="a drop" style="position: absolute; left: ${(6 + col * 46.4).toFixed(1)}px; top: ${t}px; width: 42px; height: ${h}px; border-radius: 8px; box-sizing: border-box; background: ${tone.bg}; border-left: 3px solid ${tone.bd}; --i: ${(i * 0.7).toFixed(2)}"><div style="position: absolute; left: 5px; top: 7px; width: 26px; height: 4px; border-radius: 2px; background: rgba(253,248,245,.7)"></div><div style="position: absolute; left: 5px; top: 15px; width: 18px; height: 4px; border-radius: 2px; background: rgba(253,248,245,.35)"></div></div>`;
  })
  .join("");
const weekPanel = [ACC, "#4DB380", "#E8D2BF", ACC, "rgba(253,248,245,.18)", "#E8D2BF", ACC, "#4DB380", "#E8D2BF", ACC, "#4DB380", "rgba(253,248,245,.18)", ACC, "#E8D2BF", "#4DB380", ACC, "#E8D2BF", ACC, "rgba(253,248,245,.18)", "#4DB380"]
  .map((c) => `<div style="border-radius: 4px; background: ${c}"></div>`)
  .join("");

const qualRow = (top: number, w: number, i: number) => `
  <div style="position: absolute; left: 18px; top: ${top}px; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid rgba(253,248,245,.22); box-sizing: border-box"></div>
  <div class="a chkin" style="position: absolute; left: 18px; top: ${top}px; width: 22px; height: 22px; border-radius: 50%; background: #4DB380; box-shadow: 0 0 12px rgba(77,179,128,.6); display: flex; align-items: center; justify-content: center; --i: ${i}">${CHECK(13, "#FDF8F5", 3.4)}</div>
  <div class="pl" style="left: 52px; top: ${top + 8}px; width: ${w}px; height: 6px; background: rgba(253,248,245,.55)"></div>`;

const panelCheckRow = (top: number, w: number) => `
  <div style="position: absolute; left: 16px; top: ${top}px; width: 20px; height: 20px; border-radius: 50%; background: #4DB380; box-shadow: 0 0 12px rgba(77,179,128,.7); display: flex; align-items: center; justify-content: center">${CHECK(12, "#FDF8F5", 3.6)}</div>
  <div class="pl" style="left: 46px; top: ${top + 7}px; width: ${w}px; height: 6px; background: rgba(253,248,245,.8)"></div>`;

// three copies per lifted panel: two blurred ghosts trail the real one
const orbit = (
  vars: string,
  box: { l: number; t: number; w: number; h: number },
  streakSide: "left" | "right",
  inner: string,
  halo: string,
) => {
  const pos = `left: ${box.l}px; top: ${box.t}px; width: ${box.w}px; height: ${box.h}px`;
  const streak =
    streakSide === "left"
      ? `left: 100%; background: linear-gradient(90deg, color-mix(in srgb, var(--acc) 90%, transparent), transparent)`
      : `right: 100%; background: linear-gradient(270deg, color-mix(in srgb, var(--acc) 90%, transparent), transparent)`;
  return `<div class="orbit" style="${vars}">
    <div class="glass a lift" style="${pos}; --lag: 0.008; --pk: .14; --bl: 8px"></div>
    <div class="glass a lift" style="${pos}; --lag: 0.004; --pk: .32; --bl: 4px"></div>
    <div class="glass a lift" style="${pos}">
      <div class="a streak" style="position: absolute; ${streak}; top: ${box.h / 2 - 1}px; width: 180px; height: 2px; filter: blur(1px)"></div>
      ${inner}
    </div>
    ${sparks(halo)}
  </div>`;
};

const ACC_HALO = "color-mix(in srgb, var(--acc) 70%, transparent)";

const screen = `
<!-- SCENE 1 · incoming call, answered by the AI voice -->
<div class="a scn" style="position: absolute; left: 0; top: 0; width: 280px; height: 600px; --sd: 0s">
  <div class="pl" style="left: 105px; top: 58px; width: 70px; height: 6px; background: rgba(253,248,245,.25)"></div>
  <div class="a ringvis" style="position: absolute; left: 92px; top: 118px; width: 96px; height: 96px">
    <div class="ripple" style="position: absolute; left: 0; top: 0; width: 96px; height: 96px; border-radius: 50%; border: 2px solid var(--acc); box-sizing: border-box"></div>
    <div class="ripple" style="position: absolute; left: 0; top: 0; width: 96px; height: 96px; border-radius: 50%; border: 2px solid var(--acc); box-sizing: border-box; animation-delay: calc(var(--T) / -36)"></div>
    <div class="ripple" style="position: absolute; left: 0; top: 0; width: 96px; height: 96px; border-radius: 50%; border: 2px solid var(--acc); box-sizing: border-box; animation-delay: calc(var(--T) / -18)"></div>
  </div>
  <div style="position: absolute; left: 92px; top: 118px; width: 96px; height: 96px; border-radius: 50%; background: linear-gradient(135deg, #5A4A40, #2B2421); border: 2px solid rgba(253,248,245,.16); box-sizing: border-box; display: flex; align-items: center; justify-content: center">
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#D9BFA9" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="8.5" r="3.6"></circle><path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4"></path></svg>
  </div>
  <div class="a answered" style="position: absolute; left: 162px; top: 186px; width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, var(--acc), #E8D2BF); box-shadow: 0 0 0 3px #1A1614, 0 0 16px ${ACC_HALO}; display: flex; align-items: center; justify-content: center">${SPARKLE(16, "#1A1A1A")}</div>
  <div class="pl" style="left: 80px; top: 238px; width: 120px; height: 10px; background: rgba(253,248,245,.88)"></div>
  <div class="pl" style="left: 100px; top: 256px; width: 80px; height: 6px; background: rgba(253,248,245,.3)"></div>
  <div class="a ringvis" style="position: absolute; left: 108px; top: 278px; width: 64px; height: 18px; border-radius: 9px; background: color-mix(in srgb, var(--acc) 22%, transparent); display: flex; align-items: center; justify-content: center; gap: 5px">
    <div class="dot" style="width: 5px; height: 5px; border-radius: 50%; background: var(--acc)"></div>
    <div class="dot" style="width: 5px; height: 5px; border-radius: 50%; background: var(--acc); animation-delay: calc(var(--T) / 72)"></div>
    <div class="dot" style="width: 5px; height: 5px; border-radius: 50%; background: var(--acc); animation-delay: calc(var(--T) / 36)"></div>
  </div>
  <div class="a answered" style="position: absolute; left: 102px; top: 278px; width: 76px; height: 18px; border-radius: 9px; background: rgba(77,179,128,.16); border: 1px solid rgba(77,179,128,.4); box-sizing: border-box">
    <div style="position: absolute; left: 8px; top: 5px; width: 6px; height: 6px; border-radius: 50%; background: #4DB380; box-shadow: 0 0 8px #4DB380"></div>
    <div class="pl" style="left: 20px; top: 6px; width: 46px; height: 5px; background: rgba(77,179,128,.85)"></div>
  </div>
  <div class="a answered" style="position: absolute; left: 20px; top: 318px; width: 240px; height: 130px">
    <div class="a dim" style="position: absolute; left: 0; top: 0; width: 240px; height: 130px">
      <div style="position: absolute; left: 40px; top: 5px; width: 160px; height: 120px; border-radius: 50%; background: radial-gradient(ellipse, color-mix(in srgb, var(--acc) 38%, transparent), transparent 70%); filter: blur(8px)"></div>
      <div style="position: absolute; left: 0; top: 0; width: 240px; height: 130px; display: flex; align-items: center; justify-content: center; gap: 5px">${wave}</div>
    </div>
  </div>
  <div class="a answered" style="position: absolute; left: 0; top: 462px; width: 280px; height: 30px">
    <div class="pl" style="left: 50px; top: 4px; width: 180px; height: 6px; background: rgba(253,248,245,.45)"></div>
    <div class="pl" style="left: 76px; top: 18px; width: 128px; height: 6px; background: rgba(253,248,245,.25)"></div>
  </div>
  <div class="a ringvis" style="position: absolute; left: 0; top: 476px; width: 280px; height: 80px">
    <div style="position: absolute; left: 48px; top: 6px; width: 62px; height: 62px; border-radius: 50%; background: #B5564B; display: flex; align-items: center; justify-content: center">${HANDSET(26, true)}</div>
    <div class="a press" style="position: absolute; left: 170px; top: 6px; width: 62px; height: 62px; border-radius: 50%; background: #4DB380; box-shadow: 0 0 26px rgba(77,179,128,.6); display: flex; align-items: center; justify-content: center">${HANDSET(26)}</div>
  </div>
  <div class="a answered" style="position: absolute; left: 0; top: 512px; width: 280px; height: 56px">
    <div style="position: absolute; left: 46px; top: 8px; width: 42px; height: 42px; border-radius: 50%; background: rgba(253,248,245,.08)"></div>
    <div style="position: absolute; left: 112px; top: 2px; width: 56px; height: 56px; border-radius: 50%; background: #B5564B; display: flex; align-items: center; justify-content: center">${HANDSET(24, true)}</div>
    <div style="position: absolute; left: 192px; top: 8px; width: 42px; height: 42px; border-radius: 50%; background: rgba(253,248,245,.08)"></div>
  </div>
</div>

<!-- SCENE 2 · lead qualified mid-conversation -->
<div class="a scn" style="position: absolute; left: 0; top: 0; width: 280px; height: 600px; --sd: calc(var(--T) * -0.75)">
  <div class="a pop" style="position: absolute; left: 0; top: 0; width: 280px; height: 104px; --i: 0">
    <div style="position: absolute; left: 20px; top: 50px; width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #5A4A40, #2B2421); border: 1.5px solid rgba(253,248,245,.18); box-sizing: border-box"></div>
    <div class="pl" style="left: 66px; top: 56px; width: 84px; height: 8px; background: rgba(253,248,245,.85)"></div>
    <div class="pl" style="left: 66px; top: 70px; width: 46px; height: 6px; background: rgba(77,179,128,.75)"></div>
    <div style="position: absolute; right: 20px; top: 52px; width: 50px; height: 32px; display: flex; align-items: center; justify-content: center; gap: 4px">
      <div class="wb wave" style="height: 12px"></div>
      <div class="wb wave" style="height: 22px; animation-delay: calc(var(--T) / -80)"></div>
      <div class="wb wave" style="height: 30px; animation-delay: calc(var(--T) / -50)"></div>
      <div class="wb wave" style="height: 18px; animation-delay: calc(var(--T) / -35)"></div>
      <div class="wb wave" style="height: 10px; animation-delay: calc(var(--T) / -28)"></div>
    </div>
    <div style="position: absolute; left: 20px; right: 20px; top: 100px; height: 1px; background: rgba(253,248,245,.07)"></div>
  </div>
  <div class="a pop" style="position: absolute; left: 20px; top: 116px; width: 170px; height: 50px; border-radius: 18px 18px 18px 6px; background: #2B2522; border: 1px solid rgba(253,248,245,.08); box-sizing: border-box; --i: 1">
    <div class="pl" style="left: 16px; top: 15px; width: 128px; height: 7px; background: rgba(253,248,245,.7)"></div>
    <div class="pl" style="left: 16px; top: 29px; width: 86px; height: 7px; background: rgba(253,248,245,.4)"></div>
  </div>
  <div class="a pop" style="position: absolute; right: 20px; top: 176px; width: 184px; height: 52px; border-radius: 18px 18px 6px 18px; background: linear-gradient(135deg, var(--acc), #E8D2BF); --i: 3">
    <div style="position: absolute; left: 12px; top: 14px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; gap: 2px">
      <div style="width: 3px; height: 8px; border-radius: 2px; background: rgba(26,26,26,.6)"></div>
      <div style="width: 3px; height: 16px; border-radius: 2px; background: rgba(26,26,26,.6)"></div>
      <div style="width: 3px; height: 11px; border-radius: 2px; background: rgba(26,26,26,.6)"></div>
      <div style="width: 3px; height: 6px; border-radius: 2px; background: rgba(26,26,26,.6)"></div>
    </div>
    <div class="pl" style="left: 44px; top: 16px; width: 120px; height: 7px; background: rgba(26,26,26,.55)"></div>
    <div class="pl" style="left: 44px; top: 30px; width: 84px; height: 7px; background: rgba(26,26,26,.4)"></div>
  </div>
  <div class="a pop" style="position: absolute; left: 20px; top: 238px; width: 140px; height: 40px; border-radius: 18px 18px 18px 6px; background: #2B2522; border: 1px solid rgba(253,248,245,.08); box-sizing: border-box; --i: 5">
    <div class="pl" style="left: 16px; top: 16px; width: 96px; height: 7px; background: rgba(253,248,245,.65)"></div>
  </div>
  <div class="a typing" style="position: absolute; right: 20px; top: 290px; width: 66px; height: 34px; border-radius: 18px 18px 6px 18px; background: color-mix(in srgb, var(--acc) 24%, transparent); display: flex; align-items: center; justify-content: center; gap: 6px">
    <div class="dot" style="width: 7px; height: 7px; border-radius: 50%; background: #FDF8F5"></div>
    <div class="dot" style="width: 7px; height: 7px; border-radius: 50%; background: #FDF8F5; animation-delay: calc(var(--T) / 72)"></div>
    <div class="dot" style="width: 7px; height: 7px; border-radius: 50%; background: #FDF8F5; animation-delay: calc(var(--T) / 36)"></div>
  </div>
  <div class="a dim" style="position: absolute; left: 20px; top: 340px; width: 240px; height: 170px">
    <div class="a pop tile" style="left: 0; top: 0; width: 240px; height: 170px; --i: 2">
      <div class="pl" style="left: 18px; top: 20px; width: 82px; height: 7px; background: rgba(253,248,245,.6)"></div>
      <div class="pl" style="right: 18px; top: 16px; width: 44px; height: 16px; background: color-mix(in srgb, var(--acc) 35%, transparent)"></div>
      ${qualRow(52, 110, -6)}${qualRow(90, 90, -3)}${qualRow(128, 124, 0)}
    </div>
  </div>
  <div style="position: absolute; left: 20px; top: 528px; width: 240px; height: 44px; border-radius: 22px; border: 1px solid rgba(253,248,245,.1); box-sizing: border-box; display: flex; align-items: center; justify-content: center; gap: 4px">${miniWave}</div>
</div>

<!-- SCENE 3 · appointment booked -->
<div class="a scn" style="position: absolute; left: 0; top: 0; width: 280px; height: 600px; --sd: calc(var(--T) * -0.5)">
  <div class="a pop" style="position: absolute; left: 0; top: 0; width: 280px; height: 96px; --i: 0">
    <div style="position: absolute; left: 20px; top: 50px; width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid color-mix(in srgb, var(--acc) 70%, transparent); box-sizing: border-box; display: flex; align-items: center; justify-content: center">${CAL(16, "#E8D2BF")}</div>
    <div class="pl" style="left: 66px; top: 56px; width: 86px; height: 8px; background: rgba(253,248,245,.85)"></div>
    <div class="pl" style="left: 66px; top: 70px; width: 50px; height: 6px; background: rgba(253,248,245,.3)"></div>
    <div style="position: absolute; right: 48px; top: 56px; width: 20px; height: 20px; border-radius: 50%; background: rgba(253,248,245,.07)"></div>
    <div style="position: absolute; right: 20px; top: 56px; width: 20px; height: 20px; border-radius: 50%; background: rgba(253,248,245,.07)"></div>
  </div>
  <div class="a pop tile" style="left: 20px; top: 100px; width: 240px; height: 190px; --i: 1">
    <div style="position: absolute; left: 15px; top: 16px; width: 210px; display: flex">${weekdays}</div>
    <div style="position: absolute; left: 15px; top: 34px; width: 210px; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); row-gap: 4px">${cells}</div>
    <div class="a selvis" style="position: absolute; left: 108px; top: 89px; width: 26px; height: 26px; border-radius: 9px; background: linear-gradient(135deg, var(--acc), #E8D2BF); box-shadow: 0 0 18px ${ACC_HALO}; display: flex; align-items: center; justify-content: center; --i: -3">
      <div style="width: 12px; height: 5px; border-radius: 3px; background: rgba(26,26,26,.7)"></div>
    </div>
  </div>
  <div class="a pop" style="position: absolute; left: 20px; top: 306px; width: 240px; height: 118px; --i: 3">
    <div class="tile" style="left: 0; top: 0; width: 240px; height: 34px; border-radius: 12px"><div class="pl" style="left: 16px; top: 14px; width: 60px; height: 6px; background: rgba(253,248,245,.5)"></div></div>
    <div class="tile" style="left: 0; top: 42px; width: 240px; height: 34px; border-radius: 12px"><div class="pl" style="left: 16px; top: 14px; width: 60px; height: 6px; background: rgba(253,248,245,.5)"></div></div>
    <div class="a selvis" style="position: absolute; left: 0; top: 42px; width: 240px; height: 34px; border-radius: 12px; background: linear-gradient(135deg, var(--acc), #E8D2BF); box-shadow: 0 6px 20px color-mix(in srgb, var(--acc) 40%, transparent); --i: 0">
      <div class="pl" style="left: 16px; top: 14px; width: 60px; height: 6px; background: rgba(26,26,26,.65)"></div>
      <div style="position: absolute; right: 12px; top: 9px; width: 16px; height: 16px; border-radius: 50%; background: rgba(26,26,26,.7)"></div>
    </div>
    <div class="tile" style="left: 0; top: 84px; width: 240px; height: 34px; border-radius: 12px"><div class="pl" style="left: 16px; top: 14px; width: 60px; height: 6px; background: rgba(253,248,245,.5)"></div></div>
  </div>
  <div class="a pop" style="position: absolute; left: 20px; top: 446px; width: 240px; height: 50px; border-radius: 25px; background: rgba(253,248,245,.1); border: 1px solid rgba(253,248,245,.16); box-sizing: border-box; --i: 4">
    <div class="pl" style="left: 80px; top: 21px; width: 80px; height: 7px; background: rgba(253,248,245,.6)"></div>
    <div class="a spinvis" style="position: absolute; left: 106px; top: 11px; width: 26px; height: 26px; border-radius: 13px; background: #2A2421">
      <div class="spin" style="width: 26px; height: 26px; border-radius: 50%; border: 3px solid rgba(253,248,245,.15); border-top-color: #FDF8F5; box-sizing: border-box"></div>
    </div>
  </div>
  <div class="a shade" style="position: absolute; left: 0; top: 0; width: 280px; height: 600px; background: rgba(10,9,8,.6)"></div>
  <div class="a dim" style="position: absolute; left: 30px; top: 200px; width: 220px; height: 128px">
    <div class="a success" style="position: absolute; left: 0; top: 0; width: 220px; height: 128px; border-radius: 22px; background: linear-gradient(160deg, #2E2723, #1C1816); border: 1px solid rgba(77,179,128,.45); box-sizing: border-box; box-shadow: 0 0 40px rgba(77,179,128,.35), 0 24px 50px rgba(0,0,0,.5)">
      <div style="position: absolute; left: 18px; top: 20px; width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, var(--acc), #E8D2BF); display: flex; align-items: center; justify-content: center">${CAL(22, "#1A1A1A")}</div>
      <div class="pl" style="left: 74px; top: 26px; width: 100px; height: 8px; background: rgba(253,248,245,.9)"></div>
      <div class="pl" style="left: 74px; top: 42px; width: 70px; height: 6px; background: rgba(253,248,245,.4)"></div>
      <div class="pl" style="left: 18px; top: 84px; width: 120px; height: 6px; background: rgba(253,248,245,.35)"></div>
      <div class="pl" style="left: 18px; top: 98px; width: 84px; height: 6px; background: rgba(253,248,245,.25)"></div>
      <div style="position: absolute; right: 16px; top: 76px; width: 36px; height: 36px">
        <div class="a pulse" style="position: absolute; left: 0; top: 0; width: 36px; height: 36px; border-radius: 50%; border: 2px solid #4DB380; box-sizing: border-box"></div>
        <div class="a pulse" style="position: absolute; left: 0; top: 0; width: 36px; height: 36px; border-radius: 50%; border: 2px solid rgba(77,179,128,.6); box-sizing: border-box; --i: 2"></div>
        <div style="position: absolute; left: 0; top: 0; width: 36px; height: 36px; border-radius: 50%; background: #4DB380; box-shadow: 0 0 20px rgba(77,179,128,.75); display: flex; align-items: center; justify-content: center">${CHECK(18, "#FDF8F5")}</div>
      </div>
    </div>
  </div>
</div>

<!-- SCENE 4 · calendar fills itself on autopilot -->
<div class="a scn" style="position: absolute; left: 0; top: 0; width: 280px; height: 600px; --sd: calc(var(--T) * -0.25)">
  <div class="pl" style="left: 20px; top: 56px; width: 96px; height: 8px; background: rgba(253,248,245,.85)"></div>
  <div class="pl" style="left: 20px; top: 70px; width: 60px; height: 6px; background: rgba(253,248,245,.3)"></div>
  <div style="position: absolute; right: 20px; top: 54px; width: 44px; height: 26px; border-radius: 13px; background: rgba(253,248,245,.12)">
    <div class="a trackon" style="position: absolute; left: 0; top: 0; width: 44px; height: 26px; border-radius: 13px; background: #4DB380; box-shadow: 0 0 14px rgba(77,179,128,.6)"></div>
    <div class="a knob" style="position: absolute; left: 3px; top: 3px; width: 20px; height: 20px; border-radius: 50%; background: #FDF8F5; box-shadow: 0 2px 6px rgba(0,0,0,.4)"></div>
  </div>
  <div class="a trackon" style="position: absolute; right: 70px; top: 59px; width: 16px; height: 16px">${SPARKLE(16, "#E8D2BF")}</div>
  <div style="position: absolute; left: 20px; top: 98px; width: 240px; height: 40px; display: flex; gap: 4px; padding: 0 6px; box-sizing: border-box">
    ${[0, 1, 2, 3, 4]
      .map(
        (d) =>
          `<div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px"><div style="width: 14px; height: 4px; border-radius: 2px; background: rgba(253,248,245,.3)"></div><div style="width: 24px; height: 24px; border-radius: 50%; background: ${d === 1 ? "linear-gradient(135deg, var(--acc), #E8D2BF)" : "rgba(253,248,245,.06)"}"></div></div>`,
      )
      .join("")}
  </div>
  <div class="a dim" style="position: absolute; left: 20px; top: 148px; width: 240px; height: 350px">
    <div class="tile" style="left: 0; top: 0; width: 240px; height: 350px; overflow: hidden">${hours}${appts}</div>
  </div>
  <div style="position: absolute; left: 20px; top: 520px; width: 240px; height: 40px">
    <div class="pl" style="left: 0; top: 0; width: 70px; height: 6px; background: rgba(253,248,245,.4)"></div>
    <div class="pl" style="right: 0; top: 0; width: 36px; height: 6px; background: #4DB380"></div>
    <div style="position: absolute; left: 0; top: 18px; width: 240px; height: 8px; border-radius: 4px; background: rgba(253,248,245,.08); overflow: hidden">
      <div class="a barfill" style="width: 240px; height: 8px; border-radius: 4px; background: linear-gradient(90deg, var(--acc), #4DB380)"></div>
    </div>
  </div>
</div>

<div class="a flash" style="position: absolute; left: 0; top: 0; width: 280px; height: 600px; background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--acc) 55%, transparent), transparent 60%); mix-blend-mode: screen"></div>
<div class="a sheen" style="position: absolute; left: -40%; top: 0; width: 180%; height: 600px; background: linear-gradient(112deg, transparent 36%, rgba(253,248,245,.06) 46%, transparent 56%)"></div>
<div style="position: absolute; left: 95px; top: 12px; width: 90px; height: 26px; border-radius: 13px; background: #000"></div>`;

const orbits = [
  orbit(
    "--sd: 0s; --dir: 1; --ox: 0px; --oy: 82px",
    { l: -94, t: -42, w: 188, h: 84 },
    "left",
    `<div style="position: absolute; left: 16px; top: 20px; width: 44px; height: 44px; border-radius: 50%; background: #4DB380; box-shadow: 0 0 22px rgba(77,179,128,.75); display: flex; align-items: center; justify-content: center">${HANDSET(20)}</div>
     <div style="position: absolute; left: 72px; top: 16px; width: 100px; height: 52px; display: flex; align-items: center; gap: 4px">${panelWave}</div>`,
    ACC_HALO,
  ),
  orbit(
    "--sd: calc(var(--T) * -0.75); --dir: -1; --ox: 0px; --oy: 125px",
    { l: -90, t: -58, w: 180, h: 116 },
    "right",
    `${panelCheckRow(16, 96)}${panelCheckRow(48, 78)}${panelCheckRow(80, 108)}`,
    "rgba(77,179,128,.6)",
  ),
  orbit(
    "--sd: calc(var(--T) * -0.5); --dir: 1; --ox: 0px; --oy: -36px",
    { l: -94, t: -50, w: 188, h: 100 },
    "left",
    `<div style="position: absolute; left: 16px; top: 18px; width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, var(--acc), #E8D2BF); display: flex; align-items: center; justify-content: center">${CAL(20, "#1A1A1A")}</div>
     <div class="pl" style="left: 66px; top: 24px; width: 80px; height: 7px; background: rgba(253,248,245,.9)"></div>
     <div class="pl" style="left: 66px; top: 40px; width: 56px; height: 6px; background: rgba(253,248,245,.45)"></div>
     <div class="pl" style="left: 16px; top: 74px; width: 96px; height: 6px; background: rgba(253,248,245,.35)"></div>
     <div style="position: absolute; right: 14px; top: 62px; width: 28px; height: 28px; border-radius: 50%; background: #4DB380; box-shadow: 0 0 18px rgba(77,179,128,.8); display: flex; align-items: center; justify-content: center">${CHECK(15, "#FDF8F5")}</div>`,
    ACC_HALO,
  ),
  orbit(
    "--sd: calc(var(--T) * -0.25); --dir: -1; --ox: 0px; --oy: 20px",
    { l: -80, t: -62, w: 160, h: 124 },
    "right",
    `<div style="position: absolute; left: 14px; top: 14px; width: 132px; height: 96px; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); grid-template-rows: repeat(4, minmax(0, 1fr)); gap: 4px">${weekPanel}</div>`,
    ACC_HALO,
  ),
].join("");

const raw = `
<div class="a glow" style="position: absolute; left: -60px; top: 40px; width: 680px; height: 680px; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--acc) 30%, transparent) 0%, transparent 62%); filter: blur(30px)"></div>
<div class="a beam" style="position: absolute; left: 370px; top: -390px; width: 300px; height: 1300px; transform-origin: 50% 0; background: linear-gradient(to bottom, color-mix(in srgb, var(--acc) 34%, transparent), transparent 72%); filter: blur(42px); mix-blend-mode: screen"></div>
<div class="a beam" style="position: absolute; left: 570px; top: -390px; width: 140px; height: 1200px; transform-origin: 50% 0; background: linear-gradient(to bottom, rgba(253,248,245,.16), transparent 70%); filter: blur(30px); mix-blend-mode: screen; animation-delay: calc(var(--T) * -0.5)"></div>
${dust}
<div class="a shadow" style="position: absolute; left: 140px; top: 730px; width: 280px; height: 44px; border-radius: 50%; background: radial-gradient(ellipse, rgba(0,0,0,.85), transparent 70%); filter: blur(10px)"></div>
<div style="position: absolute; left: 0; top: 0; width: 560px; height: 760px; perspective: 1800px; perspective-origin: 280px 360px">
  <div class="a cam" style="position: absolute; left: 130px; top: 70px; width: 300px; height: 620px; transform-style: preserve-3d">
    <div class="a bob" style="position: absolute; left: 0; top: 0; width: 300px; height: 620px; transform-style: preserve-3d">
      <div style="position: absolute; left: 0; top: 0; width: 300px; height: 620px; border-radius: 48px; background: linear-gradient(160deg, #3A312C, #141110); transform: translateZ(-14px); box-shadow: 0 60px 120px rgba(0,0,0,.65)"></div>
      <div style="position: absolute; left: 0; top: 0; width: 300px; height: 620px; border-radius: 48px; transform: translateZ(0px); background: linear-gradient(145deg, #6A5A50 0%, #2B2421 32%, #4B3F38 64%, #1C1816 100%); box-shadow: inset 0 0 0 1px rgba(253,248,245,.14), inset 0 2px 0 rgba(253,248,245,.18), 0 0 90px color-mix(in srgb, var(--acc) 22%, transparent)">
        <div style="position: absolute; right: -3px; top: 170px; width: 4px; height: 76px; border-radius: 3px; background: #3A312C"></div>
        <div style="position: absolute; left: -3px; top: 140px; width: 4px; height: 44px; border-radius: 3px; background: #3A312C"></div>
        <div style="position: absolute; left: -3px; top: 196px; width: 4px; height: 44px; border-radius: 3px; background: #3A312C"></div>
        <div style="position: absolute; left: 10px; top: 10px; width: 280px; height: 600px; border-radius: 39px; overflow: hidden; background: radial-gradient(ellipse 120% 70% at 50% 0%, #241E1B 0%, #141211 60%, #100E0D 100%); box-shadow: inset 0 0 0 1px rgba(0,0,0,.6)">${screen}</div>
      </div>
      ${orbits}
    </div>
  </div>
</div>
<div class="a dust" style="position: absolute; left: 650px; top: 570px; width: 46px; height: 46px; border-radius: 50%; background: color-mix(in srgb, var(--acc) 70%, transparent); filter: blur(14px); --o: .5; --dx: -30px; --dy: -24px; animation-delay: calc(var(--T) * -0.3)"></div>
<div class="a dust" style="position: absolute; left: 490px; top: 20px; width: 30px; height: 30px; border-radius: 50%; background: rgba(253,248,245,.6); filter: blur(10px); --o: .4; --dx: 20px; --dy: 30px; animation-delay: calc(var(--T) * -0.7)"></div>
<div class="a dust" style="position: absolute; left: 10px; top: 690px; width: 38px; height: 38px; border-radius: 50%; background: color-mix(in srgb, var(--acc) 60%, transparent); filter: blur(13px); --o: .35; --dx: 26px; --dy: -18px; animation-duration: calc(var(--T) * 0.5)"></div>`;

// namespace every class so nothing collides with Tailwind or index.css
const html = raw
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(
    /class="([^"]*)"/g,
    (_, names: string) =>
      `class="${names
        .split(/\s+/)
        .filter(Boolean)
        .map((n) => `hm-${n}`)
        .join(" ")}"`,
  );

export default function HeroMotion() {
  return (
    <div className="hm-outer" aria-hidden="true">
      <div className="hm-scale" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
