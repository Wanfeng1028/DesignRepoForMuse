import { useEffect, useState } from 'react'
import { Phone } from '../components/Phone'
import { BrandDots } from '../components/Model'
import { Button } from '../components/ui/button'
import { liquidGlassFilter } from '../lib/liquidGlass'

export const meta = { id: 'welcome-dark', title: 'Welcome (dark)', source: 'cn_r0_c0' }

/**
 * v1.9 interaction line: the headline ROTATES in the original (photo-9
 * caption), one colour per sentence. Only ONE sentence is observed in
 * any reference (CN strip + photo-9 both show "Let's discover"), so the
 * rotation mechanism + cursor + per-sentence colour are built, but the
 * sentence list contains only the observed entry — more sentences are
 * UNMEASURED and must not be invented here. Dot colour varies across
 * captures for the same sentence (sapphire #6ea9dd in photo-9, orange in
 * the CN strip); sapphire is the standard frame, orange is recorded as
 * an observed variant in CHANGELOG. The timer replays the enter
 * animation every 5s (first replay after the 3000ms screenshot window,
 * so verification shots always show the settled first sentence).
 */
const ROTATION_SENTENCES = [
  // v1.9: only observed sentence (see header comment). Colour = sapphire
  // standard frame #6ea9dd (token cursorDot). Do not add sentences here
  // without a reference capture.
  { text: "Let's discover", color: '#6ea9dd' },
]

// v1.7 colour provenance (kept): ambient glows are real radial gradients
// (photo-9 cores: warm #482b1d @21%/76%, green #193d33 @82%/92%, blue
// halo #1f2f46 @78%/30%); header mark is the 3-dot BrandDots cluster
// (photo-9); base #0D0E10 is the coordinator's photo-9 correction (global
// darkBg #111518 still serves the other dark screens).

export default function WelcomeDark() {
  // Rotation cycle: first replay at 5000ms, after the screenshot window.
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCycle((c) => c + 1), 5000)
    return () => clearInterval(t)
  }, [])
  const sentence = ROTATION_SENTENCES[cycle % ROTATION_SENTENCES.length]
  return (
    <Phone theme="dark" className="bg-[#0D0E10]">
      {/* Glow layer sits BEHIND the content (first in DOM, siblings are
          relative): v1.7's overlay ABOVE the title tinted the cursor dot
          (sampled #5b8fbd instead of token #6ea9dd); the behind-content
          layer cannot tint anything above it. */}
      <div
        className="relative flex min-h-0 flex-1 flex-col"
        style={{ backgroundColor: '#0D0E10' }}
      >
        {/* v1.9: glow as its own layer BEHIND the content (not a container
            background, not an overlay above it — v1.7's overlay tinted the
            cursor dot). Because the layer itself carries the gradients,
            the Liquid Glass displacement filter can refract it without
            touching the text above. Strength 5 / CA 1 (reduced from 10/2:
            at 10 the blue core shifted by 22 in B, breaking 1:1; at 5 the
            cores move <=8 — see CHANGELOG for the pre/post table). */}
        {/* v1.9: glow as its own layer BEHIND the content (not a container
            background, not an overlay above it — v1.7's overlay tinted the
            cursor dot). Because the layer itself carries the gradients,
            the Liquid Glass displacement filter can refract it without
            touching the text above. Strength 5 / CA 1 (reduced from 10/2:
            at 10 the blue core shifted by 22 in B, breaking 1:1; at 5 the
            cores move <=8 — see CHANGELOG for the pre/post table).
            Full-phone span: the gradient positions are PHONE percentages
            (v1.7 provenance), so the layer must cover the whole 852px
            phone, not just the 795px container between status bar (37)
            and home indicator (20) — otherwise the blobs sit 6-20px off
            and the green tail vanishes below y832 (prev render showed
            flat (13,14,16) where the original keeps green to the bottom
            edge). StatusBar and HomeIndicator carry relative z-10 in
            Phone.tsx so they paint above this extended layer. */}
        <div
          aria-hidden
          className="absolute inset-x-0 -top-[37px] -bottom-[20px]"
          style={{
            background:
              'radial-gradient(ellipse 320px 260px at 78% 30%, rgba(52,86,120,0.45), rgba(52,86,120,0) 70%), ' +
              'radial-gradient(ellipse 300px 240px at 21% 76%, rgba(114,66,40,0.55), rgba(114,66,40,0) 70%), ' +
              'radial-gradient(ellipse 280px 220px at 82% 92%, rgba(38,94,78,0.55), rgba(38,94,78,0) 70%)',
            /* NOTE: backgroundColor MUST come after the background
               shorthand — the shorthand resets background-color to
               transparent. Opaque base under the gradients: the
               three-pass channel-split + screen-blend construction
               triples a semi-transparent layer's alpha (1-(1-a)^3),
               which shifted the cores by up to 22 in B regardless of
               strength. With an opaque layer (alpha 1) the blend
               preserves colour and only displacement acts. */
            backgroundColor: '#0D0E10',
            filter: liquidGlassFilter({ width: 390, height: 852, radius: 44, depth: 8, strength: 5, chromaticAberration: 1 }),
          }}
        />
        {/* v1.9: header row is top-aligned, not centered: in the original
            the dot cluster's top sits ~7px above the "Medley" cap top
            (dots top 57.1, text cap 64.1 @390), which centering cannot
            reproduce. */}
        <div className="relative flex items-start gap-2 px-6 pt-5">
          <BrandDots size={8} />
          <span className="text-[17px] font-bold text-dark-text">Medley</span>
        </div>
        <div className="relative flex min-h-0 flex-1 flex-col justify-center px-7 pb-[23px]">
          <div key={cycle} className="anim-ios-title-enter flex items-baseline gap-2">
            <span className="text-welcome font-semibold leading-[1.15] text-dark-text">{sentence.text}</span>
            <span
              className="anim-ios-cursor h-[15px] w-[15px] shrink-0 self-center rounded-full"
              style={{ backgroundColor: sentence.color }}
            />
          </div>
          <div className="mt-3 text-[15px] text-[#b0b4b6]">Every top AI in one app.</div>
          <div className="mt-1 text-[15px] text-[#8d9195]">Claude, GPT, Gemini, DeepSeek, Kimi and GLM</div>
        </div>
        <div className="relative flex flex-col gap-2.5 px-6 pb-[19px]">
          <Button variant="white" className="text-[16px] text-black-btn">
            <span className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border border-[#d8d8dc] bg-white text-[11px] font-extrabold text-black-btn">
              G
            </span>
            Continue with Google
          </Button>
          <Button variant="outline" className="h-[50px] border-[#2d3134] font-semibold text-dark-text">
            Try without an account
          </Button>
          <div className="pl-[3.5px] pt-[7px] text-left text-caption leading-[1.33] text-[#808487]">
            By continuing, you confirm you&apos;re 18 or older and agree to the Terms and Privacy Policy.
          </div>
        </div>
      </div>
    </Phone>
  )
}
