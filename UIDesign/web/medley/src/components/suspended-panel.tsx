import { Icon } from "./icons";

export type SuspendedAction = { label: string; icon: "download" | "trash" | "logout" };

/**
 * Light suspended-account panel: 56px outlined prohibition badge, 26px title,
 * 14px body, "Suspended until" bold line, subscription note, underlined
 * "Manage subscription", "You can still:" rows, and bottom actions.
 */
export function SuspendedPanel({
  title,
  body,
  suspendedUntil,
  subscriptionNote,
  manageLabel,
  stillLabel,
  stillRows,
  primaryLabel,
  secondaryLabel,
}: {
  title: string;
  body: string;
  suspendedUntil: string;
  subscriptionNote: string;
  manageLabel: string;
  stillLabel: string;
  stillRows: SuspendedAction[];
  primaryLabel: string;
  secondaryLabel: string;
}) {
  const sub = "#6B6C72";
  return (
    <div className="bg-light-bg text-light-text p-5 flex flex-col">
      <div className="mt-4 mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-light-divider bg-light-card">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="10" stroke={sub} strokeWidth="2" />
          <line x1="8" y1="20" x2="20" y2="8" stroke={sub} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-[26px] font-bold leading-[1.25]">{title}</div>
      <div className="mt-4 text-[14px] leading-[1.55]">{body}</div>
      <div className="mt-3 text-[14px] leading-[1.55] font-bold">{suspendedUntil}</div>
      <div className="mt-6 flex items-start gap-2.5">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-[3px] shrink-0" aria-hidden="true">
          <circle cx="9" cy="9" r="7" stroke={sub} strokeWidth="1.6" />
          <line x1="9" y1="8" x2="9" y2="12.5" stroke={sub} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="9" cy="5.6" r="0.9" fill={sub} />
        </svg>
        <span className="flex-1 text-list-item leading-[1.55] text-light-sub">{subscriptionNote}</span>
      </div>
      <div className="ml-7 mt-2 text-list-item font-semibold underline">{manageLabel}</div>
      <div className="mt-5 text-list-item text-light-sub">{stillLabel}</div>
      {stillRows.map((row) => (
        <div key={row.label} className="flex items-center justify-between border-b border-light-divider py-[14px]">
          <span className="flex items-center gap-2.5 text-list-item font-medium">
            <span className="inline-flex" style={{ color: sub }}>
              {row.icon === "download" ? Icon.download(sub) : row.icon === "trash" ? Icon.trash(sub) : Icon.logout(sub)}
            </span>
            {row.label}
          </span>
          {Icon.chevronRight(sub, 16)}
        </div>
      ))}
      <div className="mt-auto flex gap-3 pt-6">
        <button type="button" className="h-[52px] flex-1 cursor-pointer rounded-button border-0 bg-black-btn text-body font-bold text-white">
          {primaryLabel}
        </button>
        <button type="button" className="h-[52px] flex-1 cursor-pointer rounded-button border border-light-divider bg-transparent text-body font-bold text-light-text">
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
