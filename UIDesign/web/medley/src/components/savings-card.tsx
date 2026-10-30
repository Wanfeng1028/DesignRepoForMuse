import { tokens } from "../tokens";
import { Icon } from "./icons";
import { Slider } from "./ui/controls";

export type SavingsRow = { label: string; value: string; fill: string };

/**
 * Savings calculator card (light): slider rows (measured fills 16% / 44%),
 * years stepper, $58,164 final balance vs $36,000 put in / $22,164 growth,
 * and the compound curve — a 30-point monthly-compounding sampling
 * (FV(15y) = $58,164, matching the original) against the $36,000 linear
 * dashed line. Curve points are computed, not hand-drawn.
 */
export function SavingsCard({
  title,
  sliders,
  yearsLabel,
  years,
  finalBalance,
  finalLabel,
  putIn,
  putInLabel,
  growth,
  growthLabel,
  axisLabels,
  footerLeft,
  footerRight,
}: {
  title: string;
  sliders: SavingsRow[];
  yearsLabel: string;
  years: string;
  finalBalance: string;
  finalLabel: string;
  putIn: string;
  putInLabel: string;
  growth: string;
  growthLabel: string;
  axisLabels: [string, string, string, string];
  footerLeft: string;
  footerRight: string;
}) {
  const c = tokens.colors;
  // Compound curve: 30 monthly-compounding samples over 15 years, mapped to
  // the 280x118 viewBox used by the mobile screen (y=104 baseline, y=12.9 top).
  const pts: string[] = [];
  const r = 0.06 / 12;
  for (let i = 0; i <= 29; i++) {
    const months = (i / 29) * 180;
    const fv = 200 * ((Math.pow(1 + r, months) - 1) / r);
    // v1.3 sweep: the curve ends at ~82% of plot width so the "Balance"
    // label sits right of the endpoint dot without clipping (280 viewBox).
    const x = (i / 29) * 230;
    const y = 104 - (fv / 60000) * (104 - 12.9);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return (
    <div className="rounded-card bg-light-card p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <div className="text-body font-bold">{title}</div>
        {/* v1.3 S9: card "..." menu. */}
        {Icon.more("#6B6C72", 18)}
      </div>
      {sliders.map((s) => (
        <div key={s.label} className="mt-4">
          <div className="flex justify-between text-[14px] text-light-sub">
            <span>{s.label}</span>
            <span className="text-list-item font-bold text-light-text">{s.value}</span>
          </div>
          <div className="mt-2.5">
            <Slider defaultValue={[parseFloat(s.fill)]} max={100} />
          </div>
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[14px] text-light-sub">{yearsLabel}</span>
        <span className="flex items-center gap-3.5">
          <span className="text-[18px] text-light-sub">–</span>
          <span className="text-list-item font-bold">{years}</span>
          <span className="text-[18px] text-light-sub">+</span>
        </span>
      </div>
      <div className="mt-[18px] flex items-start gap-3">
        <div className="flex-1">
          <div className="text-[40px] font-bold leading-[1.1]">{finalBalance}</div>
          <div className="mt-0.5 text-caption text-light-sub">{finalLabel}</div>
        </div>
        <div className="text-right">
          <div className="text-list-item font-bold">{putIn}</div>
          <div className="text-caption text-light-sub">{putInLabel}</div>
          <div className="mt-2 text-list-item font-bold">{growth}</div>
          <div className="text-caption text-light-sub">{growthLabel}</div>
        </div>
      </div>
      <div className="mt-4 flex gap-1.5">
        <div className="flex h-[118px] flex-col justify-between pb-3.5 text-[11px] text-light-dim">
          <span>60K</span>
          <span>40K</span>
          <span>20K</span>
          <span>0</span>
        </div>
        <div className="flex-1">
          <svg width="100%" height="118" viewBox="0 0 280 118" preserveAspectRatio="none" aria-hidden="true">
            {[10, 44, 78, 104].map((y) => (
              <line key={y} x1="0" y1={y} x2="280" y2={y} stroke={c.lightDivider} strokeWidth="1" />
            ))}
            <path d={pts.join(" ")} fill="none" stroke={c.lightText} strokeWidth="1.5" />
            {/* v1.3 S10: Balance curve endpoint dot (last sample: 230, 15.7). */}
            <circle cx="230" cy="15.7" r="4" fill={c.lightText} />
            <path d="M0 104 L 230 57.4" fill="none" stroke={c.lightDim} strokeWidth="1.5" strokeDasharray="5 4" />
            <text x="237" y="19" fontSize="11" fill={c.lightText} fontWeight="600">Balance</text>
            <text x="235" y="61" fontSize="11" fill={c.lightDim}>Put in</text>
          </svg>
          <div className="flex justify-between text-[11px] text-light-dim">
            {axisLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3.5 flex justify-between border-t border-light-divider pt-3 text-caption text-light-sub">
        <span>{footerLeft}</span>
        <span className="font-semibold">{footerRight}</span>
      </div>
    </div>
  );
}

/** Three-column comparison table (train screen): 100px label column + two
 * equal value columns. v1.3 sweep: the original table sits in a white
 * rounded card, not on bare hairlines. */
export function CompareTable({ rows, headers }: { headers: [string, string]; rows: [string, string, string][] }) {
  return (
    <div className="rounded-card bg-light-card p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex border-b border-light-divider">
        <div className="w-[100px] shrink-0 py-2.5" />
        {headers.map((h) => (
          <div key={h} className="flex-1 py-2.5 text-[14px] font-semibold">{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r[0]} className="flex" style={{ borderBottom: i === rows.length - 1 ? "none" : `1px solid ${tokens.colors.lightDivider}` }}>
          <div className="w-[100px] shrink-0 py-2.5 pr-2 text-[14px] leading-[1.45] text-light-sub">{r[0]}</div>
          <div className="flex-1 py-2.5 text-[14px] leading-[1.45]">{r[1]}</div>
          <div className="flex-1 py-2.5 text-[14px] leading-[1.45]">{r[2]}</div>
        </div>
      ))}
    </div>
  );
}
