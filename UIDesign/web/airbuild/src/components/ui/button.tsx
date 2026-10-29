import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils.ts'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'ghost' | 'blue'
  size?: 'icon' | 'sm' | 'md'
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild, variant = 'default', size = 'md', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:opacity-50',
          variant === 'default' && 'bg-[rgba(255,255,255,0.64)] text-black/65 shadow-[0_4px_14px_rgba(0,0,0,0.045)] border border-[rgba(255,255,255,0.74)]',
          variant === 'ghost' && 'bg-transparent text-[#686868] hover:bg-white/50',
          variant === 'blue' && 'bg-[#1987f7] text-white',
          size === 'icon' && 'h-9 w-9',
          size === 'sm' && 'h-8 px-3 text-[12px]',
          size === 'md' && 'h-9 px-4 text-[13px]',
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
