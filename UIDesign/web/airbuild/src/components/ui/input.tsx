import * as React from 'react'
import { cn } from '../../lib/utils.ts'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn('h-8 w-full rounded-full border border-black/10 bg-white px-3 text-[12px] outline-none placeholder:text-black/36 focus:border-[#1987f7]', className)} {...props} />
  ),
)
Input.displayName = 'Input'
