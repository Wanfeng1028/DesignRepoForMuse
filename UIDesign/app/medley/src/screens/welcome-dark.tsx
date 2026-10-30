import { Phone } from '../components/Phone'
import { BrandDots } from '../components/Model'
import { Button } from '../components/ui/button'

export const meta = { id: 'welcome-dark', title: 'Welcome (dark)', source: 'cn_r0_c0' }

/**
 * v1.7 colour layer (photo-9, highest priority for colour only):
 * - Ambient glows are real radial gradients, not a flat colour. Sampled
 *   photo-9 cores: warm (182,1012) #482b1d, green (536,1296) #193d33,
 *   blue halo (620,558) #1f2f46; centres at 21%/76%, 82%/92%, 78%/30% of
 *   the phone frame. Alphas are set so rendered patch medians move the
 *   same direction as the photo patches (see v1.7 verification).
 * - Header mark is the 3-dot BrandDots cluster (photo-9), not the M trace
 *   (the M trace stays for home-cn, whose Chinese-collage source shows it).
 * - Title cursor is gem blue (photo-9 dot body #93c8f0 highlight-blended).
 *   Static render = this gem-blue state. Per the photo caption the headline
 *   ROTATES ("Let's discover" is one of several sentences, one colour each);
 *   the other sentences/colours are not captured in this still, so no
 *   animation is faked here — rotation is recorded, not rendered.
 * - Coordinator base correction (round 7 finalization, photo-9 wins for
 *   colour): welcome-local base #111518 -> #0D0E10. Evidence: coordinator
 *   sampled photo-9 welcome clean top-centre (x300-400, y250-450) median
 *   (13,14,16) and top-left (13,14,18); web/medley welcome-local already
 *   uses #0D0E10 on the same evidence. Global darkBg token untouched
 *   (#111518 still serves the other dark screens, whose base evidence is
 *   old-HD); only this welcome screen's base (container + Phone frame,
 *   via className override) changes. Glows unchanged.
 */
export default function WelcomeDark() {
  return (
    <Phone theme="dark" className="bg-[#0D0E10]">
      {/* Glows live on the container background (not an overlay div): an
          absolutely-positioned glow layer would paint ABOVE the static title
          and tint the cursor dot (v1.7 catch: cursor sampled #5b8fbd instead
          of token #6ea9dd under the overlay). */}
      <div
        className="relative flex min-h-0 flex-1 flex-col"
        style={{
          background:
            'radial-gradient(ellipse 320px 260px at 78% 30%, rgba(52,86,120,0.45), rgba(52,86,120,0) 70%), ' +
            'radial-gradient(ellipse 300px 240px at 21% 76%, rgba(114,66,40,0.55), rgba(114,66,40,0) 70%), ' +
            'radial-gradient(ellipse 280px 220px at 82% 92%, rgba(38,94,78,0.55), rgba(38,94,78,0) 70%)',
          backgroundColor: '#0D0E10',
        }}
      >
        <div className="flex items-center gap-2 px-6 pt-5">
          <BrandDots size={8} />
          <span className="text-[17px] font-bold text-dark-text">Medley</span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-center px-7 pb-[28px]">
          <div className="flex items-baseline gap-2">
            <span className="text-welcome font-bold leading-[1.15] text-dark-text">Let&apos;s discover</span>
            <span className="h-[15px] w-[15px] shrink-0 self-center rounded-full bg-cursor-dot" />
          </div>
          <div className="mt-2.5 text-[15px] text-[#b0b4b6]">Every top AI in one app.</div>
          <div className="mt-1 text-[15px] text-[#8d9195]">Claude, GPT, Gemini, DeepSeek, Kimi and GLM</div>
        </div>
        <div className="flex flex-col gap-2.5 px-6 pb-[19px]">
          <Button variant="white" className="text-[16px] text-black-btn">
            <span className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border border-[#d8d8dc] bg-white text-[11px] font-extrabold text-black-btn">
              G
            </span>
            Continue with Google
          </Button>
          <Button variant="outline" className="h-[50px] border-[#2d3134] font-semibold text-dark-text">
            Try without an account
          </Button>
          <div className="pl-[3.5px] pt-1 text-left text-caption leading-[1.45] text-[#808487]">
            By continuing, you confirm you&apos;re 18 or older and agree to the Terms and Privacy Policy.
          </div>
        </div>
      </div>
    </Phone>
  )
}
