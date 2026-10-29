import { Phone } from '../components/Phone'
import { MedleyMark } from '../components/Model'
import { Button } from '../components/ui/button'

export const meta = { id: 'welcome-dark', title: 'Welcome (dark)', source: 'cn_r0_c0' }

export default function WelcomeDark() {
  return (
    <Phone theme="dark">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center gap-2 px-5 pt-3">
          <MedleyMark size={26} />
          <span className="text-[17px] font-bold text-dark-text">Medley</span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-center px-5">
          <div className="flex items-baseline gap-2">
            <span className="text-welcome font-bold leading-[1.15] text-dark-text">Let&apos;s discover</span>
            <span className="h-[15px] w-[15px] shrink-0 self-center rounded-full bg-brand-dot" />
          </div>
          <div className="mt-4 text-[16px] text-dark-sub">Every top AI in one app.</div>
          <div className="mt-1.5 text-[15px] text-dark-dim">Claude, GPT, Gemini, DeepSeek, Kimi and GLM</div>
        </div>
        <div className="flex flex-col gap-3 px-5 pb-4">
          <Button variant="white" className="h-[40px] text-[16px] text-black-btn">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#d8d8dc] bg-white text-[10px] font-extrabold text-black-btn">
              G
            </span>
            Continue with Google
          </Button>
          <Button variant="outline" className="h-[40px] border-dark-divider font-semibold text-dark-text">
            Try without an account
          </Button>
          <div className="px-5 pt-0.5 text-left text-caption leading-[1.45] text-dark-dim">
            By continuing, you confirm you&apos;re 18 or older and agree to the Terms and Privacy Policy.
          </div>
        </div>
      </div>
    </Phone>
  )
}
