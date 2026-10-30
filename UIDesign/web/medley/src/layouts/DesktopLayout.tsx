import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Icon } from "../components/icons";
import { MedleyMark, BrandDots } from "../components/medley-mark";

export type DesktopLayoutProps = {
  /** Left session/nav column. */
  sidebar: ReactNode;
  /** Main content column. */
  children: ReactNode;
  /** Optional right panel (chat info, credits, picker, agent team). */
  rightPanel?: ReactNode;
  /** Theme of the main column. */
  dark?: boolean;
  /** Center top-bar content: model pill or chat title. */
  topCenter?: ReactNode;
  /** Show the right panel column at all (desktop default: on when provided). */
  className?: string;
};

/**
 * Desktop layout: top bar (M mark + wordmark, center pill/title, right icons),
 * left session column (280px, the search-drawer content), main column, and an
 * optional right panel (360px). This arrangement is a desktop re-layout:
 * there is no desktop original image — only the tokens and component forms
 * are 1:1 with the mobile screens (see README).
 */
export function DesktopLayout({ sidebar, children, rightPanel, dark = false, topCenter, className }: DesktopLayoutProps) {
  const text = dark ? "#F5F5F7" : "#17181C";
  const sub = dark ? "#9A9BA2" : "#6B6C72";
  return (
    <div className={cn("flex h-[720px] w-full flex-col overflow-hidden rounded-card border border-light-divider bg-light-bg", className)}>
      <header className={cn("flex h-14 shrink-0 items-center justify-between border-b px-4", dark ? "border-dark-divider bg-dark-bg" : "border-light-divider bg-light-card")}>
        <div className="flex w-[280px] items-center gap-2">
          <MedleyMark size={24} color={text} />
          <span className="text-[17px] font-bold" style={{ color: text }}>Medley</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {topCenter ?? (
            <span className="inline-flex items-center gap-1.5 rounded-chip bg-user-bubble-light px-3 py-[7px] text-[14px] font-semibold text-light-text">
              {/* v1.6: Auto dots are BrandDots (desktop chrome keeps its
                  pill — it is desktop chrome, not a mobile screen, and no
                  mobile evidence covers it; only the dot motif changes). */}
              <BrandDots />
              Auto
              {Icon.chevronDown(sub)}
            </span>
          )}
        </div>
        <div className="flex w-[280px] items-center justify-end gap-4" style={{ color: sub }}>
          {Icon.clock(sub)}
          {Icon.edit(sub)}
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[280px] shrink-0 overflow-y-auto border-r border-dark-divider bg-dark-bg p-4 lg:block">
          {sidebar}
        </aside>
        <main className={cn("flex min-w-0 flex-1 flex-col overflow-y-auto", dark ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text")}>
          {children}
        </main>
        {rightPanel && (
          <aside className="hidden w-[360px] shrink-0 overflow-y-auto overflow-x-hidden border-l border-light-divider bg-light-card p-4 xl:block">
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  );
}
