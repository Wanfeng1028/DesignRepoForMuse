import { tokens } from "../tokens";
import { Icon } from "./icons";

/**
 * v1.3 C9: per-bar segment splits (amber / pink / teal / green fractions).
 * The original stacks several colors per bar and varies them bar to bar
 * (green appears in later bars); exact per-bar splits are not separable
 * from the JPEG (audit待量19), so these fractions are a shape-faithful
 * approximation, not measured values — the fixed 55/30/15 split is gone.
 */
const BAR_SEGMENTS: [number, number, number, number][] = [
  [0.7, 0.2, 0.1, 0], [0.7, 0.2, 0.1, 0], [0.65, 0.25, 0.1, 0], [0.65, 0.2, 0.15, 0],
  [0.6, 0.25, 0.15, 0], [0.6, 0.2, 0.15, 0.05], [0.55, 0.25, 0.15, 0.05], [0.55, 0.25, 0.12, 0.08],
  [0.5, 0.3, 0.12, 0.08], [0.5, 0.28, 0.14, 0.08], [0.48, 0.3, 0.14, 0.08], [0.46, 0.3, 0.14, 0.1],
  [0.45, 0.3, 0.15, 0.1], [0.45, 0.28, 0.15, 0.12], [0.42, 0.3, 0.16, 0.12], [0.42, 0.28, 0.16, 0.14],
  [0.4, 0.3, 0.16, 0.14], [0.4, 0.3, 0.15, 0.15], [0.38, 0.3, 0.17, 0.15], [0.38, 0.28, 0.17, 0.17],
];
const BAR_COLORS = ["#8C553C", "#C65D7B", "#5B8A99", "#3FA34D"];

export type CreditBarDay = { height: number };
export type CreditModelRow = { name: string; messages: string; amount: string; pct: string };
export type CreditLegendItem = { label: string; color: string };

/**
 * Light credits panel: 37px huge balance (v1.3 F2), back + "Credits" +
 * info header (v1.3 S2), plan line, Buy/Change buttons, last-30-days
 * header, "Oct 15, upgraded to Pro" as an x-axis label only (v1.3 S14 —
 * no vertical dashed line), ~20 stacked multi-color bars with per-bar
 * varying splits (v1.3 C9), legend, By-model rows with dots (v1.3 S12)
 * and an Activity row with a dot (v1.3 S13). All figures are props.
 */
export function CreditsPanel({
  balance,
  balanceUnit,
  aboutLine,
  planLine,
  last30Label,
  last30Total,
  upgradeLabel,
  bars,
  legend,
  models,
  activity,
  dateRange,
}: {
  balance: string;
  balanceUnit: string;
  aboutLine: string;
  planLine: string;
  last30Label: string;
  last30Total: string;
  upgradeLabel: string;
  bars: number[];
  legend: CreditLegendItem[];
  models: CreditModelRow[];
  activity: { title: string; meta: string; amount: string };
  dateRange: [string, string];
}) {
  const c = tokens.colors;
  return (
    <div className="bg-light-bg text-light-text">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          {Icon.back("#17181C")}
          <span className="text-page-title font-bold">Credits</span>
        </span>
        {Icon.info("#17181C")}
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-huge-number font-bold leading-[1]">{balance}</span>
        <span className="text-body text-light-sub">{balanceUnit}</span>
      </div>
      <div className="mt-2 text-secondary text-light-sub leading-[18px]">{aboutLine}</div>
      <div className="mt-0.5 text-secondary text-light-sub leading-[18px]">{planLine}</div>

      <div className="mt-4 flex gap-3">
        <button type="button" className="h-12 cursor-pointer rounded-button border-0 bg-black-btn px-5 text-list-item font-bold text-white">
          Buy credits
        </button>
        <button type="button" className="h-12 cursor-pointer rounded-button border border-light-divider bg-transparent px-5 text-list-item font-bold text-light-text">
          Change plan
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-list-item font-bold">{last30Label}</span>
        <span className="text-list-item font-bold">{last30Total}</span>
      </div>

      <div className="mt-1 flex h-[110px] items-end gap-[3px]">
        {bars.map((h, i) => {
          const segs = BAR_SEGMENTS[i % BAR_SEGMENTS.length];
          return (
            <div key={i} className="flex flex-1 flex-col-reverse" style={{ height: h }}>
              {segs.map((f, j) =>
                f > 0 ? (
                  <div
                    key={j}
                    style={{
                      height: Math.max(j === segs.length - 1 ? 2 : 0, Math.round(h * f)),
                      background: BAR_COLORS[j],
                      borderTopLeftRadius: j === segs.length - 1 ? 2 : 0,
                      borderTopRightRadius: j === segs.length - 1 ? 2 : 0,
                    }}
                  />
                ) : null,
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-caption text-light-sub">{dateRange[0]}</span>
        <span className="text-[11px] text-light-dim">{upgradeLabel}</span>
        <span className="text-caption text-light-sub">{dateRange[1]}</span>
      </div>
      <div className="mt-2.5 flex gap-4">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
            <span className="text-secondary text-light-sub">{l.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-section-title font-bold">By model</div>
      <div>
        {models.map((m, i) => {
          const dot = legend.find((l) => m.name.includes(l.label))?.color;
          return (
          <div
            key={m.name}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: i < models.length - 1 ? `1px solid ${c.lightDivider}` : "none" }}
          >
            <div className="flex items-center gap-2.5">
              {dot && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dot }} />}
              <div>
                <div className="text-list-item font-medium">{m.name}</div>
                <div className="text-secondary text-light-sub mt-0.5">{m.messages}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-list-item font-bold">{m.amount}</div>
              <div className="text-secondary text-light-sub mt-0.5">{m.pct}</div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="mt-5 text-section-title font-bold">Activity</div>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2.5">
          {/* v1.3 S13: Lisbon activity dot (orange, as in the drawer Lisbon row). */}
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "#E4754A" }} />
          <div>
            <div className="text-list-item font-medium">{activity.title}</div>
            <div className="text-secondary text-light-sub mt-0.5">{activity.meta}</div>
          </div>
        </div>
        <span className="text-list-item font-bold">{activity.amount}</span>
      </div>
    </div>
  );
}
