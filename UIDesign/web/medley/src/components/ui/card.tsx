import * as React from "react";
import { cn } from "../../lib/utils";

export function Card({ className, dark = false, ...props }: React.ComponentProps<"div"> & { dark?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-card",
        dark ? "bg-dark-card text-dark-text" : "bg-light-card text-light-text shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ className, dark = false, ...props }: React.ComponentProps<"span"> & { dark?: boolean }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-chip border px-2 py-px text-[11px] font-semibold",
        dark ? "border-dark-divider text-dark-sub" : "border-light-divider text-light-sub",
        className,
      )}
      {...props}
    />
  );
}
