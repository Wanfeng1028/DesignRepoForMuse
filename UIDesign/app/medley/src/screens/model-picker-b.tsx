import { Phone } from '../components/Phone'
import { Icon } from '../components/icons'
import { AutoCard, ModelCost, ModelRow, ModelSection, ThinkingControl } from '../components/ModelPicker'

export const meta = { id: 'model-picker-b', title: 'Choose a model B + Thinking (dark)', source: 'ov_r2_c0' }

// NOTE: GPT-6.1 Sol / Kimi K3 / Claude Opus 5.5 carry no section title in the
// source (detail close-out 2026-10-27); no title is invented for them here.
export default function ModelPickerB() {
  return (
    <Phone theme="dark">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <div className="flex items-center justify-between px-5 pt-3">
            <span className="text-page font-bold text-dark-text">Choose a model</span>
            <span className="text-secondary text-dark-sub">How credits work</span>
          </div>
          <AutoCard />
          <ModelSection title="Advanced" desc="Better at writing and reasoning.">
            <ModelRow name="GLM-5" desc="Long documents and writing" dot="#e1b3c7" last right={<ModelCost value="~31" />} />
          </ModelSection>
          <ModelSection title="Flagship" desc="Strong all-rounders for serious work.">
            <ModelRow
              name="Claude Sonnet 5.5"
              desc="Writing and coding"
              dot="#dfc1ad"
              last
              right={
                <div className="flex items-center gap-2">
                  <ModelCost value="~80" />
                  {Icon.check('#f5f5f7')}
                </div>
              }
            />
          </ModelSection>
          <ThinkingControl
            segments={['Auto', 'Off', 'Low', 'Med', 'High', 'Max']}
            value="Auto"
            hint="Auto picks the ideal for each message."
          />
          <div className="px-5 pt-2">
            <ModelRow name="GPT-6.1 Sol" desc="Advanced reasoning" dot="#afddc9" right={<ModelCost value="~80" />} />
            <ModelRow
              name="Kimi K3"
              desc="Very long documents"
              dot="#d4da9f"
              right={
                <div className="w-[110px] text-right text-caption leading-[1.4] text-dark-dim">Not available in this chat</div>
              }
            />
            <ModelRow name="Claude Opus 5.5" desc="Deep, careful work" dot="#dfc1ad" last right={<ModelCost value="~160" />} />
          </div>
        </div>
      </div>
    </Phone>
  )
}
