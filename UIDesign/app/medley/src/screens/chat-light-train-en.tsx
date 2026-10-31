import { Phone } from '../components/Phone'
import { TopBar, ModelPill } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { UserBubble, AiMeta, ActionRow } from '../components/Chat'
import { Icon } from '../components/icons'

export const meta = { id: 'chat-light-train-en', title: 'Train vs plane chat (light)', source: 'ov_r0_c3' }

const rows: Array<[string, string, string]> = [
  ['Door to door', 'About 7h', 'About 4h 30m'],
  ['Typical fare', '€45–140', '€30–160'],
  ['Bags', '2 included', 'Often extra'],
  ['Arrives at', 'Barcelona Sants', 'El Prat airport'],
]

const suggestions = ['Find trains for next Friday', 'Is there a night train?', 'Add a stop in Montpellier']

export default function ChatLightTrainEn() {
  return (
    <Phone theme="light">
      <TopBar
        dark={false}
        left={Icon.menu('#17181c')}
        center={<ModelPill dark={false} label="Auto" />}
        right={<>{Icon.clock('#17181c')}{Icon.edit('#17181c')}</>}
      />
      <div className="min-h-0 flex-1 overflow-y-auto scroll-momentum px-5">
        <UserBubble dark={false}>Paris to Barcelona: train or plane?</UserBubble>
        <AiMeta dark={false} model="DeepSeek V4 Pro · Auto" sub="Searched 9 sites, read 6 pages, thought for 6s" />
        <p className="mb-2 text-[16px] font-bold leading-[1.55]">Take the train unless the flight is much cheaper.</p>
        <p className="mb-4 text-[16px] leading-[1.55]">
          Once airport time is counted, flying saves only about 2.5 hours, and the train drops you in the city center.
        </p>
        <div className="border-t border-light-divider">
          <div className="flex border-b border-light-divider">
            <div className="flex-[0_0_100px] py-2.5" />
            <div className="flex-1 py-2.5 text-[14px] font-semibold">Train</div>
            <div className="flex-1 py-2.5 text-[14px] font-semibold">Plane</div>
          </div>
          {rows.map((r, i) => (
            <div key={r[0]} className={`flex ${i === rows.length - 1 ? '' : 'border-b border-light-divider'}`}>
              <div className="flex-[0_0_100px] py-2.5 text-[14px] leading-[1.45] text-light-sub">{r[0]}</div>
              <div className="flex-1 py-2.5 text-[14px] leading-[1.45]">{r[1]}</div>
              <div className="flex-1 py-2.5 text-[14px] leading-[1.45]">{r[2]}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1 text-[13px] text-light-sub">
          {[0, 1, 2].map((i) => (
            <span key={i} className="inline-block h-4 w-4 shrink-0 rounded bg-light-bubble" />
          ))}
          <span className="ml-1">4 sources</span>
        </div>
        <ActionRow dark={false} credits="41 credits" />
        <div className="mt-1 flex flex-col gap-2.5">
          {suggestions.map((s) => (
            <div key={s} className="flex items-center py-2">
              <span className="mr-2.5 text-light-sub">+</span>
              <span className="text-left text-[15px] font-medium">{s}</span>
            </div>
          ))}
        </div>
        <div className="h-2" />
      </div>
      <InputBar dark={false} placeholder="Ask anything" mic="plain" />
    </Phone>
  )
}
