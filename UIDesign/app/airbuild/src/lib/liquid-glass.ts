/**
 * Liquid Glass refraction for .ab-glass surfaces (v1.10, B line).
 *
 * Technique only, adapted from nikdelvin/liquid-glass (MIT, pure CSS + SVG
 * filters): a displacement map (rounded rect in #808080 grey, blurred by
 * depth) drives three feDisplacementMaps — R scale = strength + 2 x
 * chromaticAberration, G = strength + chromaticAberration, B = strength —
 * blended with screen mode. No control look is copied; sizes, radii and
 * strengths are this set's own.
 *
 * Strength is TUNED, not the source default: the source default strength
 * 100 smears a 46px control's backdrop (probe: stripe edges lost/merged),
 * while strength 16 / chromaticAberration 2 / depth ~8 bends the rim by
 * about +/-5px and leaves the centre flat (probe-glass.png, measure/).
 * The map is generated per element (its own width/height/radius) because a
 * generic map stretches wrong across circles vs pills.
 *
 * Fallback: .ab-glass in index.css already carries blur + saturate + rim
 * light, so if this effect never runs (no JS, or a consumer copies the
 * components without it) the surface still reads as glass. The effect only
 * upgrades the element's backdrop-filter in place; it never changes layout,
 * content or the token file.
 */

export type LiquidGlassOptions = {
  strength?: number
  chromaticAberration?: number
}

function displacementMap(width: number, height: number, radius: number, depth: number): string {
  const y1 = Math.ceil((radius / height) * 15)
  const y2 = Math.floor(100 - (radius / height) * 15)
  const x1 = Math.ceil((radius / width) * 15)
  const x2 = Math.floor(100 - (radius / width) * 15)
  const svg =
    `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">` +
    `<style>.mix { mix-blend-mode: screen; }</style><defs>` +
    `<linearGradient id="Y" x1="0" x2="0" y1="${y1}%" y2="${y2}%"><stop offset="0%" stop-color="#0F0" /><stop offset="100%" stop-color="#000" /></linearGradient>` +
    `<linearGradient id="X" x1="${x1}%" x2="${x2}%" y1="0" y2="0"><stop offset="0%" stop-color="#F00" /><stop offset="100%" stop-color="#000" /></linearGradient>` +
    `</defs>` +
    `<rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />` +
    `<g filter="blur(2px)">` +
    `<rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />` +
    `<rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" class="mix" />` +
    `<rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" class="mix" />` +
    `<rect x="${depth}" y="${depth}" height="${height - 2 * depth}" width="${width - 2 * depth}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />` +
    `</g></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

export function liquidGlassFilter(
  width: number,
  height: number,
  radius: number,
  opts: LiquidGlassOptions = {},
): string {
  const strength = opts.strength ?? 16
  const cab = opts.chromaticAberration ?? 2
  const depth = Math.max(5, Math.min(8, Math.round(radius * 0.35)))
  const map = displacementMap(width, height, radius, depth)
  const channel = (scale: number, row: string, result: string) =>
    `<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${scale}" xChannelSelector="R" yChannelSelector="G" />` +
    `<feColorMatrix type="matrix" values="${row}" result="${result}" />`
  const svg =
    `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs>` +
    `<filter id="displace" color-interpolation-filters="sRGB">` +
    `<feImage x="0" y="0" height="${height}" width="${width}" href="${map}" result="displacementMap" />` +
    channel(strength + cab * 2, '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0', 'dR') +
    channel(strength + cab, '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0', 'dG') +
    channel(strength, '0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0', 'dB') +
    `<feBlend in="dR" in2="dG" mode="screen" /><feBlend in2="dB" mode="screen" />` +
    `</filter></defs></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '#displace'
}

/** Upgrade every .ab-glass element's backdrop-filter in place. Returns a
 * cleanup that disconnects the resize observers. Idempotent: re-running
 * just refreshes the same inline style. */
export function applyLiquidGlass(root: ParentNode = document): () => void {
  const observers: ResizeObserver[] = []
  const apply = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    const w = Math.round(r.width)
    const h = Math.round(r.height)
    if (w < 8 || h < 8) return
    const radius = Math.round(Math.min(w, h) / 2)
    // nikdelvin order: blur(blur/2) url() blur(blur) brightness saturate;
    // frost blur 10 (small-control tier, see index.css) -> blur(5px) first.
    const value = `blur(5px) url('${liquidGlassFilter(w, h, radius)}') blur(10px) saturate(1.5)`
    el.style.backdropFilter = value
    el.style.setProperty('-webkit-backdrop-filter', value)
  }
  root.querySelectorAll('.ab-glass').forEach((node) => {
    const el = node as HTMLElement
    apply(el)
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => apply(el))
      ro.observe(el)
      observers.push(ro)
    }
  })
  return () => observers.forEach((ro) => ro.disconnect())
}
