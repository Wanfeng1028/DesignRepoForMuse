import type { ReactNode } from "react";
import { useState } from "react";
import { DesktopLayout } from "./layouts/DesktopLayout";
import { ChatMessage, UserBubble, AiMeta, ActionRow } from "./components/chat-message";
import { SourceChips } from "./components/source-chips";
import { Composer } from "./components/composer";
import { HomePanel } from "./components/home-panel";
import { WelcomePanel } from "./components/welcome-panel";
import { ModelPickerA, ModelPickerB } from "./components/model-picker";
import { PricingPanel } from "./components/pricing-panel";
import { CreditsPanel } from "./components/credits-panel";
import { AgentTeamPanel } from "./components/agent-team-panel";
import { SearchDrawer } from "./components/search-drawer";
import { ChatInfoSheet, ChatInfoBackdrop } from "./components/chat-info-sheet";
import { SuspendedPanel } from "./components/suspended-panel";
import { LanguagePanel } from "./components/language-panel";
import { SavingsCard, CompareTable } from "./components/savings-card";
import { Icon } from "./components/icons";
import { ModelDot } from "./components/medley-mark";
import { LiquidGlassDefs } from "./components/liquid-glass";
import { IOSStatusBar, HomeIndicator } from "./components/ios-status-bar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { Slider, Tabs, TabsList, TabsTrigger } from "./components/ui/controls";
import * as d from "./demo/data";

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1240px] px-5 py-8">
      <h2 className="text-[20px] font-bold text-[#17181C]">{title}</h2>
      {note && <p className="mt-1 text-[13px] leading-[1.45] text-[#6B6C72]">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LisbonChat({ dark }: { dark: boolean }) {
  return (
    <div className="px-6 py-2">
      <ChatMessage dark={dark} role="user">{d.lisbon.user}</ChatMessage>
      <ChatMessage
        dark={dark} role="ai" model="GLM-5 · Auto" sub="Searched 6 sites, thought for 3s" credits="28 credits" meta="1.1s 71 tok/s"
        blocks={[
          { kind: "paragraph", text: d.lisbon.aiIntro },
          { kind: "heading", text: d.lisbon.day1 },
          { kind: "bullets", items: d.lisbon.bullets },
        ]}
      >
        <SourceChips dark={dark} badges={["T", "L", "V"]} countLabel="3 sources" />
      </ChatMessage>
      <div className="flex justify-end">
        <div className="rounded-chip border border-dark-divider px-[18px] py-2.5 text-list-item text-dark-text">{d.lisbon.followUp}</div>
      </div>
      <ChatMessage dark={dark} role="ai" model="Claude Sonnet 5.5" blocks={[{ kind: "paragraph", text: d.lisbon.day2 }]} />
      {/* v1.3 S1: Lisbon thread composer — generating stop state. */}
      <div className="mt-3 px-1 pb-2">
        <Composer dark placeholder="Message Claude Sonnet 5.5" mic="stop" />
      </div>
    </div>
  );
}

function TrainChat() {
  return (
    <div className="px-6 py-2">
      <UserBubble dark={false}>{d.train.user}</UserBubble>
      <AiMeta dark={false} model="DeepSeek V4 Pro · Auto" sub="Searched 9 sites, read 4 pages, thought for 6s" />
      <p className="my-0 mb-2 text-body font-bold leading-[1.55]">{d.train.verdict}</p>
      <p className="my-0 mb-4 text-body leading-[1.55]">{d.train.body}</p>
      <CompareTable headers={d.train.headers} rows={d.train.rows} />
      {/* v1.3 sweep: sources sit in a filled light pill (ov-train). */}
      <div className="mt-3 inline-flex items-center gap-1 rounded-chip bg-user-bubble-light px-3 py-[5px] text-caption text-light-sub">
        {["S", "R", "K"].map((letter) => (
          <span key={letter} className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-light-card text-[10px] font-bold text-light-text">
            {letter}
          </span>
        ))}
        <span className="ml-1">4 sources</span>
      </div>
      <ActionRow dark={false} credits="41 credits" />
      {/* v1.3 sweep: suggestions are pill chips with a corner arrow (ov-train). */}
      <div className="mt-3 flex flex-col gap-2.5">
        {d.train.suggestions.map((s) => (
          <div key={s} className="flex items-center gap-2.5 rounded-chip border border-light-divider px-3 py-2.5">
            {Icon.cornerUpRight("#6B6C72", 16)}
            <span className="text-list-item font-medium">{s}</span>
          </div>
        ))}
      </div>
      {/* v1.3 S1: Train thread composer last (plain line mic, ov-train bottom). */}
      <div className="mt-3 pb-2">
        <Composer dark={false} placeholder="Ask anything" mic="plain" />
      </div>
    </div>
  );
}

function KyotoChat() {
  return (
    <div className="px-6 py-2">
      <UserBubble dark>{d.kyoto.user}</UserBubble>
      <AiMeta dark model="Kimi K3" sub="Searched 4 times, checked the weather, found 12 places" />
      <p className="my-0 mb-3.5 text-body font-bold leading-[1.55] text-dark-text">{d.kyoto.verdict}</p>
      <div className="flex gap-3">
        {d.kyoto.days.map((day) => {
          const dayColor = day.light ? "#17181C" : "#F5F5F7";
          const daySub = day.light ? "#6B6C72" : "#9A9BA2";
          return (
          <div key={day.date} className="flex-1 rounded-card px-3 py-2.5" style={{ background: day.light ? "#FFFFFF" : "#1E1F23" }}>
            <div className="text-list-item font-bold" style={{ color: dayColor }}>{day.date}</div>
            {/* v1.3 sweep: weather glyph before the temperature (ov-kyoto). */}
            <div className="mt-1 flex items-center gap-1.5 text-secondary" style={{ color: daySub }}>
              {/rain/i.test(day.weather) ? Icon.cloudRain(daySub, 14) : Icon.sun(daySub, 14)}
              <span>{day.weather}</span>
            </div>
          </div>
          );
        })}
      </div>
      {d.kyoto.timeline.map((t) => (
        <div key={t.place} className="mt-3.5 flex gap-3">
          <span className="w-[46px] shrink-0 text-secondary text-dark-sub">{t.time}</span>
          <span>
            <span className="block text-list-item font-bold text-dark-text">{t.place}</span>
            <span className="mt-0.5 block text-secondary text-dark-sub">{t.note}</span>
          </span>
        </div>
      ))}
      <div className="mt-4 flex gap-5">
        <span className="flex items-center gap-1.5 text-[14px] font-semibold text-dark-text">{Icon.map("#F5F5F7", 16)}Show map</span>
        <span className="flex items-center gap-1.5 text-[14px] font-semibold text-dark-text">{Icon.calendar("#F5F5F7", 16)}Add to calendar</span>
      </div>
      <div className="mt-3 text-caption text-dark-dim">Weather from Google Weather, 10:24</div>
      <div className="mt-4 rounded-card bg-dark-card p-3">
        <div className="text-body font-bold text-dark-text">Add a day trip?</div>
        {d.kyoto.poll.map((label, i) => (
          <div
            key={label}
            className={i === 0 ? "mt-2.5 flex items-center gap-2.5 rounded-chip border px-3 py-2.5 text-list-item" : "mt-2.5 flex items-center gap-2.5 border-t border-dark-divider px-3 py-2.5 text-list-item"}
            style={{
              background: i === 0 ? "#F5F5F7" : "transparent",
              borderColor: i === 0 ? "transparent" : "#2A2C31",
              color: i === 0 ? "#17181C" : "#F5F5F7",
              fontWeight: i === 0 ? 700 : 500,
            }}
          >
            <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: i === 0 ? "#17181C" : "#9A9BA2" }}>
              {i === 0 && <span className="h-[9px] w-[9px] rounded-full bg-light-text" />}
            </span>
            {label}
          </div>
        ))}
      </div>
      {/* v1.3 S1: Kyoto thread composer (plain line mic, ov-kyoto bottom). */}
      <div className="mt-4 pb-2">
        <Composer dark placeholder="Ask anything" mic="plain" />
      </div>
    </div>
  );
}

