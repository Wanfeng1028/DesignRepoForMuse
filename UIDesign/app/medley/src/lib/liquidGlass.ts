/**
 * Liquid Glass refraction (v1.9, own implementation following the
 * construction published by nikdelvin-liquid-glass, MIT, in
 * src/utils/liquidGlass.ts): the displacement map is a rounded rectangle
 * in mid-grey blurred by `depth`, over X/Y gradient ramps blended in
 * screen mode; feDisplacementMap then displaces the layer per colour
 * channel in screen blend — R at strength + 2*chromaticAberration,
 * G at strength + chromaticAberration, B at strength — which is what
 * produces the chromatic edge split of real Liquid Glass.
 *
 * Strength is deliberately LOW here (default 10, CA 2, vs the source
 * default 100/0): at 100 the layer visibly warps, which would break
 * this set's 1:1 geometry. At 10 the displacement is at most ~5px at
 * gradient edges and ~0 in flat areas, so patch medians do not move.
 *
 * Technical limit, recorded honestly: a CSS `filter` displaces the
 * element's OWN layer, not the backdrop behind it (that would need
 * backdrop-filter displacement, which browsers do not offer). So this
 * is only applied to a layer that itself carries displaceable content
 * (the welcome glow gradients). On solid text-bearing pills or opaque
 * bubbles it would either do nothing (flat fill) or distort the text,
 * so those surfaces get the rest of the glass stack (backdrop blur,
 * saturate, hairline, shadow) instead of this filter.
 *
 * Two correctness notes (v1.9 measured): (1) the layer MUST be opaque
 * (a solid background under the gradients): the three-pass split +
 * screen blend triples a semi-transparent layer's alpha (1-(1-a)^3)
 * and shifted the cores by up to 22 in B regardless of strength.
 * (2) The B-pass feColorMatrix must select B (row [0 0 1 0 0]); a
 * [0 1 0 0 0] row silently copies G into B (caught by the core-shift
 * table: filtered B == G at every sample point).
 */
export type LiquidGlassOptions = {
  width: number
  height: number
  radius: number
  depth?: number
  strength?: number
  chromaticAberration?: number
}

function displacementMap({ width, height, radius, depth = 8 }: LiquidGlassOptions): string {
  const y1 = Math.ceil((radius / height) * 15)
  const y2 = Math.floor(100 - (radius / height) * 15)
  const x1 = Math.ceil((radius / width) * 15)
  const x2 = Math.floor(100 - (radius / width) * 15)
  return (
    `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">` +
    `<style>.mix{ mix-blend-mode: screen; }</style><defs>` +
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
  )
}

/** CSS `filter` value: url(<svg with #displace filter>). */
export function liquidGlassFilter(opts: LiquidGlassOptions): string {
  const { width, height, strength = 10, chromaticAberration = 2 } = opts
  const map = displacementMap(opts)
  const svg =
    `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs>` +
    `<filter id="displace" color-interpolation-filters="sRGB">` +
    `<feImage x="0" y="0" height="${height}" width="${width}" href="data:image/svg+xml;utf8,${encodeURIComponent(map)}" result="displacementMap" />` +
    `<feDisplacementMap transform-origin="center" in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration * 2}" xChannelSelector="R" yChannelSelector="G" />` +
    `<feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="displacedR" />` +
    `<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength + chromaticAberration}" xChannelSelector="R" yChannelSelector="G" />` +
    `<feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="displacedG" />` +
    `<feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="${strength}" xChannelSelector="R" yChannelSelector="G" />` +
    `<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="displacedB" />` +
    `<feBlend in="displacedR" in2="displacedG" mode="screen" />` +
    `<feBlend in2="displacedB" mode="screen" />` +
    `</filter></defs></svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}#displace")`
}
