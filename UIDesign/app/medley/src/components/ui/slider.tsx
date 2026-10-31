import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'
import { cn } from '../../lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-light-divider">
      <SliderPrimitive.Range className="absolute h-full bg-light-text" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-[18px] w-[18px] cursor-grab rounded-full border border-[#d8d9dc] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-transform duration-150 focus-visible:outline-none active:scale-125 active:cursor-grabbing disabled:pointer-events-none disabled:opacity-50"
      aria-label="Value"
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
