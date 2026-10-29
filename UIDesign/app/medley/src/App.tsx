import type { ComponentType } from 'react'
import { Phone } from './components/Phone'
import { TopBar, ModelPill } from './components/TopBar'
import { InputBar } from './components/InputBar'
import { UserBubble, AiMeta, ActionRow, SourcesChip } from './components/Chat'
import { ModelDots, ModelDot, MedleyMark } from './components/Model'
import { AutoCard, ModelCost, ModelRow, ThinkingControl } from './components/ModelPicker'
import { BillingToggle, PlanCard, PlanFeature } from './components/Pricing'
import { CreditsChart, CreditsRow } from './components/Credits'
import { AgentRow, CreditsProgress } from './components/AgentTeam'
import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Dialog, DialogTrigger, DialogContent } from './components/ui/dialog'
import { Sheet, SheetTrigger, SheetContent } from './components/ui/sheet'
import WelcomeDark from './screens/welcome-dark'
import HomeLightEn from './screens/home-light-en'
import HomeLightCn from './screens/home-light-cn'
import ChatDarkLisbonEn from './screens/chat-dark-lisbon-en'
import ChatDarkLisbonCn from './screens/chat-dark-lisbon-cn'
import ChatLightTrainEn from './screens/chat-light-train-en'
import ChatLightSavingsEn from './screens/chat-light-savings-en'
import ChatDarkKyotoEn from './screens/chat-dark-kyoto-en'
import ChatLightRouterEn from './screens/chat-light-router-en'
import ChatInfoSheet from './screens/chat-info-sheet'
import SearchDrawerDark from './screens/search-drawer-dark'
import ModelPickerA from './screens/model-picker-a'
import ModelPickerB from './screens/model-picker-b'
import PricingDark from './screens/pricing-dark'
import CreditsLight from './screens/credits-light'
import SuspendedLight from './screens/suspended-light'
import AgentTeamDark from './screens/agent-team-dark'
import LanguageLight from './screens/language-light'

type ScreenModule = { default: ComponentType; meta: { id: string; title: string; source: string } }

const screens: ScreenModule[] = [
  { default: WelcomeDark, meta: { id: 'welcome-dark', title: 'Welcome (dark)', source: 'cn_r0_c0' } },
  { default: HomeLightEn, meta: { id: 'home-light-en', title: 'Home (light, EN)', source: 'det_r0_c1' } },
  { default: HomeLightCn, meta: { id: 'home-light-cn', title: 'Home (light, CN)', source: 'cn_r0_c1' } },
  { default: ChatDarkLisbonEn, meta: { id: 'chat-dark-lisbon-en', title: 'Lisbon chat (dark, EN)', source: 'det_r0_c0' } },
  { default: ChatDarkLisbonCn, meta: { id: 'chat-dark-lisbon-cn', title: 'Lisbon chat (dark, CN)', source: 'cn_r0_c2' } },
  { default: ChatLightTrainEn, meta: { id: 'chat-light-train-en', title: 'Train vs plane chat (light)', source: 'ov_r0_c3' } },
  { default: ChatLightSavingsEn, meta: { id: 'chat-light-savings-en', title: 'Savings calculator chat (light)', source: 'ov_r0_c4' } },
  { default: ChatDarkKyotoEn, meta: { id: 'chat-dark-kyoto-en', title: 'Kyoto itinerary chat (dark)', source: 'ov_r1_c0' } },
  { default: ChatLightRouterEn, meta: { id: 'chat-light-router-en', title: 'Router settings chat (light)', source: 'ov_r1_c1' } },
  { default: ChatInfoSheet, meta: { id: 'chat-info-sheet', title: 'Chat info sheet (light)', source: 'ov_r1_c2' } },
  { default: SearchDrawerDark, meta: { id: 'search-drawer-dark', title: 'Search drawer (dark)', source: 'ov_r1_c3' } },
  { default: ModelPickerA, meta: { id: 'model-picker-a', title: 'Choose a model A (dark)', source: 'det_r0_c2' } },
  { default: ModelPickerB, meta: { id: 'model-picker-b', title: 'Choose a model B + Thinking (dark)', source: 'ov_r2_c0' } },
  { default: PricingDark, meta: { id: 'pricing-dark', title: 'Pricing (dark)', source: 'det_r0_c3' } },
  { default: CreditsLight, meta: { id: 'credits-light', title: 'Credits (light)', source: 'det_r0_c4' } },
  { default: SuspendedLight, meta: { id: 'suspended-light', title: 'Account suspended (light)', source: 'ov_r2_c3' } },
  { default: AgentTeamDark, meta: { id: 'agent-team-dark', title: 'Agent team task (dark)', source: 'ov_r2_c4' } },
  { default: LanguageLight, meta: { id: 'language-light', title: 'App language (light)', source: 'cn_r0_c3' } },
]

