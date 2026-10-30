import { cn } from "../lib/utils";
import { tokens } from "../tokens";
import { Icon } from "./icons";

export type DrawerNavItem = { label: string; icon: "image" | "folder" | "cards" | "dots"; badge?: string };
export type DrawerRecentItem = { label: string; dot: string; dots?: string[] };

/**
 * Search drawer on desktop: a left panel (not an overlay) holding the same
 * content as the mobile drawer — search pill, nav rows, Pinned card, Recent
 * list, messages-left card and the user row. On mobile it was 84% wide with
 * a 62px dimmed strip; on desktop it is the sidebar itself.
 */
export function SearchDrawer({
  searchPlaceholder,
  nav,
  pinnedLabel,
  pinnedTitle,
  pinnedDots = [],
  recentLabel,
  recent,
  messagesLeft,
  userName,
  userBadge,
  className,
}: {
  searchPlaceholder: string;
  nav: DrawerNavItem[];
  pinnedLabel: string;
  pinnedTitle: string;
  pinnedDots?: string[];
  recentLabel: string;
  recent: DrawerRecentItem[];
  messagesLeft: string;
  userName: string;
  userBadge: string;
  className?: string;
}) {
  const sub = "#9A9BA2";
  const text = "#F5F5F7";
  return (
    <div className={cn("flex flex-col bg-dark-bg text-dark-text", className)}>
      {/* v1.3 B5: edit sits inside the pill; hamburger is its own row
          below, right-aligned. */}
      <div className="flex h-12 items-center gap-2.5 rounded-input bg-dark-input px-3.5">
        {Icon.search(sub)}
        <span className="flex-1 text-list-item text-dark-dim">{searchPlaceholder}</span>
        {Icon.edit(sub)}
      </div>
      <div className="mt-2 flex justify-end">{Icon.menu(sub)}</div>
      <div className="mt-2">
        {nav.map((r) => (
          <div key={r.label} className="flex items-center justify-between py-[13px]">
            <div className="flex items-center gap-3">
              <span className="inline-flex" style={{ color: sub }}>
                {r.icon === "image" ? Icon.image(sub) : r.icon === "folder" ? Icon.folder(sub) : r.icon === "cards" ? Icon.cards(sub) : (
                  <span className="flex h-[18px] w-[18px] items-center justify-center gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-[3px] w-[3px] rounded-full bg-dark-sub" />
                    ))}
                  </span>
                )}
              </span>
              <span className="text-body font-medium" style={{ color: text }}>{r.label}</span>
            </div>
            {r.badge && (
              <span className="flex items-center gap-1.5">
                {/* v1.3 C2: "1 running" dot is white, not accent. */}
                <span className="h-2 w-2 rounded-full" style={{ background: tokens.colors.drawerRunningDot }} />
                <span className="text-secondary text-dark-sub">{r.badge}</span>
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="text-secondary text-dark-sub mt-2.5">{pinnedLabel}</div>
      <div className="mt-2.5 flex items-center justify-between rounded-card bg-dark-card px-4 py-3.5">
        <span className="text-list-item font-semibold">{pinnedTitle}</span>
        {/* v1.3 S5: pinned row carries 2 dots (ov-drawer blob sample:
            warm orange + purple). */}
        <span className="flex shrink-0 gap-1">
          {pinnedDots.map((d, i) => (
            <span key={i} className="h-2 w-2 rounded-full" style={{ background: d }} />
          ))}
        </span>
      </div>
      <div className="text-secondary text-dark-sub mt-5">{recentLabel}</div>
      <div className="mt-0.5">
        {recent.map((r) => {
          const dots = r.dots ?? [r.dot];
          return (
            <div key={r.label} className="flex items-center justify-between py-3">
              <span className="text-list-item font-medium">{r.label}</span>
              <span className="flex shrink-0 gap-1">
                {dots.map((d, i) => (
                  <span key={i} className="h-2 w-2 rounded-full" style={{ background: d }} />
                ))}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3.5 flex items-center justify-between rounded-card bg-dark-card px-4 py-3.5">
        <span className="text-[14px] font-semibold">{messagesLeft}</span>
        {/* v1.3 S6: messages-left chevron. */}
        {Icon.chevronRight(sub, 16)}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dark-row text-list-item font-bold">
          {userName.charAt(0)}
        </span>
        {/* v1.3 S7: Pro is a sub-line under the name, not a pill. */}
        <span className="flex flex-col">
          <span className="text-list-item font-bold">{userName}</span>
          <span className="text-secondary text-dark-sub">{userBadge}</span>
        </span>
        <span className="ml-auto inline-flex" style={{ color: sub }}>{Icon.gear(sub)}</span>
      </div>
    </div>
  );
}
