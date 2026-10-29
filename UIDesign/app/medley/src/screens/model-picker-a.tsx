import { Phone } from '../components/Phone'
import { Icon } from '../components/icons'
import { AutoCard, ModelCost, ModelRow, ModelSection } from '../components/ModelPicker'

export const meta = { id: 'model-picker-a', title: 'Choose a model A (dark)', source: 'det_r0_c2' }

export default function ModelPickerA() {
  return (
    <Phone theme="dark">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto pb-4">
          <div className="flex items-center justify-between px-5 pt-3">
            <span className="text-page font-bold text-dark-text">Choose a model</span>
            <span className="text-secondary text-dark-sub">How credits work</span>
          </div>
          <AutoCard />
          <div className="flex items-center justify-center gap-0.5 pt-[14px]">
            <span className="text-secondary text-dark-sub">Up to Advanced</span>
            {Icon.chevronRight('#9a9ba2')}
          </div>
          <ModelSection title="Everyday" desc="Fast and light, for everyday questions.">
            <ModelRow name="GLM-5.3 Flash" desc="Fast everyday answers" dot="#4a7de4" right={<ModelCost value="-5" />} />
            <ModelRow name="DeepSeek V4.1 Flash" desc="Quick answers, good at math and code" dot="#2eb5a5" last right={<ModelCost value="-11" />} />
          </ModelSection>
          <ModelSection title="Advanced" desc="Better at writing and reasoning.">
            <ModelRow name="GLM-5" desc="Long documents and writing" dot="#4a7de4" last right={<ModelCost value="-31" />} />
          </ModelSection>
          <ModelSection title="Flagship" desc="Strong all-rounders for serious work.">
            <ModelRow name="Claude Sonnet 5.5" desc="Writing and coding" dot="#e2a181" right={<ModelCost value="-80" />} />
            <ModelRow name="Kimi K3" desc="Very long documents" dot="#9b5de5" last right={<ModelCost value="-120" />} />
          </ModelSection>
          <ModelSection title="Frontier" desc="The most capable models, for the hardest problems.">
            <ModelRow
              name="Claude Fable 5.1"
              desc="The hardest problems"
              dot="#e2a181"
              last
              right={
                <div className="text-right">
                  <div className="mb-0.5">
                    <span className="rounded-chip border border-dark-divider px-2 py-[1px] text-[11px] font-semibold text-dark-sub">Pro</span>
                  </div>
                  <ModelCost value="-400" />
                </div>
              }
            />
          </ModelSection>
        </div>
      </div>
    </Phone>
  )
}
