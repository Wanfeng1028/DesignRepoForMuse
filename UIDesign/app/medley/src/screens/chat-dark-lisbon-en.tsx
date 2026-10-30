import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { UserBubble, AiMeta, ActionRow, SourcesChip } from '../components/Chat'
import { Icon } from '../components/icons'
import { ModelDot } from '../components/Model'

export const meta = { id: 'chat-dark-lisbon-en', title: 'Lisbon chat (dark, EN)', source: 'det_r0_c0' }

const bullets: { text: string; cite?: string }[] = [
  { text: 'Ride tram 28 before 9am, while it\'s still quiet.', cite: '1' },
  { text: 'Lunch at a neighborhood tasca for under €12.' },
  { text: 'Sunset at Miradouro da Senhora do Monte.', cite: '2' },
]

export default function ChatDarkLisbonEn() {
  return (
    <Phone theme="dark">
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar
          dark
          left={Icon.menu('#f5f5f7')}
          center={
            <span className="flex items-center gap-1.5 text-[16px] font-bold text-dark-text">
              <ModelDot model="Claude Sonnet 5.5" />
              Claude Sonnet 5.5
              {Icon.chevronDown('#9a9ba2')}
            </span>
          }
          right={Icon.edit('#f5f5f7')}
        />
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-1">
          <UserBubble dark>Plan 3 days in Lisbon on a budget. I love food and good views.</UserBubble>
          <AiMeta dark model="GLM-5 · Auto" />
          <div className="text-body leading-[1.55] text-dark-text">
            Here&apos;s a relaxed plan that keeps costs low and saves the best views for sunset.
          </div>
          <div className="mt-[14px] text-body font-bold leading-[1.55] text-dark-text">Day 1: Alfama and the castle</div>
          <div className="mt-2 flex flex-col gap-1.5">
            {bullets.map((b) => (
              <div key={b.text} className="flex gap-2 text-item leading-[1.45] text-dark-text">
                <span className="shrink-0 text-dark-sub">•</span>
                <span>
                  {b.text}
                  {b.cite && (
                    <span className="ml-1 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-[4px] bg-dark-row px-[3px] align-super text-[10px] font-semibold text-dark-sub">
                      {b.cite}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <SourcesChip dark badges={['T', 'L', 'V']} countLabel="3 sources" />
          <ActionRow dark credits="28 credits" />
          <div className="my-1 flex justify-end">
            <div className="rounded-chip border border-dark-divider px-[18px] py-2.5 text-item text-dark-text">
              Make day 2 all about food.
            </div>
          </div>
          <AiMeta dark model="Claude Sonnet 5.5" />
          <div className="text-body leading-[1.55] text-dark-text">
            Day 2 works best as a slow eating day. Start at Time Out Market around 11am, before the lunch rush, and share a
            few small plates instead of one big meal. In the afternoon, walk up to Bairro Alto for a pastel de nata.
            <span className="ml-1.5 inline-block h-3 w-3 rounded-full bg-brand-dot align-middle" />
          </div>
        </div>
        <InputBar dark placeholder="Message Claude Sonnet 5.5" mic="stop-accent" />
      </div>
    </Phone>
  )
}