function Showcase() {
  return (
    <section className="mb-10 max-w-[1200px]">
      <h2 className="mb-2 text-[20px] font-bold text-dark-text">Components</h2>
      <p className="mb-6 text-[14px] text-dark-sub">
        All components are props-driven; the copy below is demo copy only. Tokens live in src/tokens and
        src/index.css (@theme).
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-card bg-dark-card p-5">
          <div className="mb-3 text-[13px] font-bold text-dark-sub">Phone / StatusBar / MedleyMark / ModelDots</div>
          <div className="flex items-center gap-3">
            <MedleyMark size={30} />
            <span className="text-[17px] font-bold text-dark-text">Medley</span>
            <ModelDots />
            <ModelDot model="Claude Sonnet 5.5" />
            <ModelDot model="GLM-5" />
          </div>
          <div className="mt-4">
            <TopBar dark center={<ModelPill dark label="Auto" options={['Claude Sonnet 5.5']} />} left={<span />} right={<span />} />
          </div>
        </div>
        <div className="rounded-card bg-dark-card p-5">
          <div className="mb-3 text-[13px] font-bold text-dark-sub">InputBar / Buttons / Slider</div>
          <div className="mx-[-16px]">
            <InputBar dark placeholder="Ask anything" />
          </div>
          <div className="mt-4 flex gap-3">
            <Button>Buy credits</Button>
            <Button variant="white">Continue with Google</Button>
          </div>
          <div className="mt-4">
            <Slider defaultValue={[44]} max={100} />
          </div>
          <div className="mt-4 flex gap-3">
            <Dialog>
              <DialogTrigger asChild><Button variant="outline" className="border-dark-divider text-dark-text">Open dialog (Radix)</Button></DialogTrigger>
              <DialogContent><div className="text-[16px] font-bold text-light-text">Dialog demo</div><p className="text-[14px] text-light-sub">Radix Dialog, shadcn-style.</p></DialogContent>
            </Dialog>
            <Sheet>
              <SheetTrigger asChild><Button variant="outline" className="border-dark-divider text-dark-text">Open sheet (Radix)</Button></SheetTrigger>
              <SheetContent><div className="text-[16px] font-bold text-light-text">Sheet demo</div><p className="text-[14px] text-light-sub">Bottom sheet, Radix Dialog based.</p></SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="rounded-card bg-dark-card p-5">
          <div className="mb-3 text-[13px] font-bold text-dark-sub">Chat: UserBubble / AiMeta / ActionRow / SourcesChip</div>
          <UserBubble dark>Plan 3 days in Lisbon on a budget.</UserBubble>
          <AiMeta dark model="GLM-5 · Auto" />
          <div className="text-body text-dark-text">A relaxed plan that keeps costs low.</div>
          <SourcesChip dark badges={['T', 'L', 'V']} countLabel="3 sources" />
          <ActionRow dark credits="28 credits" />
        </div>
        <div className="rounded-card bg-dark-card p-5">
          <div className="mb-3 text-[13px] font-bold text-dark-sub">Model picker: AutoCard / ModelRow / Thinking</div>
          <div className="mx-[-20px]"><AutoCard /></div>
          <ModelRow name="GLM-5" desc="Long documents and writing" dot="#4a7de4" last right={<ModelCost value="-31" />} />
          <ThinkingControl segments={['Auto', 'Off', 'Low', 'Med', 'High', 'Max']} value="Auto" hint="Auto picks the ideal for each message." />
        </div>
        <div className="rounded-card bg-dark-card p-5">
          <div className="mb-3 text-[13px] font-bold text-dark-sub">Pricing: BillingToggle / PlanCard</div>
          <BillingToggle monthlyLabel="Monthly" yearlyLabel="Yearly" saveLabel="Save 20%" />
          <PlanCard name="Pro" monthly="$16.00/mo" yearly="$191.99 a year" selected badge="7 days free">
            <p className="ml-[30px] mt-3 text-[13px] leading-[1.5] text-dark-sub">80,000 credits a month.</p>
            <PlanFeature text="Image generation and deep research" />
          </PlanCard>
        </div>
        <div className="rounded-card bg-light-card p-5">
          <div className="mb-3 text-[13px] font-bold text-light-sub">Credits: chart / row</div>
          <CreditsChart bars={[18, 32, 48, 64, 80, 96]} />
          <CreditsRow name="GLM-5" sub="590 messages" amount="18,300" pct="26%" last />
        </div>
        <div className="rounded-card bg-dark-card p-5 md:col-span-2">
          <div className="mb-3 text-[13px] font-bold text-dark-sub">Agent team: CreditsProgress / AgentRow</div>
          <CreditsProgress label="1,240 of 6,000 credits" step="Step 3 of 8" percent="20%" />
          <AgentRow role="Researcher" model="DeepSeek V4 Pro" task="Reading notion.com/pricing" status="Running" time="9s" />
          <div className="mt-4 flex justify-center">
            <Phone theme="dark" className="h-[200px] w-[390px] overflow-hidden">
              <div className="p-5 text-[14px] text-dark-sub">Phone frame at gallery scale is cropped here; full 390x852 frames are the screens below.</div>
            </Phone>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const single = params.get('screen')
  if (single) {
    const found = screens.find((s) => s.meta.id === single)
    if (found) {
      const C = found.default
      return (
        <div style={{ width: 390, height: 844, overflow: 'hidden', background: '#0b0b0e' }}>
          <div style={{ transform: 'scale(0.9906)', transformOrigin: 'top left' }}>
            <C />
          </div>
        </div>
      )
    }
  }
  return (
    <div className="min-h-screen bg-[#0b0b0e] p-8 font-sans">
      <h1 className="mb-2 text-[28px] font-bold text-dark-text">Medley mobile design system</h1>
      <p className="mb-8 text-[14px] text-dark-sub">
        {screens.length} screens (target 18) · Vite + React + TS + Tailwind CSS v4 + Radix · single-screen
        screenshots: ?screen=&lt;id&gt;
      </p>
      <Showcase />
      <h2 className="mb-6 text-[20px] font-bold text-dark-text">Screens</h2>
      <div className="flex flex-wrap gap-10">
        {screens.map(({ default: C, meta }) => (
          <section key={meta.id} id={`screen-${meta.id}`} className="shrink-0">
            <div className="mb-1 text-[16px] font-bold text-dark-text">{meta.title}</div>
            <div className="mb-3 text-[12px] text-dark-dim">{meta.source}</div>
            <C />
          </section>
        ))}
      </div>
    </div>
  )
}
