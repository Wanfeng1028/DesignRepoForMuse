import { tokens } from "../tokens";

export type CreditBarDay = { height: number };
export type CreditModelRow = { name: string; messages: string; amount: string; pct: string };
export type CreditLegendItem = { label: string; color: string };

/**
 * Light credits panel: 44px huge balance, plan line, Buy/Change buttons,
 * last-30-days header, "Oct 15, upgraded to Pro" dashed marker, ~20 stacked
 * multi-color bars (brown-gold base #8C553C + pink + teal tips), legend,
 * By-model rows and an Activity row. All figures are props.
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

      <div className="mt-2 flex">
        <div className="ml-[60%] flex items-center gap-1">
          <span className="inline-block h-2.5 w-px bg-light-dim" />
          <span className="text-[11px] text-light-dim">{upgradeLabel}</span>
        </div>
      </div>
      <div className="relative mt-1">
        <div className="absolute top-0 bottom-0 left-[60%] z-[1] border-l border-dashed border-light-dim" />
        <div className="mt-1 flex h-[110px] items-end gap-[3px]">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col-reverse" style={{ height: h }}>
              <div style={{ height: Math.round(h * 0.55), background: c.chartAmber }} />
              <div style={{ height: Math.round(h * 0.3), background: "#C65D7B" }} />
              <div style={{ height: Math.max(2, Math.round(h * 0.15)), background: "#5B8A99", borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex justify-between">
        <span className="text-caption text-light-sub">{dateRange[0]}</span>
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
        {models.map((m, i) => (
          <div
            key={m.name}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: i < models.length - 1 ? `1px solid ${c.lightDivider}` : "none" }}
          >
            <div>
              <div className="text-list-item font-medium">{m.name}</div>
              <div className="text-secondary text-light-sub mt-0.5">{m.messages}</div>
            </div>
            <div className="text-right">
              <div className="text-list-item font-bold">{m.amount}</div>
              <div className="text-secondary text-light-sub mt-0.5">{m.pct}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-section-title font-bold">Activity</div>
      <div className="flex items-center justify-between py-3">
        <div>
          <div className="text-list-item font-medium">{activity.title}</div>
          <div className="text-secondary text-light-sub mt-0.5">{activity.meta}</div>
        </div>
        <span className="text-list-item font-bold">{activity.amount}</span>
      </div>
    </div>
  );
}
