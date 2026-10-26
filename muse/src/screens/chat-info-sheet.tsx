// codegen: moonshotai/kimi-k3 (draft reviewed and repaired: "the model 5.5" restored to "Claude Sonnet 5.5", invalid ModelDots color prop replaced, missing TopBar dark prop added, sheet made scrollable)
import { Phone } from "../components/Phone";
import { TopBar, Icon, UserBubble, ModelDots } from "../components/chrome";
import { tokens } from "../tokens";

export const meta = { id: "chat-info-sheet", title: "Chat info sheet (light)", source: "ov_r1_c2" };

function Dot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        background: color,
        display: "inline-block",
        flex: "0 0 auto",
      }}
    />
  );
}

export default function ChatInfoSheet() {
  const c = tokens.colors;
  const f = tokens.font;

  const stat = (value: string, label: string) => (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: f.greeting, fontWeight: 700, color: c.lightText, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: f.secondary, color: c.lightSub, marginTop: 3 }}>{label}</div>
    </div>
  );

  const toolRow = (name: string, right: string) => (
    <div
      style={{
        padding: "7px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: f.listItem,
        color: c.lightText,
      }}
    >
      <span>{name}</span>
      <span style={{ fontSize: f.secondary, color: c.lightSub }}>{right}</span>
    </div>
  );

  const cell = (label: string, value: string) => (
    <div>
      <div style={{ fontSize: f.caption, color: c.lightSub }}>{label}</div>
      <div style={{ fontSize: f.listItem, fontWeight: 700, color: c.lightText, marginTop: 2 }}>{value}</div>
    </div>
  );

  const replyRow = (color: string, name: string, right: string) => (
    <div
      style={{
        padding: "9px 0",
        borderTop: `1px solid ${c.lightDivider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: c.lightText }}>
        <Dot color={color} />
        {name}
      </span>
      <span style={{ fontSize: f.secondary, color: c.lightSub }}>{right}</span>
    </div>
  );

  return (
    <Phone theme="light">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: c.lightBg }}>
        <div
          style={{
            height: 150,
            flex: "0 0 auto",
            opacity: 0.45,
            background: c.lightBg,
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TopBar
            dark={false}
            left={Icon.menu(c.lightSub)}
            center={
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: tokens.radius.card,
                  background: c.lightCard,
                  fontSize: 14,
                  fontWeight: 700,
                  color: c.lightText,
                }}
              >
                <ModelDots />
                Auto
                {Icon.chevronDown(c.lightSub, 14)}
              </span>
            }
            right={
              <span style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
                {Icon.clock(c.lightSub)}
                {Icon.edit(c.lightSub)}
              </span>
            }
          />
          <div style={{ marginTop: 6 }}>
            <UserBubble dark={false}>Turn this into a 3-day plan with costs.</UserBubble>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <ModelDots />
            <span style={{ fontSize: 14, fontWeight: 700, color: c.lightText }}>Claude Sonnet 5.5 · Auto</span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            background: "#FFFFFF",
            borderTopLeftRadius: tokens.radius.sheet,
            borderTopRightRadius: tokens.radius.sheet,
            padding: "20px 20px 8px",
            boxShadow: "0 -12px 32px rgba(23,24,28,0.10)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: "#D8D9DD" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
            <span style={{ fontSize: f.pageTitle, fontWeight: 700, color: c.lightText }}>Chat info</span>
            {Icon.close(c.lightText)}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {stat("210", "Credits used")}
            {stat("9", "Tool calls")}
            {stat("6", "Messages")}
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: f.secondary, fontWeight: 500, color: c.lightText }}>
              <Dot color="#4A7DE4" />
              GLM-5
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: f.secondary, fontWeight: 500, color: c.lightText }}>
              <Dot color="#E4754A" />
              Claude Sonnet 5.5
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: f.secondary, fontWeight: 500, color: c.lightText }}>
              <Dot color="#2EB5A5" />
              DeepSeek V4 Pro
            </span>
          </div>

          <div style={{ fontSize: f.sectionTitle, fontWeight: 700, color: c.lightText, marginTop: 14 }}>Tools</div>
          {toolRow("Web search", "4, 1 from saved results")}
          {toolRow("Pages read", "3")}
          {toolRow("Code runs", "1")}
          {toolRow("Weather", "1")}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
            <span style={{ fontSize: f.sectionTitle, fontWeight: 700, color: c.lightText }}>Replies</span>
            <span style={{ fontSize: f.secondary, color: c.lightSub }}>Latest first</span>
          </div>

          <div style={{ background: c.lightBg, borderRadius: tokens.radius.card, padding: 12, marginTop: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: c.lightText }}>
                <Dot color="#E4754A" />
                Claude Sonnet 5.5
              </span>
              <span style={{ fontSize: f.secondary, color: c.lightSub }}>10:21</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 10 }}>
              {cell("First token", "0.8s")}
              {cell("Speed", "62 tok/s")}
              {cell("Output", "1,240")}
              {cell("Credits", "141")}
              {cell("Tool calls", "6")}
              {cell("Thinking", "Medium")}
            </div>
          </div>

          {replyRow("#4A7DE4", "GLM-5", "10:24, 28 credits, 1.1s")}
          {replyRow("#2EB5A5", "DeepSeek V4 Pro", "10:17, 41 credits, 3.5s")}

          <div style={{ fontSize: f.caption, color: c.lightSub, lineHeight: 1.45, marginTop: 6 }}>
            First token is the time from sending to the first word. Speed counts the visible answer only.
          </div>
        </div>
      </div>
    </Phone>
  );
}
