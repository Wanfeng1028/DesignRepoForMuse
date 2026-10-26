// codegen: hand-written
import { Phone } from "../components/Phone";
import { Icon, ModelDots } from "../components/chrome";
import { tokens } from "../tokens";

const C = tokens.colors;

export const meta = { id: "pricing-dark", title: "Pricing (dark)", source: "det_r0_c3" };

function Radio({ selected }: { selected?: boolean }) {
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: `2px solid ${selected ? C.darkText : C.darkSub}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {selected && <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.darkText }} />}
    </span>
  );
}

function PlanRow({
  name,
  monthly,
  yearly,
  selected,
  badge,
  children,
}: {
  name: string;
  monthly: string;
  yearly: string;
  selected?: boolean;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: C.darkCard,
        border: "1px solid transparent",
        borderRadius: tokens.radius.card,
        padding: "14px 16px",
        marginTop: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Radio selected={selected} />
        <span style={{ fontSize: 16, fontWeight: 700 }}>{name}</span>
        {badge && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              background: C.darkText,
              color: C.lightText,
              borderRadius: 12,
              padding: "3px 8px",
            }}
          >
            {badge}
          </span>
        )}
        <span style={{ marginLeft: "auto", textAlign: "right" }}>
          <span style={{ display: "block", fontSize: 16, fontWeight: 700 }}>{monthly}</span>
          <span style={{ display: "block", fontSize: 12, color: C.darkSub, marginTop: 2 }}>{yearly}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

export default function PricingDark() {
  return (
    <Phone theme="dark">
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "4px 20px 0 20px" }}>
        <div style={{ margin: "4px 0 14px 0" }}>{Icon.close(C.darkText)}</div>
        <ModelDots size={10} />
        <h1 style={{ fontSize: 27, fontWeight: 700, lineHeight: 1.25, margin: "8px 0 6px 0" }}>
          Every top AI in one app
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.5, color: C.darkSub, margin: "0 0 12px 0" }}>
          Credits are based on each provider&apos;s official API price, and every answer shows what it used.
        </p>
        <div
          style={{
            display: "flex",
            background: C.darkInput,
            borderRadius: tokens.radius.button,
            padding: 4,
          }}
        >
          <span
            style={{
              flex: 1,
              textAlign: "center",
              padding: "9px 0",
              fontSize: 14,
              fontWeight: 600,
              color: C.darkSub,
            }}
          >
            Monthly
          </span>
          <span
            style={{
              flex: 1,
              textAlign: "center",
              padding: "9px 0",
              fontSize: 14,
              fontWeight: 700,
              color: C.lightText,
              background: C.darkText,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            Yearly
            <span style={{ fontSize: 11, fontWeight: 700, background: C.accent, color: "#FFFFFF", borderRadius: 10, padding: "2px 7px" }}>
              Save 20%
            </span>
          </span>
        </div>
        <PlanRow name="Lite" monthly="$4.00/mo" yearly="$47.99 a year" />
        <PlanRow name="Pro" monthly="$16.00/mo" yearly="$191.99 a year" selected badge="7 days free">
          <p style={{ fontSize: 13, lineHeight: 1.5, color: C.darkSub, margin: "12px 0 0 30px" }}>
            80,000 credits a month, about 1,000 Claude Sonnet messages.
          </p>
          {[
            "Claude Sonnet and Opus, GPT-5.1, GLM-5, Kimi K3",
            "Image generation and deep research",
            "30 agent tasks a month, 3 scheduled",
          ].map((line) => (
            <div key={line} style={{ display: "flex", gap: 8, margin: "8px 0 0 30px", fontSize: 13, lineHeight: 1.45 }}>
              <span style={{ flexShrink: 0 }}>{Icon.check(C.darkText, 16)}</span>
              <span>{line}</span>
            </div>
          ))}
          <div style={{ margin: "10px 0 0 30px" }}>
            <ModelDots size={8} />
          </div>
        </PlanRow>
        <PlanRow name="Pro+" monthly="$56.00/mo" yearly="$671.99 a year" />
        <div
          style={{
            height: 52,
            borderRadius: tokens.radius.button,
            background: C.whiteBtn,
            color: C.lightText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            marginTop: 16,
          }}
        >
          Start 7-day free trial
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.5, color: C.darkSub, margin: "14px 0 0 0" }}>
          Free for 7 days, then $191.99 a year. Cancel anytime in Google Play before the trial ends and you
          won&apos;t be charged. No ads on any plan, no weekly plans.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            fontSize: 13,
            color: C.darkSub,
            marginTop: 14,
            paddingBottom: 8,
          }}
        >
          <span>Restore purchases</span>
          <span>|</span>
          <span>Terms</span>
          <span>|</span>
          <span>Privacy</span>
        </div>
      </div>
    </Phone>
  );
}
