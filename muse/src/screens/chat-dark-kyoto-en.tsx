// codegen: hand-written
import { Phone } from "../components/Phone";
import { TopBar, UserBubble, AiMeta, InputBar, Icon } from "../components/chrome";
import { tokens } from "../tokens";

const C = tokens.colors;

export const meta = { id: "chat-dark-kyoto-en", title: "Kyoto itinerary chat (dark)", source: "ov_r1_c0" };

function TimelineRow({ time, place, note }: { time: string; place: string; note: string }) {
  return (
    <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
      <span style={{ width: 46, flexShrink: 0, fontSize: 13, color: C.darkSub }}>{time}</span>
      <span>
        <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{place}</span>
        <span style={{ display: "block", fontSize: 13, color: C.darkSub, marginTop: 2 }}>{note}</span>
      </span>
    </div>
  );
}

function PollOption({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: tokens.radius.chip,
        background: selected ? C.darkText : "transparent",
        border: selected ? "none" : `1px solid ${C.darkDivider}`,
        color: selected ? C.lightText : C.darkText,
        fontSize: 15,
        fontWeight: selected ? 700 : 500,
        marginTop: 10,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `2px solid ${selected ? C.lightText : C.darkSub}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {selected && <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.lightText }} />}
      </span>
      {label}
    </div>
  );
}

export default function ChatDarkKyotoEn() {
  return (
    <Phone theme="dark">
      <TopBar
        dark
        left={Icon.menu(C.darkText)}
        center={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 16, fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#9B5DE5" }} />
            Kimi K3
            {Icon.chevronDown(C.darkSub, 16)}
          </span>
        }
        right={
          <>
            {Icon.clock(C.darkText)}
            {Icon.edit(C.darkText)}
          </>
        }
      />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 20px" }}>
        <UserBubble dark>2 days in Kyoto, temples and food</UserBubble>
        <AiMeta dark model="Kimi K3" sub="Searched 4 times, checked the weather, found 12 places" />
        <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.55, margin: "0 0 14px 0" }}>
          Temples on dry Saturday, market on Sunday.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, background: "#EDEEF0", borderRadius: tokens.radius.card, padding: "10px 12px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.lightText }}>Sat, Nov 1</div>
            <div style={{ fontSize: 13, color: C.lightSub, marginTop: 4 }}>19° clear</div>
          </div>
          <div style={{ flex: 1, background: C.darkCard, borderRadius: tokens.radius.card, padding: "10px 12px" }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Sun, Nov 2</div>
            <div style={{ fontSize: 13, color: C.darkSub, marginTop: 4 }}>16° rain</div>
          </div>
        </div>
        <TimelineRow time="7:30" place="Fushimi Inari" note="Go before 8 to beat the crowds" />
        <TimelineRow time="16:30" place="Kiyomizu-dera" note="Sunset from the wooden terrace" />
        <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>{Icon.mapPin(C.darkText, 16)}Show map</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600 }}>{Icon.calendar(C.darkText, 16)}Add to calendar</span>
        </div>
        <div style={{ fontSize: 12, color: C.darkDim, marginTop: 12 }}>Weather from Google Weather, 10:24</div>
        <div style={{ background: C.darkCard, borderRadius: tokens.radius.card, padding: "12px", marginTop: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Add a day trip?</div>
          <PollOption label="Nara and the deer park" selected />
          <PollOption label="Arashiyama bamboo grove" />
          <PollOption label="No, keep it relaxed" />
        </div>
        <div style={{ height: 8 }} />
      </div>
      <InputBar dark placeholder="Ask anything" />
    </Phone>
  );
}
