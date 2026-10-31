/**
 * Liquid Glass displacement filter (v1.7).
 * Technique only, from nikdelvin-liquid-glass (MIT) src/utils/liquidGlass.ts:
 * the displacement map is a rounded rect (fill #808080, blur(depth)) over
 * X/Y gradient ramps composited with screen blend; three feDisplacementMap
 * passes separate the channels for chromatic aberration — R scale =
 * strength + 2*CA, G = strength + CA, B = strength — blended with screen.
 * Shipped params: strength 28, CA 2 (R 32 / G 30 / B 28). The nikdelvin
 * default (100 / 0) was rejected after the v1.7 probe: at 100 the backdrop
 * warps so hard it fringes green/purple at the edges (glass-test-noblur.png)
 * and would stop looking like the original screens; at 28 the refraction
 * reads at the edges while the backdrop stays legible. The filter is
 * applied as backdrop-filter: url(#medley-lg) (the nikdelvin usage: the
 * filter's SourceGraphic IS the backdrop), so element text is never
 * displaced — only the backdrop bends. No vendor control look is copied:
 * only the refraction/rim/shadow material, under the originals' fills.
 * The map is a fixed 400x160 nominal tile stretched by feImage
 * preserveAspectRatio="none" to each surface's box; corner radii stretch
 * with the box, which is acceptable for an edge-refraction map (verified
 * visually in the glass probe at 180x120 boxes).
 */
const DISPLACEMENT_MAP = "data:image/svg+xml;utf8,%3Csvg%20height%3D%22160%22%20width%3D%22400%22%20viewBox%3D%220%200%20400%20160%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cstyle%3E.mix%7Bmix-blend-mode%3Ascreen%7D%3C/style%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22Y%22%20x1%3D%220%22%20x2%3D%220%22%20y1%3D%222%25%22%20y2%3D%2298%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230F0%22/%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22/%3E%3C/linearGradient%3E%3ClinearGradient%20id%3D%22X%22%20x1%3D%221%25%22%20x2%3D%2299%25%22%20y1%3D%220%22%20y2%3D%220%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23F00%22/%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23000%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20height%3D%22160%22%20width%3D%22400%22%20fill%3D%22%23808080%22/%3E%3Cg%20filter%3D%22blur%282px%29%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20height%3D%22160%22%20width%3D%22400%22%20fill%3D%22%23000080%22/%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20height%3D%22160%22%20width%3D%22400%22%20fill%3D%22url%28%23Y%29%22%20class%3D%22mix%22/%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20height%3D%22160%22%20width%3D%22400%22%20fill%3D%22url%28%23X%29%22%20class%3D%22mix%22/%3E%3Crect%20x%3D%228%22%20y%3D%228%22%20height%3D%22144%22%20width%3D%22384%22%20fill%3D%22%23808080%22%20rx%3D%2226%22%20ry%3D%2226%22%20filter%3D%22blur%288px%29%22/%3E%3C/g%3E%3C/svg%3E";

import type { CSSProperties } from "react";

/* Backdrop-filter styles (inline on purpose — see the delivery warning in
 * index.css: the stylesheet optimizer silently drops these). */
function glassStyle(blur: number): CSSProperties {
  const v = `url(#medley-lg) blur(${blur}px) saturate(1.8)`;
  return { backdropFilter: v, WebkitBackdropFilter: v };
}

export const glassChromeStyle = glassStyle(50);
export const glassPanelStyle = glassStyle(90);
export const glassSmallStyle = glassStyle(6);

export function LiquidGlassDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="medley-lg" colorInterpolationFilters="sRGB">
          <feImage x="0" y="0" width="1" height="1" preserveAspectRatio="none" href={DISPLACEMENT_MAP} result="m" />
          <feDisplacementMap in="SourceGraphic" in2="m" scale="32" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
          <feDisplacementMap in="SourceGraphic" in2="m" scale="30" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
          <feDisplacementMap in="SourceGraphic" in2="m" scale="28" xChannelSelector="R" yChannelSelector="G" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
          <feBlend in="r" in2="g" mode="screen" />
          <feBlend in2="b" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}
