import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

/** Segmented control in the Thinking-block style: pill track, white active segment. */
export const Tabs = TabsPrimitive.Root;
export function TabsList({ className, dark = false, ...props }: React.ComponentProps<typeof TabsPrimitive.List> & { dark?: boolean }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex items-center gap-1 rounded-card p-1", dark ? "bg-dark-card" : "bg-light-bg", className)}
      {...props}
    />
  );
}
export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer rounded-[12px] px-4 py-2 text-secondary font-medium text-light-sub transition-colors transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7CE6] data-[state=active]:bg-white data-[state=active]:font-bold data-[state=active]:text-light-text data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export const RadioGroup = RadioGroupPrimitive.Root;
export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-dark-sub data-[state=checked]:border-dark-text",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full bg-dark-text" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

/** Thin 4px track slider with a white 18px thumb, as on the savings screen. */
export function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-light-divider">
        <SliderPrimitive.Range className="absolute h-full bg-light-text" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label="Value"
        className="block h-[18px] w-[18px] rounded-full border border-[#D8D9DC] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-transform duration-100 active:scale-[1.15] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7CE6]"
      />
    </SliderPrimitive.Root>
  );
}
