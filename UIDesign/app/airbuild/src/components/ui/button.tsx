import { Slot } from '@radix-ui/react-slot'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils.ts'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: 'primary' | 'ghost' | 'icon'
}

export function Button({ asChild, variant = 'primary', className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors cursor-pointer',
        variant === 'primary' && 'bg-[#1987f7] text-white rounded-full px-4 py-2 text-sm',
        variant === 'ghost' && 'bg-transparent text-[#11110f] rounded-full px-3 py-2 text-sm',
        variant === 'icon' &&
          'w-10 h-10 rounded-full bg-white border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-[#11110f]',
        className,
      )}
      {...props}
    />
  )
}
