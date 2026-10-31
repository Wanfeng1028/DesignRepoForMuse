/**
 * v1.9 interaction line: iOS motion values shared by components.
 * Curves are the iOS values from the brief: cubic-bezier(0.32,0.72,0,1)
 * for presentations, a soft overshoot spring for controls. Durations are
 * chosen so mount animations settle before the 3000ms screenshot window.
 */
export const IOS_EASE = 'cubic-bezier(0.32,0.72,0,1)'
export const IOS_SPRING = 'cubic-bezier(0.34,1.3,0.64,1)'
export const SHEET_ENTER_MS = 600
export const ROTATION_INTERVAL_MS = 5000
