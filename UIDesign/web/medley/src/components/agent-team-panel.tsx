import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { Composer } from "./composer";

export type AgentStatus = "Running" | "Done" | "Queued";
export type AgentRowData = { role: string; model: string; task: string; status: AgentStatus; time: string };

/**
 * v1.3 I1/I2/I3 (ov-agent 2x zoom): Running = white dot; Done = check-in-
 * circle icon (Lucide circle-check); Queued = clock-in-circle icon.
 */
function StatusDot({ status }: { status: AgentStatus }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-[5px] text-secondary text-dark-sub">
      {status === "Running" ? (
        <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#F5F5F7" }} />
      ) : status === "Done" ? (
        Icon.checkCircle("#9A9BA2", 16)
      ) : (
        Icon.clock("#9A9BA2", 16)
      )}
      {status}
    </span>
  );
}

function AgentCard({ row, lead = false }: { row: AgentRowData; lead?: boolean }) {
  return (
    <div className={cn("rounded-card bg-dark-card px-4 py-3", lead ? "mt-4" : "mt-2.5")}>
      <div className="flex items-center justify-between gap-2.5">
        <span className="text-[14px]">
          <span className="font-bold">{row.role}</span>
          <span className="text-dark-sub"> · {row.model}</span>
        </span>
        {/* v1.3 sweep: every agent card carries a "..." menu after the status. */}
        <span className="flex items-center gap-2">
          <StatusDot status={row.status} />
          {Icon.more("#9A9BA2", 16)}
        </span>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2.5">
        <div className="text-[14px] text-dark-sub">{row.task}</div>
        <span className="shrink-0 text-secondary text-dark-sub">{row.time}</span>
      </div>
    </div>
  );
}

/**
 * Dark agent-team panel. Order matters (DESIGN-TOKENS.md sec. 8 close-out):
 * title, meta line, progress bar ABOVE the credits line, then the Lead card,
 * then the Agents list. Progress is the measured 20% (1240/6000 = 20.7%).
 * Times are the verified 31s / 9s / 7s / 6s / 21s / 8s (Reviewer "s" inferred).
 */
export function AgentTeamPanel({
  titleLines,
  meta,
  creditsLine,
  stepLine,
  progressPct = "20%",
  lead,
  agents,
}: {
  titleLines: [string, string];
  meta: string[];
  creditsLine: string;
  stepLine: string;
  progressPct?: string;
  lead: AgentRowData;
  agents: AgentRowData[];
}) {
  return (
    <div className="bg-dark-bg text-dark-text">
      {/* v1.3 S3: back top-left + "..." top-right. */}
      <div className="mb-1 flex items-center justify-between">
        {Icon.back("#F5F5F7")}
        {Icon.more("#9A9BA2")}
      </div>
      <h1 className="text-[19px] font-bold leading-[1.3] my-0.5 mb-2.5">
        {titleLines[0]}
        <br />
        {titleLines[1]}
      </h1>
      <div className="flex gap-4 text-secondary text-dark-sub">
        {meta.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <div className="mt-4 h-1 rounded-full bg-dark-divider">
        <div className="h-full rounded-full bg-dark-text" style={{ width: progressPct }} />
      </div>
      <div className="mt-2 flex justify-between text-secondary text-dark-sub">
        <span>{creditsLine}</span>
        <span>{stepLine}</span>
      </div>
      <AgentCard row={lead} lead />
      <div className="text-list-item font-bold mt-5">Agents</div>
      {agents.map((a) => (
        <AgentCard key={`${a.role}-${a.task}`} row={a} />
      ))}
      <div className="mt-4 flex gap-3">
        {["Pause all", "Stop all"].map((label) => (
          <span
            key={label}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-button border border-dark-divider text-list-item font-semibold"
          >
            {/* v1.3 S11: Lucide pause (double bar) / square icons. */}
            {label === "Pause all" ? Icon.pause("#F5F5F7", 16) : Icon.square("#F5F5F7", 16)}
            {label}
          </span>
        ))}
      </div>
      {/* v1.3 S1: "Add an instruction" composer — white-circle dark-arrow
          send button, no plus (ov-agent bottom). */}
      <div className="mt-4">
        <Composer dark placeholder="Add an instruction" mic="arrow" hidePlus />
      </div>
    </div>
  );
}