function RouterChat() {
  return (
    <div className="px-6 py-2">
      <UserBubble dark={false}>{d.router.user}</UserBubble>
      <div className="mt-2 rounded-card bg-user-bubble-light p-4">
        <div className="flex gap-2.5">
          {/* v1.3 P2-5: shield outline, not "!". */}
          <span className="inline-flex shrink-0" style={{ color: "#6B6C72" }}>{Icon.shield("#6B6C72", 20)}</span>
          <div>
            <div className="text-list-item font-bold leading-[1.45]">{d.router.noticeTitle}</div>
            <p className="my-0 mt-2 text-[14px] leading-[1.55] text-light-sub">{d.router.noticeBody}</p>
            <div className="mt-3 flex gap-5">
              <span className="text-[14px] font-semibold">Learn more</span>
              <span className="text-[14px] font-semibold">Send feedback</span>
            </div>
          </div>
        </div>
      </div>
      <AiMeta dark={false} model="GPT-6.1 Sol · Switched" sub="Thought for 4s" />
      <p className="my-0 text-body leading-[1.55]">{d.router.body}</p>
      {d.router.bullets.map((b) => (
        <div key={b} className="mt-3 flex gap-2.5">
          <span className="shrink-0 text-list-item leading-[1.5]">•</span>
          <span className="text-list-item leading-[1.5]">{b}</span>
        </div>
      ))}
      <ActionRow dark={false} credits="64 credits" />
      {/* v1.3 S1: Router thread composer (plain mic, "Message GPT-6.1 Sol"). */}
      <div className="mt-3 pb-2">
        <Composer dark={false} placeholder="Message GPT-6.1 Sol" mic="plain" />
      </div>
    </div>
  );
}

