// codegen: spark-x2.6 draft, hand-adapted to shared chrome/tokens API
import type { ReactNode } from "react";
import { Phone } from "../components/Phone";
import { tokens } from "../tokens";
import { Icon, ModelDots } from "../components/chrome";

export const meta = { id: "model-picker-a", title: "Choose a model A (dark)", source: "det_r0_c2" };

const C = tokens.colors;

function Dot({ color }: { color: string }) {
  return <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

function ModelRow({
  name, desc, cost, dot, badge, last,
}: {
  name: string; desc: string; cost: string; dot: string; badge?: string; last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "11px 0",
        borderBottom: last ? "none" : `1px solid ${C.darkDivider}`,
      }}
    >
      <Dot color={dot} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: tokens.font.listItem, fontWeight: 600, color: C.darkText }}>{name}</div>
        <div style={{ fontSize: tokens.font.secondary, color: C.darkSub }}>{desc}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        {badge && (
          <div style={{ marginBottom: 2 }}>
            <span
              style={{
                border: `1px solid ${C.darkDivider}`, borderRadius: tokens.radius.chip, padding: "1px 8px",
                fontSize: 11, fontWeight: 600, color: C.darkSub,
              }}
            >
              {badge}
            </span>
          </div>
        )}
        <div style={{ fontSize: tokens.font.listItem, fontWeight: 700, color: C.darkText }}>{cost}</div>
        <div style={{ fontSize: 11, color: C.darkSub }}>credits</div>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <div style={{ padding: "20px 20px 0" }}>
      <div style={{ fontSize: tokens.font.sectionTitle, fontWeight: 700, color: C.darkText }}>{title}</div>
      <div style={{ fontSize: tokens.font.secondary, color: C.darkSub, marginTop: 2 }}>{desc}</div>
      <div>{children}</div>
    </div>
  );
}

export default function ModelPickerA() {
  return (
    <Phone theme="dark">
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px 0" }}>
            <span style={{ fontSize: tokens.font.pageTitle, fontWeight: 700, color: C.darkText }}>Choose a model</span>
            <span style={{ fontSize: tokens.font.secondary, color: C.darkSub }}>How credits work</span>
          </div>
          <div
            style={{
              margin: "14px 20px 0", background: C.darkRow, borderRadius: tokens.radius.card, padding: "13px 16px",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <ModelDots />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.darkText }}>Auto</span>
                <span
                  style={{
                    border: `1px solid ${C.darkDivider}`, borderRadius: tokens.radius.chip, padding: "1px 8px",
                    fontSize: 11, color: C.darkSub,
                  }}
                >
                  Recommended
                </span>
              </div>
              <div style={{ fontSize: tokens.font.secondary, color: C.darkSub, marginTop: 3 }}>Picks a model for each message.</div>
            </div>
            {Icon.check(C.darkText)}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, paddingTop: 14 }}>
            <span style={{ fontSize: tokens.font.secondary, color: C.darkSub }}>Up to Advanced</span>
            {Icon.chevronRight(C.darkSub)}
          </div>
          <Section title="Everyday" desc="Fast and light, for everyday questions.">
            <ModelRow name="GLM-5.3 Flash" desc="Fast everyday answers" cost="-5" dot="#4A7DE4" />
            <ModelRow name="DeepSeek V4.1 Flash" desc="Quick answers, good at math and code" cost="-11" dot="#2EB5A5" last />
          </Section>
          <Section title="Advanced" desc="Better at writing and reasoning.">
            <ModelRow name="GLM-5" desc="Long documents and writing" cost="-31" dot="#4A7DE4" last />
          </Section>
          <Section title="Flagship" desc="Strong all-rounders for serious work.">
            <ModelRow name="Claude Sonnet 5.5" desc="Writing and coding" cost="-80" dot={C.accent} />
            <ModelRow name="Kimi K3" desc="Very long documents" cost="-120" dot="#9B5DE5" last />
          </Section>
          <Section title="Frontier" desc="The most capable models, for the hardest problems.">
            <ModelRow name="Claude Fable 5.1" desc="The hardest problems" cost="-400" dot={C.accent} badge="Pro" last />
          </Section>
        </div>
      </div>
    </Phone>
  );
}
