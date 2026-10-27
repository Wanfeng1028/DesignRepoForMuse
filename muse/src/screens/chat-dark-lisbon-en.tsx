// codegen: spark-x2.6 draft, hand-adapted to shared chrome/tokens API
import { Phone } from "../components/Phone";
import { tokens } from "../tokens";
import { ActionRow, AiMeta, Icon, InputBar, ModelDot, TopBar, UserBubble } from "../components/chrome";

export const meta = { id: "chat-dark-lisbon-en", title: "Lisbon chat (dark, EN)", source: "det_r0_c0" };

const C = tokens.colors;

const bullets = [
  "Ride tram 28 before 9am, while it's still quiet.",
  "Lunch at a neighborhood tasca for under €12.",
  "Sunset at Miradouro da Senhora do Monte.",
];

export default function ChatDarkLisbonEn() {
  return (
    <Phone theme="dark">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <TopBar
          dark
          left={Icon.menu(C.darkText)}
          center={<span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, fontWeight: 700, color: C.darkText }}><ModelDot model="Claude Sonnet 5.5" />Claude Sonnet 5.5</span>}
          right={Icon.edit(C.darkText)}
        />
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "4px 20px 16px" }}>
          <UserBubble dark>Plan 3 days in Lisbon on a budget. I love food and good views.</UserBubble>
          <AiMeta dark model="GLM-5 · Auto" />
          <div style={{ fontSize: tokens.font.body, lineHeight: 1.55, color: C.darkText }}>
            Here&rsquo;s a relaxed plan that keeps costs low and saves the best views for sunset.
          </div>
          <div style={{ fontSize: tokens.font.body, fontWeight: 700, lineHeight: 1.55, color: C.darkText, marginTop: 14 }}>
            Day 1: Alfama and the castle
          </div>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {bullets.map((t) => (
              <div key={t} style={{ display: "flex", gap: 8, fontSize: tokens.font.listItem, lineHeight: 1.45, color: C.darkText }}>
                <span style={{ color: C.darkSub, flexShrink: 0 }}>•</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 4, marginTop: 14, border: `1px solid ${C.darkDivider}`,
              borderRadius: tokens.radius.chip, padding: "5px 12px", fontSize: tokens.font.caption, color: C.darkSub,
            }}
          >
            {["T", "L", "V"].map((b) => (
              <span
                key={b}
                style={{
                  width: 16, height: 16, borderRadius: 4, background: C.darkRow, color: C.darkText,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, flexShrink: 0,
                }}
              >
                {b}
              </span>
            ))}
            <span style={{ marginLeft: 4 }}>3 sources</span>
          </div>
          <ActionRow dark credits="28 credits" />
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "4px 0 2px" }}>
            <div
              style={{
                border: `1px solid ${C.darkDivider}`, borderRadius: tokens.radius.chip, padding: "10px 18px",
                fontSize: tokens.font.listItem, color: C.darkText,
              }}
            >
              Make day 2 all about food.
            </div>
          </div>
          <AiMeta dark model="Claude Sonnet 5.5" />
          <div style={{ fontSize: tokens.font.body, lineHeight: 1.55, color: C.darkText }}>
            Day 2 works best as a slow eating day. Start at Time Out Market around 11am, before the lunch rush, and share a
            few small plates instead of one big meal. In the afternoon, walk up to Bairro Alto for a pastel de nata.
          </div>
        </div>
        <InputBar dark placeholder="Message Claude Sonnet 5.5" />
      </div>
    </Phone>
  );
}
