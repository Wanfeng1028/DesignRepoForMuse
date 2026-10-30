import { Phone } from '../components/Phone'
import { Icon } from '../components/icons'
import { AutoCard, ModelCost, ModelRow, ModelSection } from '../components/ModelPicker'

export const meta = { id: 'model-picker-a', title: 'Choose a model A (dark)', source: 'det_r0_c2' }

export default function ModelPickerA() {
  return (
    <Phone theme="dark" className="bg-[#08090b]">
      <div className="flex min-h-0 flex-1 flex-col">
        {/* v1.8 sheet reconstruction (detail-strip geometry, re-measured this
            round): the original picker is a bottom sheet, not a full screen.
            Status bar (32) + this 70px near-black top zone puts the sheet top
            at phone y102 (orig sheet-top strip y232, phone top strip y129);
            sheet bg is the existing darkCard token (orig sampled (32,33,37),
            token (30,31,35), -2 JPEG tolerance). Handle pt-2 puts the handle
            at 110-114 (orig 110-113); title pt-5 puts the title bright core
            at ~142 (orig core 142-149). Only the sheet frame moves here;
            AutoCard/section gaps are re-measured after this change. */}
        <div className="h-[70px] shrink-0 bg-[#08090b]" />
        <div className="min-h-0 flex-1 overflow-y-auto rounded-t-sheet bg-dark-card pb-4">
          <div className="flex justify-center pt-2">
            <div className="h-[5px] w-9 rounded-full bg-[#3a3b40]" />
          </div>
          <div className="flex items-center justify-between px-5 pt-[17px]">
            <span className="text-page font-bold text-dark-text">Choose a model</span>
            <span className="text-secondary text-dark-sub">How credits work</span>
          </div>
          <AutoCard />
          <div className="flex items-center justify-center gap-0.5 pt-[6px]">
            <span className="text-secondary text-dark-sub">Up to Advanced</span>
            {Icon.chevronRight('#9a9ba2')}
          </div>
          <ModelSection title="Everyday" desc="Fast and light, for everyday questions.">
            <ModelRow name="GLM-5.3 Flash" desc="Fast everyday answers" dot="#e1b3c7" right={<ModelCost value="~5" />} />
            <ModelRow name="DeepSeek V4.1 Flash" desc="Quick answers, good at math and code" dot="#a1bfd3" last right={<ModelCost value="~11" />} />
          </ModelSection>
          <ModelSection title="Advanced" desc="Better at writing and reasoning.">
            <ModelRow name="GLM-5" desc="Long documents and writing" dot="#e1b3c7" last right={<ModelCost value="~31" />} />
          </ModelSection>
          <ModelSection title="Flagship" desc="Strong all-rounders for serious work.">
            <ModelRow name="Claude Sonnet 5.5" desc="Writing and coding" dot="#dfc1ad" right={<ModelCost value="~80" />} />
            <ModelRow name="Kimi K3" desc="Very long documents" dot="#d8c25a" last right={<ModelCost value="~120" />} />
          </ModelSection>
          <ModelSection title="Frontier" desc="The most capable models, for the hardest problems.">
            <ModelRow
              name="Claude Fable 5.1"
              desc="The hardest problems"
              dot="#dfc1ad"
              last
              right={
                <div className="flex items-start gap-2">
                  <span className="mt-[2px] rounded-chip border border-dark-divider px-2 py-[1px] text-[11px] font-semibold text-dark-sub">
                    Pro+
                  </span>
                  <ModelCost value="~400" />
                </div>
              }
            />
          </ModelSection>
        </div>
      </div>
    </Phone>
  )
}
