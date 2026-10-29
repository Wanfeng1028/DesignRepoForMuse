import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { UserBubble, AiMeta } from '../components/Chat'
import { Icon } from '../components/icons'

export const meta = { id: 'chat-dark-kyoto-en', title: 'Kyoto itinerary chat (dark)', source: 'ov_r1_c0' }

function TimelineRow({ time, place, note }: { time: string; place: string; note: string }) {
  return (
    <div className="mt-[14px] flex gap-3">
      <span className="w-[46px] shrink-0 text-[13px] text-dark-sub">{time}</span>
      <span>
        <span className="block text-[15px] font-bold">{place}</span>
        <span className="mt-0.5 block text-[13px] text-dark-sub">{note}</span>
      </span>
    </div>
  )
}

function PollOption({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <div
      className={`mt-2.5 flex items-center gap-2.5 rounded-chip px-3 py-2.5 text-[15px] ${
        selected ? 'bg-dark-text font-bold text-light-text' : 'border border-dark-divider font-medium text-dark-text'
      }`}
    >
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? 'border-light-text' : 'border-dark-sub'
        }`}
      >
        {selected && <span className="h-[9px] w-[9px] rounded-full bg-light-text" />}
      </span>
      {label}
    </div>
  )
}

export default function ChatDarkKyotoEn() {
  return (
    <Phone theme="dark">
      <TopBar
        dark
        left={Icon.menu('#f5f5f7')}
        center={
          <span className="inline-flex items-center gap-1.5 text-[16px] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#9b5de5]" />
            Kimi K3
            {Icon.chevronDown('#9a9ba2', 16)}
          </span>
        }
        right={<>{Icon.clock('#f5f5f7')}{Icon.edit('#f5f5f7')}</>}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-5">
        <UserBubble dark>2 days in Kyoto, temples and food</UserBubble>
        <AiMeta dark model="Kimi K3" sub="Searched 4 times, checked the weather, found 12 places" />
        <p className="mb-[14px] text-[16px] font-bold leading-[1.55]">Temples on dry Saturday, market on Sunday.</p>
        <div className="flex gap-3">
          <div className="flex-1 rounded-card bg-light-bubble px-3 py-2.5">
            <div className="text-[15px] font-bold text-light-text">Sat, Nov 1</div>
            <div className="mt-1 text-[13px] text-light-sub">19° clear</div>
          </div>
          <div className="flex-1 rounded-card bg-dark-card px-3 py-2.5">
            <div className="text-[15px] font-bold">Sun, Nov 2</div>
            <div className="mt-1 text-[13px] text-dark-sub">16° rain</div>
          </div>
        </div>
        <TimelineRow time="7:30" place="Fushimi Inari" note="Go before 8 to beat the crowds" />
        <TimelineRow time="16:30" place="Kiyomizu-dera" note="Sunset from the wooden terrace" />
        <div className="mt-4 flex gap-5">
          <span className="flex items-center gap-1.5 text-[14px] font-semibold">{Icon.mapPin('#f5f5f7', 16)}Show map</span>
          <span className="flex items-center gap-1.5 text-[14px] font-semibold">{Icon.calendar('#f5f5f7', 16)}Add to calendar</span>
        </div>
        <div className="mt-3 text-caption text-dark-dim">Weather from Google Weather, 10:24</div>
        <div className="mt-4 rounded-card bg-dark-card p-3">
          <div className="text-[16px] font-bold">Add a day trip?</div>
          <PollOption label="Nara and the deer park" selected />
          <PollOption label="Arashiyama bamboo grove" />
          <PollOption label="No, keep it relaxed" />
        </div>
        <div className="h-2" />
      </div>
      <InputBar dark placeholder="Ask anything" />
    </Phone>
  )
}
