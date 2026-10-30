import { Icon } from "./icons";
import { Separator } from "./ui/separator";

export type LanguageRow = { name: string; sub?: string; selected?: boolean };

/**
 * Light language panel: page title (20px bold), rows at 10px vertical padding
 * with a check on the selected row, and the trailing footnote. Row content is
 * fully prop-driven (names + English subtitles).
 */
export function LanguagePanel({ title, rows, footnote }: { title: string; rows: LanguageRow[]; footnote: string }) {
  return (
    <div className="bg-light-bg text-light-text">
      <div className="flex items-center gap-2 px-5 pt-1 pb-2 text-page-title font-bold leading-[1.3]">
        <span className="inline-flex shrink-0">{Icon.back("#17181C")}</span>
        {title}
      </div>
      <div className="px-5">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center border-b border-light-divider py-2.5">
            <div className="min-w-0 flex-1 pr-3">
              <div className="text-list-item font-medium leading-[1.35]">{row.name}</div>
              {row.sub && <div className="mt-[3px] text-secondary leading-[1.35] text-light-sub">{row.sub}</div>}
            </div>
            {row.selected && <span className="shrink-0">{Icon.check("#17181C")}</span>}
          </div>
        ))}
      </div>
      <Separator className="mt-3" />
      <div className="px-5 py-5 text-secondary leading-[1.4] text-light-sub">{footnote}</div>
    </div>
  );
}
