import type { ReactNode } from "react";
import { Icon } from "./icons";
import { BrandDots, ModelDot } from "./medley-mark";
import { Tabs, TabsList, TabsTrigger } from "./ui/controls";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

export type ModelRowData = {
  name: string;
  desc: string;
  cost?: string;
  unavailableNote?: string;
  badge?: string;
  selected?: boolean;
  dotColor?: string;
};

export type ModelSectionData = { title: string; desc: string; rows: ModelRowData[] };

function Row({ row }: { row: ModelRowData }) {
  return (
    <div className="flex items-center gap-2.5 py-[11px]">
      <ModelDot model={row.name} />
      <div className="min-w-0 flex-1">
        <div className="text-list-item font-semibold text-dark-text">{row.name}</div>
        <div className="text-secondary text-dark-sub">{row.desc}</div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {/* v1.6: the Fable "Pro+" badge carries a lock glyph before the pill
            in the original (HD5 pickerA) — Lucide lock, 14px, dark-sub. */}
        {row.badge === "Pro+" && <span className="inline-flex" style={{ color: "#9A9BA2" }}>{Icon.lock("#9A9BA2", 14)}</span>}
        {row.badge && <BadgeOutline label={row.badge} />}
        {row.unavailableNote ? (
          <div className="w-[110px] text-right text-caption leading-[1.4] text-dark-dim">{row.unavailableNote}</div>
        ) : row.cost ? (
          <div className="text-right">
            <div className="text-list-item font-bold text-dark-text">{row.cost}</div>
            <div className="text-[11px] text-dark-sub">credits</div>
          </div>
        ) : null}
        {row.selected && Icon.check("#F5F5F7")}
      </div>
    </div>
  );
}

export function BadgeOutline({ label }: { label: string }) {
  return (
    <span className="rounded-chip border border-dark-divider px-2 py-px text-[11px] font-semibold text-dark-sub">{label}</span>
  );
}

function Section({ section }: { section: ModelSectionData }) {
  return (
    <div className="pt-5">
      <div className="text-section-title font-bold text-dark-text">{section.title}</div>
      <div className="text-secondary text-dark-sub mt-0.5">{section.desc}</div>
      <div>
        {section.rows.map((r) => (
          <Row key={r.name} row={r} />
        ))}
      </div>
    </div>
  );
}

/** Auto card shared by both picker variants. v1.6: the Auto row carries
 * the 3-dot diagonal BrandDots cluster (HD5 pickerA shows the same
 * green/blue/pink diagonal as welcome/home), not the 5-dot row. */
export function AutoCard({ recommended = true }: { recommended?: boolean }) {
  return (
    <div className="mt-3.5 flex items-center gap-2.5 rounded-card bg-dark-row px-4 py-[13px]">
      <BrandDots />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-body font-bold text-dark-text">Auto</span>
          {recommended && <BadgeOutline label="Recommended" />}
        </div>
        <div className="text-secondary text-dark-sub mt-[3px]">Picks a model for each message.</div>
      </div>
      {Icon.check("#F5F5F7")}
    </div>
  );
}

export function ModelPickerHeader({ howCreditsText }: { howCreditsText?: string }) {
  return (
    <div className="flex items-center justify-between pt-3">
      <span className="text-page-title font-bold text-dark-text">Choose a model</span>
      {howCreditsText ? (
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="cursor-pointer bg-transparent border-0 text-secondary text-dark-sub">
              How credits work
            </button>
          </DialogTrigger>
          <DialogContent dark>
            <div className="text-section-title font-bold">How credits work</div>
            <p className="mt-2 mb-0 text-body leading-[1.55] text-dark-sub">{howCreditsText}</p>
          </DialogContent>
        </Dialog>
      ) : (
        <button type="button" className="cursor-pointer bg-transparent border-0 text-secondary text-dark-sub">
          How credits work
        </button>
      )}
    </div>
  );
}

/**
 * Picker A: Auto card + "Up to Advanced" link + Everyday / Advanced /
 * Flagship / Frontier sections. Costs are per-message credit deltas.
 */
export function ModelPickerA({ sections, howCreditsText }: { sections: ModelSectionData[]; howCreditsText?: string }) {
  return (
    <div className="bg-dark-card text-dark-text">
      <ModelPickerHeader howCreditsText={howCreditsText} />
      <AutoCard />
      <div className="flex items-center justify-center gap-0.5 pt-3.5 text-secondary text-dark-sub">
        <span>Up to Advanced</span>
        {Icon.chevronRight("#9A9BA2")}
      </div>
      {sections.map((s) => (
        <Section key={s.title} section={s} />
      ))}
    </div>
  );
}

export const THINKING_SEGMENTS = ["Auto", "Off", "Low", "Med", "High", "Max"] as const;

/**
 * v1.3 T6/Q13: Thinking figures measured from the Thinking zoom crop
 * (zoom-pickerB-thinking): each segment carries a "~" figure underneath —
 * Auto ~110, Off ~10, Low ~110, Med ~140, High ~200, Max ~400. The "~"
 * prefix is confirmed here (same glyph as the model rows), closing audit
 * 待量8. The v1.2 "unreadable" note is superseded.
 */
export const THINKING_VALUES: Record<string, string> = {
  Auto: "~110",
  Off: "~10",
  Low: "~110",
  Med: "~140",
  High: "~200",
  Max: "~400",
};

/**
 * Picker B: Advanced / Flagship sections, then a Thinking segmented control
 * (Auto/Off/Low/Med/High/Max with "~" figures underneath), then three rows
 * with NO section title — the original shows no heading for GPT-6.1 Sol /
 * Kimi K3 / Claude Opus 5.5, so none is invented here.
 */
export function ModelPickerB({
  sections,
  thinkingValue = "Auto",
  untitledRows,
  onThinkingChange,
  howCreditsText,
}: {
  sections: ModelSectionData[];
  thinkingValue?: string;
  untitledRows: ModelRowData[];
  onThinkingChange?: (v: string) => void;
  howCreditsText?: string;
}) {
  return (
    <div className="bg-dark-card text-dark-text">
      <ModelPickerHeader howCreditsText={howCreditsText} />
      <AutoCard />
      {sections.map((s) => (
        <Section key={s.title} section={s} />
      ))}
      <div className="pt-5">
        <div className="text-list-item font-bold text-dark-text">Thinking</div>
        <Tabs value={thinkingValue} onValueChange={onThinkingChange}>
          <TabsList dark className="mt-2.5 flex w-full">
            {THINKING_SEGMENTS.map((s) => (
              <TabsTrigger
                key={s}
                value={s}
                className="flex flex-1 flex-col items-center gap-0.5 text-center data-[state=inactive]:text-dark-sub"
              >
                <span>{s}</span>
                <span className="text-[11px] leading-none opacity-70">{THINKING_VALUES[s]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="text-secondary text-dark-sub mt-2">Auto picks the level for each message.</div>
      </div>
      <div className="pt-2">
        {untitledRows.map((r) => (
          <Row key={r.name} row={r} />
        ))}
      </div>
    </div>
  );
}

export type { ReactNode };
