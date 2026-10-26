// codegen: moonshotai/kimi-k3 (draft reviewed and repaired: Icon call syntax, SuggestionRow text prop, font token misuse)
import { Phone } from "../components/Phone";
import { TopBar, ModelPill, InputBar, SuggestionRow, Icon } from "../components/chrome";
import { tokens } from "../tokens";

export const meta = { id: "home-light-en", title: "Home (light, EN)", source: "det_r0_c1" };

export default function HomeLightEn() {
  const c = tokens.colors;
  return (
    <Phone theme="light">
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          background: c.lightBg,
        }}
      >
        <TopBar
          dark={false}
          left={Icon.menu(c.lightText)}
          center={<ModelPill dark={false} label="Auto" />}
          right={Icon.clock(c.lightText)}
        />

        <div style={{ flex: 1, minHeight: 0 }} />

        <div style={{ padding: `0 ${tokens.spacing.pagePadding}px` }}>
          <div
            style={{
              fontSize: tokens.font.greeting,
              fontWeight: 700,
              lineHeight: 1.25,
              color: c.lightText,
              marginBottom: 18,
            }}
          >
            Good evening, Alex
          </div>

          <div style={{ borderTop: `1px solid ${c.lightDivider}` }}>
            <SuggestionRow dark={false} icon={Icon.news(c.lightSub)} text="What's in the news today" />
            <SuggestionRow dark={false} icon={Icon.pdf(c.lightSub)} text="Summarize a PDF" />
            <SuggestionRow dark={false} icon={Icon.image(c.lightSub)} text="Create an image" />
            <SuggestionRow dark={false} icon={Icon.cards(c.lightSub)} text="Make flashcards from my notes" />
          </div>
        </div>

        <div style={{ height: 12 }} />

        <InputBar dark={false} placeholder="Ask anything" mic="plain" />
      </div>
    </Phone>
  );
}
