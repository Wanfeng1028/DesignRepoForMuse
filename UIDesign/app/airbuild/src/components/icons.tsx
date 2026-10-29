import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

function base(props: P) {
  return { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', ...props }
}

/** Redrawn vectors in the spirit of the official 12 raster icons; no official bitmap is used. */
export function ChevronLeftIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}
export function EllipsisIcon(props: P) {
  return (
    <svg {...base(props)}><circle cx="5" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="19" cy="12" r="1.4" fill="currentColor" /></svg>
  )
}
export function CloudIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M7 18a4 4 0 1 1 .6-7.95A5.5 5.5 0 0 1 18.2 12 3.5 3.5 0 0 1 17.5 18H7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
  )
}
export function CloverIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M12 12c-2.5-.3-4.5-1.6-4.5-3.6C7.5 6.3 9.2 5 11 5.6 11.4 3.9 13 3 14.4 3.8c1.5.8 1.8 2.6 1 4 1.8-.3 3.6.9 3.6 2.7 0 2-2 3.3-4.5 3.5 1.6 1.5 2.2 3.8.6 5.2-1.4 1.2-3.5.5-4.1-1.1-.6 1.6-2.7 2.3-4.1 1.1-1.6-1.4-1-3.7.6-5.2Z" fill="currentColor" /></svg>
  )
}
export function PlusIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
  )
}
export function HandIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10m0-4.5v-1a1.5 1.5 0 0 1 3 0V10m0-3.5a1.5 1.5 0 0 1 3 0V12m0-3a1.5 1.5 0 0 1 3 0v4a7 7 0 0 1-7 7h-.8a6 6 0 0 1-4.2-1.8L6 15.5A2.2 2.2 0 0 1 9 12.5L8 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12.5" cy="15.5" r="1.3" fill="currentColor" /></svg>
  )
}
export function ArrowUpIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M12 19V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}
export function DocIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M14 3v4h4M10 12h5M10 15.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  )
}
export function CheckIcon(props: P) {
  return (
    <svg {...base(props)}><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}
export function ShareIcon(props: P) {
  return (
    <svg {...base(props)}><path d="M12 15V3m0 0L8 7m4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  )
}
export function TaskListIcon(props: P) {
  return (
    <svg {...base(props)}><circle cx="6.5" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.7" /><circle cx="6.5" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.7" /><path d="M11 7h7M11 17h7M6.5 9.5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
  )
}
export function ChevronDownIcon(props: P) {
  return (
    <svg {...base(props)}><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}
