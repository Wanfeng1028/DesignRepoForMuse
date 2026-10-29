import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import { cn } from '../../lib/utils'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close

/** Bottom sheet (shadcn-style, built on Radix Dialog). The chat-info screen
 *  renders the same sheet statically; this component is the interactive form. */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/45" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 rounded-t-sheet bg-light-card px-5 pb-2 pt-5 shadow-lg',
        className,
      )}
      {...props}
    >
      <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-[#d8d9dd]" />
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
SheetContent.displayName = 'SheetContent'

export { Sheet, SheetTrigger, SheetClose, SheetContent }
