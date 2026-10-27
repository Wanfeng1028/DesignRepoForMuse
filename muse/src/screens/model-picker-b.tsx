// codegen: spark-x2.6 draft, hand-adapted to shared chrome/tokens API
// NOTE: the section heading(s) for GPT-6.1 Sol / Kimi K3 / Claude Opus 5.5 are
// blurred in the source overview image (ov_r2_c0) and are NOT confirmed, so no
// section title is invented for those three rows below.
import type { ReactNode } from "react";
import { Phone } from "../components/Phone";
import { tokens } from "../tokens";
import { Icon, ModelDots } from "../components/chrome";

export const meta = { id: "model-picker-b", title: "Choose a model B + Thinking (dark)", source: "ov_r2_c0" };

const C = tokens.colors;

function Dot({ color }: { color: string }) {
  return <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

function ModelRow({
  name, desc, dot, last, right,
}: {
  name: string; desc: string; dot: string; last?: boolean; right: ReactNode;
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
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );
}

function Cost({ value }: { value: string }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: tokens.font.listItem, fontWeight: 700, color: C.darkText }}>{value}</div>
      <div style={{ fontSize: 11, color: C.darkSub }}>credits</div>
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

const segments = ["Auto", "Off", "Low", "Med", "High", "Max"];

// NOTE (detail close-out 2026-10-27): the original shows a tiny sub-text under
// each Thinking segment, but at ~3px glyph height in the only source (overview
// 154px phone) it is below reliable reading resolution: 8x/10x Lanczos crops,
// per-pixel glyph bitmap analysis, and two k3free vision passes all failed to
// converge on values, so no multiplier is rendered rather than inventing one.
// See DESIGN-TOKENS.md section 9 for the full methods-tried list.

export default function ModelPickerB() {
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
          <Section title="Advanced" desc="Better at writing and reasoning.">
            <ModelRow name="GLM-5" desc="Long documents and writing" dot="#4A7DE4" last right={<Cost value="-31" />} />
          </Section>
          <Section title="Flagship" desc="Strong all-rounders for serious work.">
            <ModelRow
              name="Claude Sonnet 5.5"
              desc="Writing and coding"
              dot={C.accent}
              last
              right={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Cost value="-80" />
                  {Icon.check(C.darkText)}
                </div>
              }
            />
          </Section>
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ fontSize: tokens.font.listItem, fontWeight: 700, color: C.darkText }}>Thinking</div>
            <div
              style={{
                marginTop: 10, background: C.darkCard, borderRadius: tokens.radius.card, padding: 4,
                display: "flex",
              }}
            >
              {segments.map((s) => (
                <span
                  key={s}
                  style={{
                    flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 12, fontSize: tokens.font.secondary,
                    fontWeight: s === "Auto" ? 700 : 400,
                    background: s === "Auto" ? C.whiteBtn : "transparent",
                    color: s === "Auto" ? C.blackBtn : C.darkSub,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div style={{ fontSize: tokens.font.secondary, color: C.darkSub, marginTop: 8 }}>
              Auto picks the ideal for each message.
            </div>
          </div>
          <div style={{ padding: "8px 20px 0" }}>
            <ModelRow name="GPT-6.1 Sol" desc="Advanced reasoning" dot="#3FA34D" right={<Cost value="-80" />} />
            <ModelRow
              name="Kimi K3"
              desc="Very long documents"
              dot="#9B5DE5"
              right={
                <div style={{ width: 110, fontSize: tokens.font.caption, lineHeight: 1.4, color: C.darkDim, textAlign: "right" }}>
                  Not available in this chat
                </div>
              }
            />
            <ModelRow name="Claude Opus 5.5" desc="Deep, careful work" dot={C.accent} last right={<Cost value="-160" />} />
          </div>
        </div>
      </div>
    </Phone>
  );
}
