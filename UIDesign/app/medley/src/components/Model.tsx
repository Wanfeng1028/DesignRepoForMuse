import { modelDotColor } from '../tokens'

export function ModelDots({ size = 6 }: { size?: number }) {
  // v1.5 pastel: same family as the pricing arc (orig Pro-card/Auto rows are
  // pale pastel, not saturated). Order follows the arc's first five dots.
  const dots = ['#dcb1c2', '#abceee', '#dfdda7', '#afddc9', '#cdb9e8']
  return (
    <span className="inline-flex items-center gap-0.5">
      {dots.map((d, i) => (
        <span key={i} className="inline-block rounded-full" style={{ width: size, height: size, background: d }} />
      ))}
    </span>
  )
}

/**
 * Pricing top dots arc, measured from the HD pricing strip (panel coords):
 * 6 pastel dots, 10px, pitch 24.8px @390 (v1.5: was 20px by crop-width error),
 * rising to the right. Used ONLY by the pricing top row; the Pro-card dots
 * row stays a flat ModelDots (orig shows it flat).
 */
export function ModelDotsArc({ size = 10 }: { size?: number }) {
  const dots = ['#dcb1c2', '#abceee', '#dfdda7', '#afddc9', '#cdb9e8', '#eab6a3']
  // v1.5: rise tuned so per-point drops match orig strip drops
  // (0/8.2/15.4/22.6/28.7/34.9) within 0.4px; total rise 35px vs orig 34.9.
  const rise = [5, 13, 20, 28, 34, 40]
  return (
    <span className="inline-flex items-start gap-[15px]">
      {dots.map((d, i) => (
        <span
          key={i}
          className="inline-block shrink-0 rounded-full"
          style={{ width: size, height: size, background: d, transform: `translateY(${-rise[i]}px)` }}
        />
      ))}
    </span>
  )
}

export function ModelDot({ model, size = 8 }: { model: string; size?: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, background: modelDotColor(model) }}
    />
  )
}

/**
 * Medley M mark, rebuilt from the marching-squares trace of the largest
 * logo instance in the Chinese collage (native box x19-35, y43.5-61.5):
 * two white loops separated by a diagonal swoosh cut, plus the orange
 * block at (30,47,2,5). No brand bitmap is copied; this is a path trace
 * of the same geometry, with viewBox "19 43 17 19" preserved.
 */
export function MedleyMark({ size = 24, color = '#f5f5f7' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="19 43 17 19" fill="none" aria-label="Medley">
      <path
        d="M20.5 44 L21 43.5 L22 43.5 L23 43.5 L24 43.5 L24.5 44 L25 44.5 L26 44.5 L26.5 45 L27 45.5 L27.5 46 L27.5 47 L27.5 48 L27.5 49 L27.5 50 L27 50.5 L26.5 51 L26 51.5 L25 51.5 L24.5 52 L24 52.5 L23.5 53 L23 53.5 L22 53.5 L21.5 54 L21 54.5 L20.5 54 L20.5 53 L20.5 52 L20.5 51 L20.5 50 L20.5 49 L20.5 48 L20.5 47 L20.5 46 L20.5 45 L20.5 44 Z"
        fill={color}
      />
      <path
        d="M31.5 44 L32 43.5 L33 43.5 L34 43.5 L34.5 44 L34 44.5 L33.5 45 L34 45.5 L34.5 46 L34 46.5 L33.5 47 L33.5 48 L33.5 49 L33.5 50 L33.5 51 L33.5 52 L33.5 53 L33.5 54 L33.5 55 L33.5 56 L33.5 57 L34 57.5 L34.5 58 L34 58.5 L33.5 59 L34 59.5 L34.5 60 L34 60.5 L33 60.5 L32.5 60 L32 59.5 L31 59.5 L30 59.5 L29.5 59 L29 58.5 L28.5 58 L28.5 57 L28.5 56 L29 55.5 L29.5 55 L29 54.5 L28.5 54 L28 53.5 L27.5 54 L27.5 55 L27.5 56 L27 56.5 L26.5 57 L26.5 58 L26 58.5 L25.5 59 L25.5 60 L25 60.5 L24.5 61 L24 61.5 L23 61.5 L22 61.5 L21 61.5 L20 61.5 L19.5 61 L19.5 60 L20 59.5 L20.5 59 L21 58.5 L21.5 58 L22 57.5 L22.5 57 L22.5 56 L23 55.5 L24 55.5 L24.5 55 L25 54.5 L25.5 54 L26 53.5 L26.5 53 L27 52.5 L28 52.5 L28.5 52 L29 51.5 L30 51.5 L30.5 51 L31 50.5 L32 50.5 L32.5 50 L32 49.5 L31.5 49 L31.5 48 L31.5 47 L31 46.5 L30.5 46 L30 45.5 L29.5 45 L30 44.5 L31 44.5 L31.5 44 Z"
        fill={color}
      />
      <rect x="30" y="47" width="2" height="5" fill="#e2a181" />
    </svg>
  )
}
