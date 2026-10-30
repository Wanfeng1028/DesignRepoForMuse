import { Phone } from '../components/Phone'
import { Icon } from '../components/icons'

export const meta = { id: 'search-drawer-dark', title: 'Search drawer (dark)', source: 'ov_r1_c3' }

const nav = [
  { label: 'Images', kind: 'square' as const },
  { label: 'Projects', kind: 'square' as const },
  { label: 'Agent tasks', kind: 'dots' as const, badge: '1 running' },
  { label: 'Flashcards', kind: 'square' as const },
]

const recent = [
  { label: 'Lisbon on a budget', dot: '#e4754a' },
  { label: 'Fix my Python script', dot: '#4a7de4' },
  { label: 'Cell biology notes', dot: '#2eb5a5' },
  { label: 'Q3 report summary', dot: '#9b5de5' },
  { label: 'Cover letter draft', dot: '#3fa34d' },
  { label: 'Spanish verbs quiz', dot: '#4a7de4' },
]

export default function SearchDrawerDark() {
  return (
    <Phone theme="dark">
      <div className="flex min-h-0 flex-1 flex-row">
        <div className="min-w-0 flex-1 overflow-y-auto bg-[#16171a] px-5 py-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 flex-1 items-center gap-2.5 rounded-input bg-dark-input px-[14px]">
              {Icon.search('#9a9ba2')}
              <span className="flex-1 text-item text-dark-dim">Search</span>
              {Icon.edit('#9a9ba2')}
            </div>
            {Icon.menu('#9a9ba2')}
          </div>
          <div className="mt-2">
            {nav.map((r) => (
              <div key={r.label} className="flex items-center justify-between py-[13px]">
                <div className="flex items-center gap-3">
                  {r.kind === 'square' ? (
                    <span className="flex shrink-0 text-dark-sub">
                      {r.label === 'Images' ? Icon.image('#9a9ba2') : r.label === 'Projects' ? Icon.folder('#9a9ba2') : Icon.cards('#9a9ba2')}
                    </span>
                  ) : (
                    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center gap-0.5">
                      <span className="h-[3px] w-[3px] rounded-full bg-dark-sub" />
                      <span className="h-[3px] w-[3px] rounded-full bg-dark-sub" />
                      <span className="h-[3px] w-[3px] rounded-full bg-dark-sub" />
                    </span>
                  )}
                  <span className="text-[16px] font-medium text-dark-text">{r.label}</span>
                </div>
                {r.badge && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-drawer-dot" />
                    <span className="text-secondary text-dark-sub">{r.badge}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2.5 text-secondary text-dark-sub">Pinned</div>
          <div className="mt-2.5 rounded-card bg-dark-card px-4 py-[14px]">
            <span className="text-item font-semibold text-dark-text">Thesis outline</span>
          </div>
          <div className="mt-5 text-secondary text-dark-sub">Recent</div>
          <div className="mt-0.5">
            {recent.map((r) => (
              <div key={r.label} className="flex items-center justify-between py-3">
                <span className="text-item font-medium text-dark-text">{r.label}</span>
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.dot }} />
              </div>
            ))}
          </div>
          <div className="mt-[14px] rounded-card bg-dark-card px-4 py-[14px]">
            <span className="text-[14px] font-semibold text-dark-text">About 240 messages left</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dark-row text-[15px] font-bold text-dark-text">
              A
            </span>
            <span className="text-item font-bold text-dark-text">Alex</span>
            <span className="rounded-chip border border-dark-divider px-2 py-[1px] text-caption text-dark-sub">Pro</span>
            <span className="ml-auto flex">{Icon.gear('#9a9ba2')}</span>
          </div>
        </div>
        <div className="w-[62px] shrink-0 bg-black/45" />
      </div>
    </Phone>
  )
}