function SidebarDemo() {
  return (
    <SearchDrawer
      searchPlaceholder="Search"
      nav={d.drawerNav}
      pinnedLabel="Pinned"
      pinnedTitle="Thesis outline"
      pinnedDots={["#E4754A", "#9B5DE5"]}
      recentLabel="Recent"
      recent={d.drawerRecent}
      messagesLeft="About 240 messages left"
      userName="Alex"
      userBadge="Pro"
    />
  );
}

export default function App() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [thinking, setThinking] = useState("Auto");
  return (
    <div className="min-h-full bg-[#F5F6F8] pb-16 font-sans text-[#17181C]">
      <LiquidGlassDefs />
      <header className="border-b border-light-divider bg-white px-5 py-6">
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-3">
          <span className="text-[26px] font-bold">Medley</span>
          <span className="text-[13px] text-light-sub">Desktop / web UI kit — Vite + React + TS + Tailwind v4 + Radix</span>
        </div>
        <p className="mx-auto mt-2 w-full max-w-[1240px] text-[13px] leading-[1.55] text-light-sub">
          Desktop layout note: there is no desktop original image. What is 1:1 with the mobile originals is the token set and the
          component forms (colors, sizes, radii, bubbles, cards, pickers); the column arrangement below is a desktop re-layout.
          All screen copy on this page is demo content only — components take every string as a prop.
        </p>
        <nav className="mx-auto mt-3 flex w-full max-w-[1240px] flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium">
          {["desktop-lisbon", "desktop-home", "welcome", "home", "chat", "picker", "pricing", "credits", "agent-team", "drawer", "chat-info", "suspended", "language", "composer", "phone-chrome", "primitives"].map((id) => (
            <a key={id} href={`#${id}`} className="text-[#17181C] underline underline-offset-2">{id}</a>
          ))}
        </nav>
      </header>

      <Section id="desktop-lisbon" title="Desktop example — Lisbon chat (dark)" note="Left: search drawer. Main: Lisbon thread. Right: chat-info sheet.">
        <DesktopLayout
          dark sidebar={<SidebarDemo />}
          topCenter={<span className="inline-flex items-center gap-1.5 text-body font-bold text-dark-text"><ModelDot model="Claude Sonnet 5.5" />Claude Sonnet 5.5</span>}
          rightPanel={<ChatInfoSheet {...d.chatInfo} />}
        >
          {/* v1.3 S1: LisbonChat now ends with its own stop composer; the
              duplicate desktop composer is removed. */}
          <LisbonChat dark />
        </DesktopLayout>
      </Section>

      <Section id="desktop-home" title="Desktop example — Home (light) + Credits" note="Main: English home panel. Right: credits panel.">
        <DesktopLayout sidebar={<SidebarDemo />} rightPanel={<CreditsPanel balance="12,480" balanceUnit="credits" aboutLine="About 270 messages at your usual mix" planLine="Pro plan, 80,000 credits a month. Renews Nov 15." last30Label="Last 30 days" last30Total="71,720 credits" upgradeLabel="Oct 15, upgraded to Pro" bars={d.creditsBars} legend={d.creditsLegend} models={d.creditsModels} activity={{ title: "Lisbon on a budget", meta: "Today, 10:21, Claude Sonnet 5.5", amount: "84" }} dateRange={["Sep 26", "Oct 25"]} />}>
          <div className="flex min-h-[560px] flex-col [&>div]:flex-1">
            <HomePanel variant="en" greeting="Good evening, Alex" suggestions={d.homeEnSuggestions} composerPlaceholder="Ask anything" />
          </div>
        </DesktopLayout>
      </Section>

      <Section id="welcome" title="Welcome (dark)">
        <div className="max-w-[560px] overflow-hidden rounded-card">
          <WelcomePanel tagline="Every top AI in one app." modelLine="Claude, GPT, Gemini, DeepSeek, Kimi and GLM" googleLabel="Continue with Google" tryLabel="Try without an account" footnote="By continuing, you confirm you're 18 or older and agree to the Terms and Privacy Policy." />
        </div>
      </Section>

      <Section id="home" title="Home panels — EN + CN">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="min-h-[560px] overflow-hidden rounded-card border border-light-divider bg-light-bg flex flex-col [&>div]:flex-1">
            <HomePanel variant="en" greeting="Good evening, Alex" suggestions={d.homeEnSuggestions} composerPlaceholder="Ask anything" />
          </div>
          <div className="min-h-[560px] overflow-hidden rounded-card border border-light-divider bg-light-bg flex flex-col [&>div]:flex-1">
            <HomePanel variant="cn" segmentLabels={["聊天", "智能体"]} greeting="晚上好，Alex" suggestions={d.homeCnSuggestions} composerPlaceholder="有问题，尽管问" composerModelLabel="自动" />
          </div>
        </div>
      </Section>

      <Section id="chat" title="Chat messages — Lisbon / Train / Savings / Kyoto / Router">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-light-divider bg-dark-bg pb-2"><LisbonChat dark /></div>
          <div className="rounded-card border border-light-divider bg-light-bg pb-2"><TrainChat /></div>
          <div className="rounded-card border border-light-divider bg-light-bg p-5">
            <UserBubble dark={false}>$200 a month at 6% for 15 years?</UserBubble>
            <AiMeta dark={false} model="GPT-6.1 Sol · Auto" sub="Thought for 3s" />
            <p className="my-0 mb-3.5 text-body font-bold leading-[1.55]">{d.savings.headline}</p>
            <SavingsCard title="Savings growth" sliders={d.savings.sliders} yearsLabel="Years" years="15" finalBalance="$58,164" finalLabel="Final balance" putIn="$36,000" putInLabel="Put in" growth="$22,164" growthLabel="Growth" axisLabels={["Now", "5 yr", "10 yr", "15 yr"]} footerLeft="Calculated in Medley" footerRight="Formula ▾" />
            {/* v1.3 S1: Savings thread composer (plain line mic, ov-savings). */}
            <div className="mt-4">
              <Composer dark={false} placeholder="Ask anything" mic="plain" />
            </div>
          </div>
          <div className="rounded-card border border-light-divider bg-dark-bg pb-2"><KyotoChat /></div>
          <div className="rounded-card border border-light-divider bg-light-bg pb-2 lg:col-span-2"><RouterChat /></div>
        </div>
      </Section>

      <Section id="picker" title="Model picker — A and B" note="Picker B renders no section title above GPT-6.1 Sol / Kimi K3 / Claude Opus 5.5 (none exists in the original). Thinking figures ~110/~10/~110/~140/~200/~400 measured from the Thinking zoom (v1.3).">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="rounded-card bg-dark-card px-5 pb-5"><ModelPickerA sections={d.pickerASections} howCreditsText="Credits are based on each provider's official API price, and every answer shows what it used." /></div>
          <div className="rounded-card bg-dark-card px-5 pb-5">
            <ModelPickerB sections={d.pickerBSections} untitledRows={d.pickerBUntitled} thinkingValue={thinking} onThinkingChange={setThinking} howCreditsText="Credits are based on each provider's official API price, and every answer shows what it used." />
          </div>
        </div>
      </Section>

      <Section id="pricing" title="Pricing panel (dark)">
        <div className="max-w-[560px] rounded-card bg-dark-bg px-5 pb-3">
          <PricingPanel title="Every top AI in one app" intro="Credits are based on each provider's official API price, and every answer shows what it used." billing={billing} onBillingChange={setBilling} plans={d.pricingPlans} ctaLabel="Start 7-day free trial" footnote="Free for 7 days, then $191.99 a year. Cancel anytime in Google Play before the trial ends and you won't be charged. No ads on any plan. No weekly plans." />
        </div>
      </Section>

      <Section id="credits" title="Credits panel (light)">
        <div className="max-w-[720px] rounded-card border border-light-divider px-5 py-4">
          <CreditsPanel balance="12,480" balanceUnit="credits" aboutLine="About 270 messages at your usual mix" planLine="Pro plan, 80,000 credits a month. Renews Nov 15." last30Label="Last 30 days" last30Total="71,720 credits" upgradeLabel="Oct 15, upgraded to Pro" bars={d.creditsBars} legend={d.creditsLegend} models={d.creditsModels} activity={{ title: "Lisbon on a budget", meta: "Today, 10:21, Claude Sonnet 5.5", amount: "84" }} dateRange={["Sep 26", "Oct 25"]} />
        </div>
      </Section>

      <Section id="agent-team" title="Agent team panel (dark)" note="Order: progress bar above the credits line; 20% measured fill; times 31s / 9s / 7s / 6s / 21s / 8s.">
        <div className="max-w-[560px] rounded-card bg-dark-bg px-5 py-4">
          <AgentTeamPanel titleLines={["Compare the pricing of 12 note-taking", "apps"]} meta={["Team, 6 agents", "Auto-review"]} creditsLine="1,240 of 6,000 credits" stepLine="Step 3 of 6" progressPct="20%" lead={d.agentLead} agents={d.agentRows} />
        </div>
      </Section>

      <Section id="drawer" title="Search drawer (desktop: left panel)">
        <div className="max-w-[340px] rounded-card border border-dark-divider bg-dark-bg p-4"><SidebarDemo /></div>
      </Section>

      <Section id="chat-info" title="Chat info sheet (+ dimmed backdrop)">
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-card border border-light-divider">
            <ChatInfoBackdrop bubbleText="Turn this into a 3-day plan with costs." modelLine="Claude Sonnet 5.5 · Auto" />
            <ChatInfoSheet {...d.chatInfo} />
          </div>
          <div className="rounded-card border border-light-divider bg-light-bg p-5">
            <p className="my-0 text-[13px] leading-[1.55] text-light-sub">On desktop the sheet becomes the right panel (see the Lisbon desktop example above). The backdrop remnant — top bar, user bubble and model line only, no AI body — matches the verified mobile composition.</p>
          </div>
        </div>
      </Section>

      <Section id="suspended" title="Suspended panel (light)">
        <div className="max-w-[560px] overflow-hidden rounded-card border border-light-divider">
          <SuspendedPanel title="Your account is suspended" body="We suspended this account for breaking the usage policy: repeated requests for prohibited content." suspendedUntil="Suspended until Nov 2, 2026." subscriptionNote="Your Pro subscription is still active in Google Play. You can cancel it there." manageLabel="Manage subscription" stillLabel="You can still:" stillRows={d.suspendedRows} primaryLabel="Appeal" secondaryLabel="Contact support" />
        </div>
      </Section>

      <Section id="language" title="Language panel (light)">
        <div className="max-w-[560px] rounded-card border border-light-divider bg-light-bg py-3">
          <LanguagePanel title="App language" rows={d.languageRows} footnote="Answers follow the language you write in." />
        </div>
      </Section>

      <Section id="phone-chrome" title="Phone chrome — iOS status bar + home indicator" note="Spec-exact redraw (ios-frame.jsx Figma spec, scaled 390/402 from the 402pt frame). Frames are 390 CSS wide; bodies are empty on purpose so the chrome itself is the subject. Dark frames use the set dark token #111518, the light frame the light bg; the island frame adds a Dynamic Island.">
        <div className="grid items-start gap-6 lg:grid-cols-3">
          <div className="chrome-dark flex min-h-[220px] w-full max-w-[390px] flex-col overflow-hidden rounded-card border border-light-divider bg-dark-bg">
            <IOSStatusBar dark time="10:24" width={390} />
            <div className="flex-1" />
            <HomeIndicator dark width={390} />
          </div>
          <div className="chrome-light flex min-h-[220px] w-full max-w-[390px] flex-col overflow-hidden rounded-card border border-light-divider bg-light-bg">
            <IOSStatusBar dark={false} time="10:24" width={390} />
            <div className="flex-1" />
            <HomeIndicator dark={false} width={390} />
          </div>
          <div className="chrome-island flex min-h-[220px] w-full max-w-[390px] flex-col overflow-hidden rounded-card border border-light-divider bg-dark-bg">
            <IOSStatusBar dark time="10:24" width={390} island />
            <div className="flex-1" />
            <HomeIndicator dark width={390} />
          </div>
        </div>
        <p className="mt-3 max-w-[720px] text-[13px] leading-[1.55] text-light-sub">
          Geometry: bar flex gap 154, padding 21/24/19, time 17pt weight 590 line-height 22, right-cluster gap 7, signal 19×12, wifi 17×12, battery 27×13, home indicator 139×5, island 126×37 — all at the 402pt spec, scaled by 390/402 in code. Photo-9 confirms the forms and colorways; its absolute pixels do not reduce to one scale, so the spec is the geometry authority (see CHANGELOG v1.7).
        </p>
      </Section>

      <Section id="composer" title="Composer states">
        <div className="flex flex-col gap-4">
          <Composer dark placeholder="Message Claude Sonnet 5.5" />
          <Composer dark={false} placeholder="Ask anything" mic="plain" />
          <Composer dark={false} placeholder="有问题，尽管问" modelLabel="自动" sendDark stacked />
          <Composer dark={false} placeholder="有问题，尽管问" modelLabel="自动" sendDark />
          <Composer dark placeholder="有问题，尽管问" modelLabel="Sonnet 5.5" mic="stop" />
        </div>
      </Section>

      <Section id="primitives" title="UI primitives (shadcn-style, Radix-backed)">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Continue with Google</Button>
          <Button variant="dark">Buy credits</Button>
          <Button variant="outline">Change plan</Button>
        </div>
        <div className="mt-6 max-w-[420px]">
          <div className="mb-2 text-[13px] text-light-sub">Slider (savings fills 16% / 44%)</div>
          <Slider defaultValue={[16]} max={100} />
          <div className="mt-4"><Slider defaultValue={[44]} max={100} /></div>
        </div>
        <div className="mt-6 max-w-[420px]">
          <Input placeholder="Ask anything" />
        </div>
        <div className="mt-6 max-w-[420px]">
          <Separator />
        </div>
        <div className="mt-6">
          <Tabs defaultValue="Auto">
            <TabsList>
              {["Auto", "Off", "Low", "Med", "High", "Max"].map((s) => (
                <TabsTrigger key={s} value={s}>{s}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </Section>
    </div>
  );
}
