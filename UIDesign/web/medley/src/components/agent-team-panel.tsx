import { cn } from "../lib/utils";
import { tokens } from "../tokens";

export type AgentStatus = "Running" | "Done" | "Queued";
export type AgentRowData = { role: string; model: string; task: string; status: AgentStatus; time: string };

function StatusDot({ status }: { status: AgentStatus }) {
  const bg = status === "Running" ? "#3FA34D" : status === "Done" ? tokens.colors.darkText : tokens.colors.darkSub;
  return (
    <span className="inline-flex shrink-0 items-center gap-[5px] text-secondary text-dark-sub">
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: bg }} />
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
        <StatusDot status={row.status} />
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
      <h1 className="text-[17px] font-bold leading-[1.3] my-0.5 mb-2.5">
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
            className="flex h-12 flex-1 items-center justify-center rounded-button border border-dark-divider text-list-item font-semibold"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
