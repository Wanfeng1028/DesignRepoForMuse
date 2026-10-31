import { useState } from 'react'

/**
 * v1.9 interaction line: presentation state for bottom sheets (picker-a,
 * chat-info-sheet) and the search drawer. Mount animations are CSS classes
 * removed on animation end, so the settled state carries no transform and
 * verification screenshots are pixel-identical to the static screens.
 * Dismiss is user-driven only (scrim/handle click); screenshots never
 * click, so they always show the presented state. The reopen button only
 * exists while dismissed, so it never appears in screenshots.
 *
 * v1.9 compositing fix: dismiss is an EXIT ANIMATION class (fill both
 * holds the sheet off-screen after it ends), NOT an inline transition
 * style. A permanent `transition: transform` style forces a composited
 * layer on the picker sheet, whose content exactly fits its container
 * (scrollHeight == clientHeight, no overflow layer in the static render);
 * the layer rasterizes text differently and produced a deterministic
 * 13104px diff vs the static render (thicker stems, e.g. DeepSeek row).
 * The drawer and info-sheet did not diff because their content overflows,
 * so they already rasterize inside a scrolling layer either way. Exit
 * classes exist only while dismissed, so settled screenshots stay
 * layer-free and pixel-identical to the static screens.
 */
export function usePresentation() {
  const [entered, setEntered] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [cycle, setCycle] = useState(0)
  return {
    entered,
    dismissed,
    cycle,
    onEnterEnd: () => setEntered(true),
    dismiss: () => setDismissed(true),
    reopen: () => {
      setDismissed(false)
      setEntered(false)
      setCycle((c) => c + 1)
    },
    sheetClass: entered || dismissed ? '' : 'anim-ios-sheet-enter',
    drawerClass: entered || dismissed ? '' : 'anim-ios-drawer-enter',
    scrim45Class: entered || dismissed ? '' : 'anim-ios-scrim-45',
    scrimClass: entered || dismissed ? '' : 'anim-ios-scrim-enter',
    sheetExitClass: dismissed ? 'anim-ios-sheet-exit' : '',
    drawerExitClass: dismissed ? 'anim-ios-drawer-exit' : '',
    scrimExitClass: dismissed ? 'anim-ios-scrim-exit' : '',
  }
}

export function ReopenButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      data-testid="reopen-sheet"
      onClick={onClick}
      className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-black shadow-[0_10px_26px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95"
    >
      {label}
    </button>
  )
}
