import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

/** Medley primary buttons: 52px pill (button-height / button-radius tokens). */
export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "md" | "sm";
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-button font-bold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50",
        size === "md" ? "h-[52px] px-5 text-body" : "h-12 px-5 text-list-item",
        variant === "primary" && "bg-white-btn text-black-btn",
        variant === "dark" && "bg-black-btn text-white",
        variant === "outline" && "border border-light-divider bg-transparent text-light-text dark:border-dark-divider dark:text-dark-text",
        variant === "ghost" && "bg-transparent text-inherit",
        className,
      )}
      {...props}
    />
  );
}
