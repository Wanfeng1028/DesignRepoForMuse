// codegen: hand-written
import { Phone } from "../components/Phone";
import { TopBar, Icon } from "../components/chrome";
import { tokens } from "../tokens";

const C = tokens.colors;

export const meta = { id: "agent-team-dark", title: "Agent team task (dark)", source: "ov_r2_c4" };

function Status({ label }: { label: string }) {
  const running = label === "Running";
  const done = label === "Done";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: C.darkSub, flexShrink: 0 }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: running ? "#3FA34D" : done ? C.darkText : C.darkSub,
        }}
      />
      {label}
    </span>
  );
}

function AgentRow({ role, model, task, status }: { role: string; model: string; task: string; status: string }) {
  return (
    <div style={{ background: C.darkCard, borderRadius: tokens.radius.card, padding: "13px 16px", marginTop: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: 14 }}>
          <span style={{ fontWeight: 700 }}>{role}</span>
          <span style={{ color: C.darkSub }}> · {model}</span>
        </span>
        <Status label={status} />
      </div>
      <div style={{ fontSize: 14, color: C.darkSub, marginTop: 6 }}>{task}</div>
    </div>
  );
}

export default function AgentTeamDark() {
  return (
    <Phone theme="dark">
      <TopBar dark left={Icon.back(C.darkText)} right={Icon.more(C.darkText)} />
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "0 20px" }}>
        <h1 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, margin: "2px 0 10px 0" }}>
          Compare the pricing of 12 note‑taking<br />apps
        </h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: C.darkSub }}>
          <span>Team, 6 agents</span>
          <span>Auto review</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.darkSub, marginTop: 16 }}>
          <span>1,240 of 6,000 credits</span>
          <span>Step 3 of 5</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: C.darkDivider, marginTop: 8 }}>
          <div style={{ width: "21%", height: "100%", borderRadius: 2, background: C.darkText }} />
        </div>
        <div style={{ background: C.darkCard, borderRadius: tokens.radius.card, padding: "12px 16px", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 14 }}>
              <span style={{ fontWeight: 700 }}>Lead</span>
              <span style={{ color: C.darkSub }}> · Claude Sonnet 5.5</span>
            </span>
            <Status label="Running" />
          </div>
          <div style={{ fontSize: 14, color: C.darkSub, marginTop: 6 }}>Merging results from 4 agents</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, marginTop: 20 }}>Agents</div>
        <AgentRow role="Researcher" model="DeepSeek V4 Pro" task="Reading notion.com/pricing" status="Running" />
        <AgentRow role="Researcher" model="DeepSeek V4 Pro" task="Searching 'Obsidian Sync price'" status="Running" />
        <AgentRow role="Researcher" model="DeepSeek V4 Pro" task="Done: 2 plans found" status="Done" />
        <AgentRow role="Analyst" model="GPT-6.1 Sol" task="Running code to build the table" status="Running" />
        <AgentRow role="Reviewer" model="GPT-6.1 Sol" task="Waiting for a free slot" status="Queued" />
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <span
            style={{
              flex: 1,
              height: 48,
              borderRadius: tokens.radius.button,
              border: `1px solid ${C.darkDivider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Pause all
          </span>
          <span
            style={{
              flex: 1,
              height: 48,
              borderRadius: tokens.radius.button,
              border: `1px solid ${C.darkDivider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Stop all
          </span>
        </div>
        <div style={{ height: 12 }} />
      </div>
      <div style={{ padding: "0 16px 0 16px", flexShrink: 0 }}>
        <div
          style={{
            height: 52,
            borderRadius: tokens.radius.input,
            background: C.darkInput,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 8px 0 14px",
          }}
        >
          <span style={{ display: "flex", color: C.darkSub }}>{Icon.plus(C.darkSub)}</span>
          <span style={{ flex: 1, fontSize: 15, color: C.darkDim }}>Add an instruction</span>
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {Icon.send("#111214")}
          </span>
        </div>
      </div>
    </Phone>
  );
}
