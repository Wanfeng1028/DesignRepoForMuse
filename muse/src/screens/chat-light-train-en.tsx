// codegen: spark-x2.6 (adapted: fixed Icon/UserBubble/tokens APIs, moved InputBar out of scroll area)
import { Phone } from "../components/Phone";
import { TopBar, ModelPill, UserBubble, AiMeta, ActionRow, InputBar, Icon } from "../components/chrome";
import { tokens } from "../tokens";

const C = tokens.colors;

export const meta = { id: "chat-light-train-en", title: "Train vs plane chat (light)", source: "ov_r0_c3" };

const rows: Array<[string, string, string]> = [
  ["Door to door", "About 7h", "About 4h 30m"],
  ["Typical fare", "€45–140", "€30–160"],
  ["Bags", "2 included", "Often extra"],
  ["Arrives at", "Barcelona Sants", "El Prat airport"],
];

const suggestions = ["Find trains for next Friday", "Is there a night train?", "Add a stop in Montpellier"];

export default function ChatLightTrainEn() {
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
        <UserBubble dark={false}>Paris to Barcelona: train or plane?</UserBubble>
        <AiMeta dark={false} model="DeepSeek V4 Pro · Auto" sub="Searched 9 sites, read 4 pages, thought for 6s" />
        <p style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 700, lineHeight: 1.55 }}>
          Take the train unless the flight is much cheaper.
        </p>
        <p style={{ margin: "0 0 16px 0", fontSize: 16, lineHeight: 1.55 }}>
          Once airport time is counted, flying saves only about 2.5 hours, and the train drops you in the city
          center.
        </p>
        <div style={{ borderTop: `1px solid ${C.lightDivider}` }}>
          <div style={{ display: "flex", borderBottom: `1px solid ${C.lightDivider}` }}>
            <div style={{ flex: "0 0 100px", padding: "10px 0" }} />
            <div style={{ flex: 1, padding: "10px 0", fontSize: 14, fontWeight: 600 }}>Train</div>
            <div style={{ flex: 1, padding: "10px 0", fontSize: 14, fontWeight: 600 }}>Plane</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r[0]}
              style={{
                display: "flex",
                borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.lightDivider}`,
              }}
            >
              <div style={{ flex: "0 0 100px", padding: "10px 0", fontSize: 14, color: C.lightSub, lineHeight: 1.45 }}>{r[0]}</div>
              <div style={{ flex: 1, padding: "10px 0", fontSize: 14, lineHeight: 1.45 }}>{r[1]}</div>
              <div style={{ flex: 1, padding: "10px 0", fontSize: 14, lineHeight: 1.45 }}>{r[2]}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: C.lightSub, marginTop: 12 }}>4 sources</div>
        <ActionRow dark={false} credits="41 credits" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
          {suggestions.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 0",
              }}
            >
              <span style={{ color: C.lightSub, marginRight: 10 }}>+</span>
              <span style={{ fontSize: 15, fontWeight: 500, textAlign: "left" }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 8 }} />
      </div>
      <InputBar dark={false} placeholder="Ask anything" mic="plain" />
    </Phone>
  );
}
