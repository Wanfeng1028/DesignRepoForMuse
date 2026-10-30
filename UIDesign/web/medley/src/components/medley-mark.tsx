import { tokens, modelDotColor } from "../tokens";

/**
 * Medley "M" mark, rebuilt from the marching-squares trace rule documented in
 * muse/DESIGN-TOKENS.md sec. 8: two white loops separated by a diagonal
 * swoosh cut, plus the orange block at (30,47,2,5), viewBox "19 43 17 19".
 * No brand bitmap is copied; this is a vector reconstruction of that rule.
 */
export function MedleyMark({ size = 24, color = "#F5F5F7" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="19 43 17 19" fill="none" aria-hidden="true">
      <path
        d="M20.5 44 L21 43.5 L22 43.5 L23 43.5 L24 43.5 L24.5 44 L25 44.5 L26 44.5 L26.5 45 L27 45.5 L27.5 46 L27.5 47 L27.5 48 L27.5 49 L27.5 50 L27 50.5 L26.5 51 L26 51.5 L25 51.5 L24.5 52 L24 52.5 L23.5 53 L23 53.5 L22 53.5 L21.5 54 L21 54.5 L20.5 54 L20.5 53 L20.5 52 L20.5 51 L20.5 50 L20.5 49 L20.5 48 L20.5 47 L20.5 46 L20.5 45 L20.5 44 Z"
        fill={color}
      />
      <path
        d="M31.5 44 L32 43.5 L33 43.5 L34 43.5 L34.5 44 L34 44.5 L33.5 45 L34 45.5 L34.5 46 L34 46.5 L33.5 47 L33.5 48 L33.5 49 L33.5 50 L33.5 51 L33.5 52 L33.5 53 L33.5 54 L33.5 55 L33.5 56 L33.5 57 L34 57.5 L34.5 58 L34 58.5 L33.5 59 L34 59.5 L34.5 60 L34 60.5 L33 60.5 L32.5 60 L32 59.5 L31 59.5 L30 59.5 L29.5 59 L29 58.5 L28.5 58 L28.5 57 L28.5 56 L29 55.5 L29.5 55 L29 54.5 L28.5 54 L28 53.5 L27.5 54 L27.5 55 L27.5 56 L27 56.5 L26.5 57 L26.5 58 L26 58.5 L25.5 59 L25.5 60 L25 60.5 L24.5 61 L24 61.5 L23 61.5 L22 61.5 L21 61.5 L20 61.5 L19.5 61 L19.5 60 L20 59.5 L20.5 59 L21 58.5 L21.5 58 L22 57.5 L22.5 57 L22.5 56 L23 55.5 L24 55.5 L24.5 55 L25 54.5 L25.5 54 L26 53.5 L26.5 53 L27 52.5 L28 52.5 L28.5 52 L29 51.5 L30 51.5 L30.5 51 L31 50.5 L32 50.5 L32.5 50 L32 49.5 L31.5 49 L31.5 48 L31.5 47 L31 46.5 L30.5 46 L30 45.5 L29.5 45 L30 44.5 L31 44.5 L31.5 44 Z"
        fill={color}
      />
      <rect x="30" y="47" width="2" height="5" fill={tokens.colors.accent} />
    </svg>
  );
}

/** Single 8px model dot (AiMeta rule: one dot per model, never a 5-dot cluster).
 * v1.5: dots are glossy balls in photo-9 (bright highlight over a saturated
 * base: Kimi gold, GPT green), so the disc renders a white highlight
 * gradient over the existing measured base hue instead of a flat disc. */
export function ModelDot({ model, size = 8 }: { model: string; size?: number }) {
  const base = modelDotColor(model);
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%), ${base}`, display: "inline-block", flexShrink: 0 }}
    />
  );
}

/**
 * v1.5 brand dot cluster (photo-9): three glossy balls on a rising diagonal
 * beside the Medley wordmark (welcome header) and beside "Auto".
 * Centres in photo-9 TL: green (132,200), blue (143,193), pink (156,188):
 * ~11-13 photo px apart horizontally, rising ~12 photo px overall, discs
 * ~14 photo px. At web scale that is 9px discs, 0/4/8px rises, touching.
 * Vector redraw only; no brand bitmap is copied. v1.6: this is the Auto
 * motif everywhere (home, picker Auto card, chat-info backdrop, desktop
 * chrome) — the old 5-dot horizontal Auto row is retired.
 */
export function BrandDots({ size = 9 }: { size?: number }) {
  const dots = [tokens.colors.brandDotGreen, tokens.colors.brandDotBlue, tokens.colors.brandDotPink];
  const rises = [0, 4, 8];
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 1, flexShrink: 0 }} aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{ width: size, height: size, marginBottom: rises[i], borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${d.highlight} 0%, ${d.base} 72%)`, display: "inline-block" }}
        />
      ))}
    </span>
  );
}

/**
 * Dot cluster. v1.6: Auto everywhere is BrandDots now (welcome header,
 * home, picker Auto card, chat-info backdrop, desktop chrome); ModelDots
 * remains ONLY for the pricing Pro-card dot row (horizontal, 6 dots).
 * Gap is a prop because the Pro row pitch measures ~14 CSS (size 8 +
 * gap 6), not the old gap-2 pitch 10 (HD5 pricing, saturation peaks
 * x165/184/206/226/247/265).
 */
export function ModelDots({ size = 6, count = 5, gap = 2 }: { size?: number; count?: number; gap?: number }) {
  const dots = [tokens.colors.modelDotsFirst, "#4A7DE4", "#2EB5A5", "#9B5DE5", "#3FA34D", "#C65D7B"];
  return (
    <span style={{ display: "inline-flex", gap, alignItems: "center" }} aria-hidden="true">
      {dots.slice(0, count).map((d, i) => (
        <span key={i} style={{ width: size, height: size, borderRadius: "50%", background: d, display: "inline-block" }} />
      ))}
    </span>
  );
}

/**
 * v1.6 pricing top dot row: SIX glossy dots on a RISING DIAGONAL, not a
 * horizontal row (HD5 pricing centres (106,206) (139,196) (172,186)
 * (203,175) (237,168) (271,160): pitch ~23 CSS, rises [0,6,13,19,26,32]).
 * Palette in original left-to-right order; the yellow slot reuses the
 * Kimi olive #9A9A3E as a documented estimate (the measured yellow-green
 * median is gloss-mixed, its base is not directly separable). Gloss
 * finish matches BrandDots/ModelDot (saturated base + white highlight).
 */
export function DiagonalDots({ size = 10 }: { size?: number }) {
  const dots = ["#C65D7B", "#4A7DE4", "#9A9A3E", "#2EB5A5", "#9B5DE5", "#E2A181"];
  const rises = [0, 6, 13, 19, 26, 32];
  const pitch = 23;
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: pitch - size, flexShrink: 0 }} aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{ width: size, height: size, marginBottom: rises[i], borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%), ${d}`, display: "inline-block" }}
        />
      ))}
    </span>
  );
}
