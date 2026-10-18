/**
 * Brand gradients for the colour-card system.
 *
 * The catalogue stores each record's accent as a Tailwind gradient string
 * (e.g. "from-cyan-500 to-blue-600"). Cards need real colour values so they can
 * tint their rail, glow and shadow, so the two stops are resolved to hex here
 * and handed to CSS as custom properties.
 */
const TW: Record<string, string> = {
  "blue-500": "#3b82f6", "blue-600": "#2563eb", "blue-700": "#1d4ed8",
  "indigo-500": "#6366f1", "indigo-600": "#4f46e5", "violet-600": "#7c3aed",
  "purple-500": "#a855f7", "purple-600": "#9333ea", "fuchsia-600": "#c026d3",
  "pink-500": "#ec4899", "pink-600": "#db2777",
  "emerald-500": "#10b981", "emerald-600": "#059669",
  "teal-500": "#14b8a6", "teal-600": "#0d9488",
  "amber-500": "#f59e0b", "amber-600": "#d97706",
  "orange-500": "#f97316", "orange-600": "#ea580c",
  "rose-500": "#f43f5e", "rose-600": "#e11d48", "red-600": "#dc2626",
  "cyan-500": "#06b6d4", "cyan-600": "#0891b2",
  "sky-500": "#0ea5e9", "sky-600": "#0284c7",
};

export const PALETTE = [
  "from-blue-600 to-indigo-600", "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600", "from-cyan-500 to-blue-600", "from-purple-600 to-fuchsia-600",
  "from-teal-500 to-emerald-600", "from-orange-500 to-rose-600", "from-indigo-600 to-violet-600",
];
export const palette = (i: number) => PALETTE[i % PALETTE.length];

const rgb = (h: string) => {
  const n = parseInt(h.slice(1), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
};
const alpha = (h: string, a: number) => {
  const [r, g, b] = rgb(h);
  return `rgba(${r},${g},${b},${a})`;
};

/** Resolve a Tailwind gradient string to the CSS custom properties a card reads. */
export function gradStyle(color?: string, delay?: number): React.CSSProperties {
  let c1 = "#2563eb";
  let c2 = "#4f46e5";
  if (color && color.indexOf("from-") > -1) {
    const m = [...color.matchAll(/(?:from|to|via)-([a-z]+-\d{3})/g)].map((x) => x[1]);
    if (m[0] && TW[m[0]]) c1 = TW[m[0]];
    const last = m[m.length - 1];
    if (last && TW[last]) c2 = TW[last];
  } else if (color && /^#[0-9a-f]{6}$/i.test(color)) {
    c1 = c2 = color;
  } else if (color && TW[color + "-600"]) {
    c1 = TW[color + "-600"];
    c2 = TW[color + "-500"] || c1;
  }
  return {
    "--c1": c1,
    "--c2": c2,
    "--grad": `linear-gradient(135deg,${c1},${c2})`,
    "--c1-06": alpha(c1, 0.06),
    "--c1-14": alpha(c1, 0.14),
    "--c1-35": alpha(c1, 0.35),
    "--c1-60": alpha(c1, 0.6),
    ...(delay != null ? { "--d": `${delay.toFixed(2)}s` } : {}),
  } as React.CSSProperties;
}
