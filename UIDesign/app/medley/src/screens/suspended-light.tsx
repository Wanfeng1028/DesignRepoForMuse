import { Phone } from '../components/Phone'
import { Icon } from '../components/icons'
import { Button } from '../components/ui/button'

export const meta = { id: 'suspended-light', title: 'Account suspended (light)', source: 'ov_r2_c3' }

export default function SuspendedLight() {
  return (
    <Phone theme="light">
      <div className="flex min-h-0 flex-1 flex-col bg-light-bg p-5">
        <div className="mb-6 mt-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-light-divider bg-light-card">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10" stroke="#6b6c72" strokeWidth="2" />
            <line x1="8" y1="20" x2="20" y2="8" stroke="#6b6c72" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-[26px] font-semibold leading-[1.25] text-light-text">Your account is suspended</div>
        <div className="mt-4 text-[14px] leading-[1.55] text-light-text">
          We suspended this account for breaking the usage policy: repeated requests for prohibited content.
        </div>
        <div className="mt-3 text-[14px] font-bold leading-[1.55] text-light-text">Suspended until Nov 2, 2026.</div>
        <div className="mt-6 flex items-start gap-2.5">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-[3px] shrink-0">
            <circle cx="9" cy="9" r="7" stroke="#6b6c72" strokeWidth="1.6" />
            <line x1="9" y1="8" x2="9" y2="12.5" stroke="#6b6c72" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="9" cy="5.6" r="0.9" fill="#6b6c72" />
          </svg>
          <span className="flex-1 text-item leading-[1.55] text-light-sub">
            Your Pro subscription is still active in Google Play. You can cancel it there.
          </span>
        </div>
        <div className="ml-7 mt-2 text-item font-semibold text-light-text underline">Manage subscription</div>
        <div className="mt-5 text-item text-light-sub">You can still:</div>
        {([
          { label: 'Export my data', icon: Icon.download('#6b6c72') },
          { label: 'Delete account', icon: Icon.trash('#6b6c72') },
          { label: 'Sign out', icon: Icon.logout('#6b6c72') },
        ] as const).map((row) => (
          <div key={row.label} className="flex items-center justify-between border-b border-light-divider py-[14px]">
            <span className="flex items-center gap-2.5 text-item font-medium text-light-text">{row.icon}{row.label}</span>
            {Icon.chevronRight('#6b6c72', 16)}
          </div>
        ))}
        <div className="flex-1" />
        <div className="flex gap-3">
          <Button className="h-[52px] flex-1 text-item text-white">Appeal</Button>
          <Button variant="outline" className="h-[52px] flex-1 border-[#d8d9dd] text-item text-light-text">
            Contact support
          </Button>
        </div>
      </div>
    </Phone>
  )
}
