// codegen: moonshotai/kimi-k3 --temperature 1 (draft reviewed: missing TopBar dark prop added)
import { Phone } from "../components/Phone";
import { TopBar, Icon } from "../components/chrome";
import { tokens } from "../tokens";

export const meta = { id: "credits-light", title: "Credits (light)", source: "det_r0_c4" };

const bars = [18, 24, 20, 32, 28, 40, 36, 48, 44, 58, 52, 64, 60, 72, 68, 80, 76, 88, 84, 96];

const legend = [
  { label: "Claude", color: "#E4754A" },
  { label: "GLM", color: "#4A7DE4" },
  { label: "Kimi", color: "#9B5DE5" },
  { label: "DeepSeek", color: "#2EB5A5" },
];

const models = [
  { name: "Claude Sonnet 5.5", sub: "480 messages", amount: "38,400", pct: "54%" },
  { name: "GLM-5", sub: "590 messages", amount: "18,300", pct: "26%" },
  { name: "Kimi K3", sub: "60 messages", amount: "7,200", pct: "10%" },
  { name: "DeepSeek V4.1 Flash", sub: "420 messages", amount: "4,620", pct: "6%" },
];

export default function CreditsLight() {
  const c = tokens.colors;
  return (
    <Phone theme="light">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: c.lightBg }}>
        <TopBar
          dark={false}
          left={
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {Icon.back(c.lightText)}
              <span style={{ fontSize: tokens.font.pageTitle, fontWeight: 700, color: c.lightText }}>Credits</span>
            </span>
          }
          right={Icon.info(c.lightText)}
        />
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: `4px ${tokens.spacing.pagePadding}px 20px` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: tokens.font.hugeNumber, fontWeight: 700, color: c.lightText, lineHeight: 1 }}>
              12,480
            </span>
            <span style={{ fontSize: tokens.font.body, color: c.lightSub }}>credits</span>
          </div>
          <div style={{ marginTop: 8, fontSize: tokens.font.secondary, color: c.lightSub, lineHeight: "18px" }}>
            About 270 messages at your usual mix
          </div>
          <div style={{ marginTop: 2, fontSize: tokens.font.secondary, color: c.lightSub, lineHeight: "18px" }}>
            Pro plan, 80,000 credits a month. Renews Nov 15.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              style={{
                height: 48,
                borderRadius: tokens.radius.button,
                padding: "0 20px",
                background: c.blackBtn,
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              Buy credits
            </button>
            <button
              style={{
                height: 48,
                borderRadius: tokens.radius.button,
                padding: "0 20px",
                background: "transparent",
                color: c.lightText,
                fontSize: 15,
                fontWeight: 700,
                border: `1px solid ${c.lightDivider}`,
                cursor: "pointer",
              }}
            >
              Change plan
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: c.lightText }}>Last 30 days</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: c.lightText }}>71,720 credits</span>
          </div>

          <div style={{ display: "flex", marginTop: 8 }}>
            <div style={{ marginLeft: "60%", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 1, height: 10, background: c.lightDim, display: "inline-block" }} />
              <span style={{ fontSize: 11, color: c.lightDim }}>Oct 15, upgraded to Pro</span>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "60%", top: 0, bottom: 0, borderLeft: `1px dashed ${c.lightDim}`, zIndex: 1 }} />
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 110, marginTop: 4 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, height: h, display: "flex", flexDirection: "column-reverse" }}>
                  <div style={{ height: Math.round(h * 0.55), background: c.chartAmber }} />
                  <div style={{ height: Math.round(h * 0.3), background: "#C65D7B" }} />
                  <div style={{ height: Math.max(2, Math.round(h * 0.15)), background: "#5B8A99", borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: tokens.font.caption, color: c.lightSub }}>Sep 28</span>
            <span style={{ fontSize: tokens.font.caption, color: c.lightSub }}>Oct 25</span>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            {legend.map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
                <span style={{ fontSize: tokens.font.secondary, color: c.lightSub }}>{l.label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, fontSize: tokens.font.sectionTitle, fontWeight: 700, color: c.lightText }}>
            By model
          </div>
          <div>
            {models.map((m, i) => (
              <div
                key={m.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < models.length - 1 ? `1px solid ${c.lightDivider}` : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: c.lightText }}>{m.name}</div>
                  <div style={{ fontSize: tokens.font.secondary, color: c.lightSub, marginTop: 2 }}>{m.sub}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.lightText }}>{m.amount}</div>
                  <div style={{ fontSize: tokens.font.secondary, color: c.lightSub, marginTop: 2 }}>{m.pct}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, fontSize: tokens.font.sectionTitle, fontWeight: 700, color: c.lightText }}>
            Activity
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: c.lightText }}>Lisbon on a budget</div>
              <div style={{ fontSize: tokens.font.secondary, color: c.lightSub, marginTop: 2 }}>
                Today, 10:21, Claude Sonnet 5.5
              </div>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: c.lightText }}>84</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}
