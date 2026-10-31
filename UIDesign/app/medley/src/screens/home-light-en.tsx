import { Phone } from '../components/Phone'
import { TopBar, ModelPill } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { SuggestionRow } from '../components/Chat'
import { Icon } from '../components/icons'

export const meta = { id: 'home-light-en', title: 'Home (light, EN)', source: 'det_r0_c1' }

export default function HomeLightEn() {
  return (
    <Phone theme="light">
      <div className="flex min-h-0 flex-1 flex-col bg-light-bg">
        <TopBar
          dark={false}
          left={Icon.menu('#17181c')}
          center={<ModelPill dark={false} label="Auto" options={['Claude Sonnet 5.5', 'GPT-6.1 Sol', 'Kimi K3']} />}
          right={Icon.clock('#17181c')}
        />
        <div className="min-h-0 flex-1" />
        <div className="px-5">
          <div className="mb-[18px] text-greeting font-semibold leading-[1.25] text-light-text">Good evening, Alex</div>
          <div className="flex flex-col gap-0.5 border-t border-light-divider">
            <SuggestionRow dark={false} icon={Icon.news('#6b6c72')} text="What's in the news today" />
            <SuggestionRow dark={false} icon={Icon.pdf('#6b6c72')} text="Summarize a PDF" />
            <SuggestionRow dark={false} icon={Icon.image('#6b6c72')} text="Create an image" />
            <SuggestionRow dark={false} icon={Icon.cards('#6b6c72')} text="Make flashcards from my notes" />
          </div>
        </div>
        <div className="h-3" />
        <InputBar dark={false} placeholder="Ask anything" mic="plain" />
      </div>
    </Phone>
  )
}
