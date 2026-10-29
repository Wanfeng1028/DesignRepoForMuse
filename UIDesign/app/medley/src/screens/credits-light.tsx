import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { Icon } from '../components/icons'
import { CreditsChart, CreditsRow } from '../components/Credits'
import { Button } from '../components/ui/button'

export const meta = { id: 'credits-light', title: 'Credits (light)', source: 'det_r0_c4' }

const bars = [18, 24, 20, 32, 28, 40, 36, 48, 44, 58, 52, 64, 60, 72, 68, 80, 76, 88, 84, 96]

const legend = [
  { label: 'Claude', color: '#e4754a' },
  { label: 'GLM', color: '#4a7de4' },
  { label: 'Kimi', color: '#9b5de5' },
  { label: 'DeepSeek', color: '#2eb5a5' },
]

const models = [
  { name: 'Claude Sonnet 5.5', sub: '480 messages', amount: '38,400', pct: '54%' },
  { name: 'GLM-5', sub: '590 messages', amount: '18,300', pct: '26%' },
  { name: 'Kimi K3', sub: '60 messages', amount: '7,200', pct: '10%' },
  { name: 'DeepSeek V4.1 Flash', sub: '420 messages', amount: '4,620', pct: '6%' },
]

export default function CreditsLight() {
  return (
    <Phone theme="light">
      <div className="flex min-h-0 flex-1 flex-col bg-light-bg">
        <TopBar
          dark={false}
          left={
            <span className="flex items-center gap-2">
              {Icon.back('#17181c')}
              <span className="text-page font-bold text-light-text">Credits</span>
            </span>
          }
          right={Icon.info('#17181c')}
        />
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-1">
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-huge font-bold leading-[1] text-light-text">12,480</span>
            <span className="text-body text-light-sub">credits</span>
          </div>
          <div className="mt-2 text-secondary leading-[18px] text-light-sub">About 270 messages at your usual mix</div>
          <div className="mt-0.5 text-secondary leading-[18px] text-light-sub">Pro plan, 80,000 credits a month. Renews Nov 15.</div>
          <div className="mt-4 flex gap-3">
            <Button className="h-12 px-5 text-[15px]">Buy credits</Button>
            <Button variant="outline" className="h-12 border-light-divider px-5 text-[15px] text-light-text">
              Change plan
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[15px] font-bold text-light-text">Last 30 days</span>
            <span className="text-[15px] font-bold text-light-text">71,720 credits</span>
          </div>
          <div className="mt-2 flex">
            <div className="ml-[60%] flex items-center gap-1">
              <span className="inline-block h-2.5 w-[1px] bg-light-dim" />
              <span className="text-[11px] text-light-dim">Oct 15, upgraded to Pro</span>
            </div>
          </div>
          <CreditsChart bars={bars} />
          <div className="mt-1.5 flex justify-between">
            <span className="text-caption text-light-sub">Sep 28</span>
            <span className="text-caption text-light-sub">Oct 25</span>
          </div>
          <div className="mt-2.5 flex gap-4">
            {legend.map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                <span className="text-secondary text-light-sub">{l.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-section font-bold text-light-text">By model</div>
          <div>
            {models.map((m, i) => (
              <CreditsRow key={m.name} name={m.name} sub={m.sub} amount={m.amount} pct={m.pct} last={i === models.length - 1} />
            ))}
          </div>
          <div className="mt-5 text-section font-bold text-light-text">Activity</div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-[15px] font-medium text-light-text">Lisbon on a budget</div>
              <div className="mt-0.5 text-secondary text-light-sub">Today, 10:21, Claude Sonnet 5.5</div>
            </div>
            <span className="text-[15px] font-bold text-light-text">84</span>
          </div>
        </div>
      </div>
    </Phone>
  )
}
