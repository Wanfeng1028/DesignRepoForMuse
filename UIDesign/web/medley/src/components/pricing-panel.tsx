import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Icon } from "./icons";
import { ModelDots } from "./medley-mark";
import { RadioGroup, RadioGroupItem } from "./ui/controls";

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
 * Dark pricing panel: 6-dot row, 22px title (v1.3 F1 — the greeting token
 * stays 27px for Home), monthly/yearly segmented control (v1.3 B1: Yearly
 * selected is a dark-grey highlight, "Save 20%" plain small text, no white
 * pill, no peach badge), plan rows with radio markers, white trial CTA
 * and the trial footnote. No card borders on plans (per the mobile
 * close-out: plan cards are borderless dark cards).
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
      <ModelDots size={10} count={6} />
      <h1 className="text-[22px] font-bold leading-[1.25] my-2">{title}</h1>
      <p className="text-[14px] leading-[1.5] text-dark-sub my-0 mb-3">{intro}</p>

      <div className="flex rounded-button bg-dark-input p-1">
        {(["monthly", "yearly"] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onBillingChange?.(b)}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-chip border-0 py-[9px] text-[14px] capitalize",
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
          <div key={p.name} className="mt-2.5 rounded-card bg-dark-card px-4 py-[14px]">
            <div className="flex items-center gap-2.5">
              <RadioGroupItem value={p.name} id={`plan-${p.name}`} />
              <span className="text-body font-bold">{p.name}</span>
              {p.badge && (
                <span className="rounded-[12px] bg-dark-text px-2 py-[3px] text-[11px] font-bold text-light-text">{p.badge}</span>
              )}
              <span className="ml-auto text-right">
                <span className="block text-body font-bold">{p.monthly}</span>
                <span className="mt-0.5 block text-caption text-dark-sub">{p.yearly}</span>
              </span>
            </div>
            {p.detail && <p className="text-secondary leading-[1.5] text-dark-sub mt-3 mb-0 ml-[30px]">{p.detail}</p>}
            {p.features?.map((f) => (
              <div key={f} className="mt-2 flex gap-2 text-secondary leading-[1.45] ml-[30px]">
                <span className="shrink-0">{Icon.check("#F5F5F7", 16)}</span>
                <span>{f}</span>
              </div>
            ))}
            {p.selected && (
              <div className="mt-2.5 ml-[30px]">
                <ModelDots size={8} count={6} />
              </div>
            )}
          </div>
        ))}
      </RadioGroup>

      <div className="mt-4 flex h-[52px] items-center justify-center rounded-button bg-white-btn text-body font-bold text-light-text">
        {ctaLabel}
      </div>
      <p className="text-caption leading-[1.5] text-dark-sub mt-3.5 mb-0">{footnote}</p>
      <div className="mt-3.5 flex justify-center gap-2 pb-2 text-secondary text-dark-sub">
        <span>Restore purchases</span>
        <span>|</span>
        <span>Terms</span>
        <span>|</span>
        <span>Privacy</span>
      </div>
    </div>
  );
}

export type { ReactNode };
