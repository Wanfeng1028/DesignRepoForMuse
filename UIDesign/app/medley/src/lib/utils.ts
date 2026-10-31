import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// v1.9: the default tailwind-merge build classifies unknown `text-*` names
// as text COLOR, so `cn('... text-status ...', 'text-dark-text')` silently
// dropped the size token and the element fell back to inherited 16px.
// Measured 2026-11-01: StatusBar rendered 16px (token 13px), SuggestionRow
// 16px (token 15px), SourcesChip label 16px (token 12px); UserBubble was
// unaffected only because its token is 16px. Registering the ten custom
// @theme size tokens as font-size keeps both the size and the color.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-welcome',
        'text-greeting',
        'text-page',
        'text-section',
        'text-body',
        'text-item',
        'text-secondary',
        'text-caption',
        'text-huge',
        'text-status',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
