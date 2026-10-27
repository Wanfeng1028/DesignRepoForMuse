// codegen: hand-written
import { Phone } from "../components/Phone";
import { TopBar, ModelPill, UserBubble, AiMeta, InputBar, Icon } from "../components/chrome";
import { tokens } from "../tokens";

const C = tokens.colors;

export const meta = { id: "chat-light-savings-en", title: "Savings calculator chat (light)", source: "ov_r0_c4" };

function SliderRow({ label, value, fill }: { label: string; value: string; fill: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: C.lightSub }}>
        <span>{label}</span>
        <span style={{ fontWeight: 700, color: C.lightText, fontSize: 15 }}>{value}</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: C.lightDivider, marginTop: 10, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fill, borderRadius: 2, background: C.lightText }} />
        <div
          style={{
            position: "absolute",
            left: fill,
            top: "50%",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "1px solid #D8D9DC",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}

export default function ChatLightSavingsEn() {
  return (
    <Phone theme="light">
      <TopBar
        dark={false}
        left={Icon.menu(C.lightText)}
        center={<ModelPill dark={false} label="Auto" />}
        right={
          <>
            {Icon.clock(C.lightText)}
            {Icon.edit(C.lightText)}
          </>
        }
      />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 20px" }}>
        <UserBubble dark={false}>$200 a month at 6% for 15 years?</UserBubble>
        <AiMeta dark={false} model="GPT-6.1 Sol · Auto" sub="Thought for 3s" />
        <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.55, margin: "0 0 14px 0" }}>
          About $58,160. You put in $36,000 and the rest is growth. Try other amounts below.
        </p>
        <div
          style={{
            background: C.lightCard,
            borderRadius: tokens.radius.card,
            padding: "16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700 }}>Savings growth</div>
          <SliderRow label="Monthly saving" value="$200" fill="16%" />
          <SliderRow label="Yearly return" value="6%" fill="44%" />
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: C.lightSub }}>Years</span>
            <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 18, color: C.lightSub }}>–</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>15</span>
              <span style={{ fontSize: 18, color: C.lightSub }}>+</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 18, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.1 }}>$58,164</div>
              <div style={{ fontSize: 12, color: C.lightSub, marginTop: 2 }}>Final balance</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>$36,000</div>
              <div style={{ fontSize: 12, color: C.lightSub }}>Put in</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8 }}>$22,164</div>
              <div style={{ fontSize: 12, color: C.lightSub }}>Growth</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 118,
                fontSize: 11,
                color: C.lightDim,
                paddingBottom: 14,
              }}
            >
              <span>60K</span>
              <span>40K</span>
              <span>20K</span>
              <span>0</span>
            </div>
            <div style={{ flex: 1 }}>
              <svg width="100%" height="118" viewBox="0 0 280 118" preserveAspectRatio="none">
                <line x1="0" y1="10" x2="280" y2="10" stroke={C.lightDivider} strokeWidth="1" />
                <line x1="0" y1="44" x2="280" y2="44" stroke={C.lightDivider} strokeWidth="1" />
                <line x1="0" y1="78" x2="280" y2="78" stroke={C.lightDivider} strokeWidth="1" />
                <line x1="0" y1="104" x2="280" y2="104" stroke={C.lightDivider} strokeWidth="1" />
                <path
                  d="M0 104 L9.3 102.1 L18.5 100.1 L27.8 98.1 L37.1 96 L46.3 93.9 L55.6 91.7 L64.9 89.4 L74.1 87 L83.4 84.6 L92.7 82.1 L101.9 79.6 L111.2 76.9 L120.5 74.2 L129.7 71.4 L139 68.5 L148.3 65.5 L157.5 62.4 L166.8 59.3 L176.1 56 L185.3 52.7 L194.6 49.2 L203.9 45.6 L213.1 41.9 L222.4 38.2 L231.7 34.2 L240.9 30.2 L250.2 26.1 L259.5 21.8 L268.7 17.4 L278 12.9"
                  fill="none"
                  stroke={C.lightText}
                  strokeWidth="1.5"
                />
                <path d="M0 104 L 278 47.6" fill="none" stroke={C.lightDim} strokeWidth="1.5" strokeDasharray="5 4" />
                <text x="222" y="14" fontSize="11" fill={C.lightText} fontWeight="600">Balance</text>
                <text x="228" y="56" fontSize="11" fill={C.lightDim}>Put in</text>
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.lightDim }}>
                <span>Now</span>
                <span>5 yr</span>
                <span>10 yr</span>
                <span>15 yr</span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 14,
              paddingTop: 12,
              borderTop: `1px solid ${C.lightDivider}`,
              fontSize: 12,
              color: C.lightSub,
            }}
          >
            <span>Calculated in Medley</span>
            <span style={{ fontWeight: 600 }}>Formula ▾</span>
          </div>
        </div>
      </div>
      <InputBar dark={false} placeholder="Ask anything" mic="plain" />
    </Phone>
  );
}
