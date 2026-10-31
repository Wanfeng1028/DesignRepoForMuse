import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { DiagonalDots, ModelDots } from "./medley-mark";
import { RadioGroup, RadioGroupItem } from "./ui/controls";
import { glassSmallStyle } from "./liquid-glass";

export type PlanData = {
  name: string;
  monthly: string;
  yearly: string;
  badge?: string;
  detail?: string;
  features?: string[];
  selected?: boolean;
};

/**
 * Dark pricing panel: diagonal 6-dot row, 22px title (v1.3 F1 — the
 * greeting token stays 27px for Home), monthly/yearly segmented control
 * (v1.3 B1: Yearly selected is a dark-grey highlight, "Save 20%" plain
 * small text, no white pill, no peach badge), plan rows with radio
 * markers, white trial CTA and the trial footnote. v1.6: ONLY the
 * selected Pro plan is a card (with a 1px dark-sub border); Lite and
 * Pro+ are plain rows on the panel bg — the v1.3 "borderless cards"
 * reading mistook the selected card's fill for all plans.
 */
export function PricingPanel({
  title,
  intro,
  billing = "yearly",
  plans,
  ctaLabel,
  footnote,
  onBillingChange,
}: {
  title: string;
  intro: string;
  billing?: "monthly" | "yearly";
  plans: PlanData[];
  ctaLabel: string;
  footnote: string;
  onBillingChange?: (v: "monthly" | "yearly") => void;
}) {
  return (
    <div className="bg-dark-bg text-dark-text">
      <div className="mb-1">{Icon.close("#F5F5F7")}</div>
      <DiagonalDots />
      <h1 className="text-[22px] font-semibold leading-[1.25] my-2">{title}</h1>
      <p className="text-[14px] leading-[1.5] text-dark-sub my-0 mb-3">{intro}</p>

      <div style={glassSmallStyle} className="flex rounded-button glass-tint-dark p-1">
        {(["monthly", "yearly"] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onBillingChange?.(b)}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-chip border-0 py-[4px] text-[14px] capitalize",
              billing === b ? "bg-dark-row font-bold text-dark-text" : "bg-transparent font-semibold text-dark-sub",
            )}
          >
            {b === "monthly" ? "Monthly" : "Yearly"}
            {b === "yearly" && (
              <span className="text-[12px] font-medium text-dark-sub">Save 20%</span>
            )}
          </button>
        ))}
      </div>

      <RadioGroup defaultValue={plans.find((p) => p.selected)?.name} className="flex flex-col">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "mt-5 px-4",
              p.selected
                ? "rounded-card border border-dark-sub bg-dark-card pt-3 pb-0"
                : "py-[5px]",
            )}
          >
            <div className="flex items-center gap-2.5">
              <RadioGroupItem value={p.name} id={`plan-${p.name}`} />
              <span className="text-body font-bold">{p.name}</span>
              {p.badge && (
                <span className="rounded-[12px] bg-dark-sub px-1 py-[1px] text-[8px] leading-none font-bold text-light-text">{p.badge}</span>
              )}
              <span className="ml-auto text-right">
                <span className="block text-body font-bold leading-[1.25]">{p.monthly}</span>
                <span className="mt-0.5 block text-caption leading-[1.2] text-dark-sub">{p.yearly}</span>
              </span>
            </div>
            {p.detail && <p className="text-secondary leading-[1.45] text-dark-sub mt-2.5 mb-0 ml-[30px]">{p.detail}</p>}
            {p.features?.map((f) => (
              <div key={f} className="mt-1 flex gap-2 text-secondary leading-[1.45] ml-[30px]">
                <span className="shrink-0">{Icon.check("#F5F5F7", 16)}</span>
                <span>{f}</span>
              </div>
            ))}
            {p.selected && (
              <div className="mt-2 ml-[30px]">
                <ModelDots size={8} count={6} gap={6} />
              </div>
            )}
          </div>
        ))}
      </RadioGroup>

      <div className="mt-6 flex h-12 items-center justify-center rounded-button bg-white-btn text-body font-bold text-light-text">
        {ctaLabel}
      </div>
      <p className="text-caption leading-[1.5] text-dark-sub mt-3.5 mb-0">{footnote}</p>
      <div className="mt-3.5 flex justify-between pb-2 text-secondary text-dark-sub">
        <span>Restore purchases</span>
        <span>Terms</span>
        <span>Privacy</span>
      </div>
    </div>
  );
}

export type { ReactNode };
