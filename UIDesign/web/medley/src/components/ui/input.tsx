import * as React from "react";
import { cn } from "../../lib/utils";

/** 52px full-pill input shell, matching the mobile input bar (input-height 52, radius 26). */
export function Input({ className, dark = false, ...props }: React.ComponentProps<"input"> & { dark?: boolean }) {
  return (
    <input
      data-slot="input"
      className={cn(
        "h-[52px] w-full rounded-input px-4 text-list-item outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7CE6]",
        dark
          ? "border-0 bg-transparent text-dark-text placeholder:text-dark-dim"
          : "border border-light-divider bg-light-card text-light-text placeholder:text-light-dim",
        className,
      )}
      {...props}
    />
  );
}
