import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  dark = false,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & { dark?: boolean }) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        dark ? "bg-dark-divider" : "bg-light-divider",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
