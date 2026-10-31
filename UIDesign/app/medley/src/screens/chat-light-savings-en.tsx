import { Phone } from '../components/Phone'
import { TopBar, ModelPill } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { UserBubble, AiMeta } from '../components/Chat'
import { Icon } from '../components/icons'
import { Slider } from '../components/ui/slider'
import { savingsCurvePoints, tokens } from '../tokens'

export const meta = { id: 'chat-light-savings-en', title: 'Savings calculator chat (light)', source: 'ov_r0_c4' }

function SliderRow({ label, value, fill }: { label: string; value: string; fill: number }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-[14px] text-light-sub">
        <span>{label}</span>
        <span className="text-[15px] font-bold text-light-text">{value}</span>
      </div>
      <div className="mt-2.5">
        <Slider defaultValue={[fill]} max={100} step={1} />
      </div>
    </div>
  )
}

export default function ChatLightSavingsEn() {
  return (
    <Phone theme="light">
      <TopBar
        dark={false}
        left={Icon.menu('#17181c')}
        center={<ModelPill dark={false} label="Auto" />}
        right={<>{Icon.clock('#17181c')}{Icon.edit('#17181c')}</>}
      />
      <div className="min-h-0 flex-1 overflow-y-auto scroll-momentum px-5">
        <UserBubble dark={false}>$200 a month at 6% for 15 years?</UserBubble>
        <AiMeta dark={false} model="GPT-6.1 Sol · Auto" sub="Thought for 3s" />
        <p className="mb-[14px] text-[16px] font-bold leading-[1.55]">
          About $58,160. You put in $36,000 and the rest is growth. Try other amounts below.
        </p>
        <div className="rounded-card bg-light-card p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="text-[16px] font-bold">Savings growth</div>
          <SliderRow label="Monthly saving" value="$200" fill={16} />
          <SliderRow label="Yearly return" value="6%" fill={44} />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[14px] text-light-sub">Years</span>
            <span className="flex items-center gap-[14px]">
              <span className="text-[18px] text-light-sub">–</span>
              <span className="text-[15px] font-bold">15</span>
              <span className="text-[18px] text-light-sub">+</span>
            </span>
          </div>
          <div className="mt-[18px] flex items-start gap-3">
            <div className="flex-1">
              <div className="text-[40px] font-bold leading-[1.1]">$58,164</div>
              <div className="mt-0.5 text-caption text-light-sub">Final balance</div>
            </div>
            <div className="text-right">
              <div className="text-[15px] font-bold">$36,000</div>
              <div className="text-caption text-light-sub">Put in</div>
              <div className="mt-2 text-[15px] font-bold">$22,164</div>
              <div className="text-caption text-light-sub">Growth</div>
            </div>
          </div>
          <div className="mt-4 flex gap-1.5">
            <div className="flex h-[118px] flex-col justify-between pb-[14px] text-[11px] text-light-dim">
              <span>60K</span>
              <span>40K</span>
              <span>20K</span>
              <span>0</span>
            </div>
            <div className="flex-1">
              <svg width="100%" height="118" viewBox="0 0 280 118" preserveAspectRatio="none">
                <line x1="0" y1="10" x2="280" y2="10" stroke="#e6e7ea" strokeWidth="1" />
                <line x1="0" y1="44" x2="280" y2="44" stroke="#e6e7ea" strokeWidth="1" />
                <line x1="0" y1="78" x2="280" y2="78" stroke="#e6e7ea" strokeWidth="1" />
                <line x1="0" y1="104" x2="280" y2="104" stroke="#e6e7ea" strokeWidth="1" />
                <path d={savingsCurvePoints()} fill="none" stroke={tokens.colors.lightText} strokeWidth="1.5" />
                <path d="M0 104 L 278 47.6" fill="none" stroke={tokens.colors.lightDim} strokeWidth="1.5" strokeDasharray="5 4" />
                <text x="222" y="14" fontSize="11" fill={tokens.colors.lightText} fontWeight="600">Balance</text>
                <text x="228" y="56" fontSize="11" fill={tokens.colors.lightDim}>Put in</text>
              </svg>
              <div className="flex justify-between text-[11px] text-light-dim">
                <span>Now</span>
                <span>5 yr</span>
                <span>10 yr</span>
                <span>15 yr</span>
              </div>
            </div>
          </div>
          <div className="mt-[14px] flex justify-between border-t border-light-divider pt-3 text-caption text-light-sub">
            <span>Calculated in Medley</span>
            <span className="font-semibold">Formula ▾</span>
          </div>
        </div>
      </div>
      <InputBar dark={false} placeholder="Ask anything" mic="plain" />
    </Phone>
  )
}
