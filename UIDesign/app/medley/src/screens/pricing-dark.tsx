import { Phone } from '../components/Phone'
import { Icon } from '../components/icons'
import { ModelDots, ModelDotsArc } from '../components/Model'
import { BillingToggle, PlanCard, PlanFeature } from '../components/Pricing'
import { Button } from '../components/ui/button'

export const meta = { id: 'pricing-dark', title: 'Pricing (dark)', source: 'det_r0_c3' }

export default function PricingDark() {
  return (
    <Phone theme="dark">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-0 pt-1">
        <div className="my-1 mb-[14px]">{Icon.close('#f5f5f7')}</div>
        <ModelDotsArc size={10} />
        <h1 className="my-2 mt-2 text-greeting font-bold leading-[1.25]">Every top AI in one app</h1>
        <p className="mb-3 text-[14px] leading-[1.5] text-dark-sub">
          Credits are based on each provider&apos;s official API price, and every answer shows what it used.
        </p>
        <BillingToggle monthlyLabel="Monthly" yearlyLabel="Yearly" saveLabel="Save 20%" />
        <PlanCard name="Lite" monthly="$4.00/mo" yearly="$47.99 a year" />
        <PlanCard name="Pro" monthly="$16.00/mo" yearly="$191.99 a year" selected badge="7 days free">
          <p className="ml-[30px] mt-3 text-[13px] leading-[1.5] text-dark-sub">
            80,000 credits a month, about 1,000 Claude Sonnet messages.
          </p>
          <PlanFeature text="Claude Sonnet and Opus, GPT-6.1 Sol, Kimi K3" />
          <PlanFeature text="Image generation and deep research" />
          <PlanFeature text="30 agent tasks a month, 3 scheduled" />
          <div className="ml-[30px] mt-2.5">
            <ModelDots size={8} />
          </div>
        </PlanCard>
        <PlanCard name="Pro+" monthly="$56.00/mo" yearly="$671.99 a year" />
        <Button variant="white" className="mt-4 w-full text-[16px] text-light-text">
          Start 7-day free trial
        </Button>
        <p className="mt-[14px] text-caption leading-[1.5] text-dark-sub">
          Free for 7 days, then $191.99 a year. Cancel anytime in Google Play before the trial ends and you
          won&apos;t be charged. No ads on any plan, no weekly plans.
        </p>
        <div className="mt-[14px] flex justify-center gap-2 pb-2 text-[13px] text-dark-sub">
          <span>Restore purchases</span>
          <span>|</span>
          <span>Terms</span>
          <span>|</span>
          <span>Privacy</span>
        </div>
      </div>
    </Phone>
  )
}
