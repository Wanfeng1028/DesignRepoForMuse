import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { UserBubble } from '../components/Chat'
import { Icon } from '../components/icons'
import { ModelDots } from '../components/Model'
import { ReopenButton, usePresentation } from '../components/Presentation'

export const meta = { id: 'chat-info-sheet', title: 'Chat info sheet (light)', source: 'ov_r1_c2' }

function Dot({ color }: { color: string }) {
  return <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
}

export default function ChatInfoSheet() {
  const { dismissed, onEnterEnd, dismiss, reopen, cycle, sheetClass, scrim45Class, sheetExitClass, scrimExitClass } = usePresentation()
  const stat = (value: string, label: string) => (
    <div className="flex-1">
      <div className="text-greeting font-semibold leading-[1.1] text-light-text">{value}</div>
      <div className="mt-[3px] text-secondary text-light-sub">{label}</div>
    </div>
  )
  const toolRow = (name: string, right: string) => (
    <div className="flex items-center justify-between py-[7px] text-item text-light-text">
      <span>{name}</span>
      <span className="text-secondary text-light-sub">{right}</span>
    </div>
  )
  const cell = (label: string, value: string) => (
    <div>
      <div className="text-caption text-light-sub">{label}</div>
      <div className="mt-0.5 text-item font-bold text-light-text">{value}</div>
    </div>
  )
  const replyRow = (color: string, name: string, right: string) => (
    <div className="flex items-center justify-between border-t border-light-divider py-[9px]">
      <span className="inline-flex items-center gap-2 text-[14px] font-bold text-light-text">
        <Dot color={color} />
        {name}
      </span>
      <span className="text-secondary text-light-sub">{right}</span>
    </div>
  )

  return (
    <Phone theme="light">
      <div className="relative flex min-h-0 flex-1 flex-col bg-light-bg">
        <div
          data-testid="sheet-scrim"
          onClick={dismiss}
          onAnimationEnd={onEnterEnd}
          className={`flex h-[150px] shrink-0 cursor-pointer flex-col bg-light-bg px-5 opacity-45 ${scrim45Class} ${scrimExitClass}`}
        >
          <TopBar
            dark={false}
            left={Icon.menu('#6b6c72')}
            center={
              <span className="inline-flex items-center gap-1.5 rounded-card bg-light-card px-3 py-1.5 text-[14px] font-bold text-light-text">
                <ModelDots />
                Auto
                {Icon.chevronDown('#6b6c72', 14)}
              </span>
            }
            right={<span className="inline-flex items-center gap-4">{Icon.clock('#6b6c72')}{Icon.edit('#6b6c72')}</span>}
          />
          <div className="mt-1.5">
            <UserBubble dark={false} className="max-w-none text-item">Turn this into a 3-day plan with costs.</UserBubble>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <ModelDots />
            <span className="text-[14px] font-bold text-light-text">Claude Sonnet 5.5 · Auto</span>
          </div>
        </div>
        {/* v1.9 glass: sheet shadow is the glassy-liquid reference, upward
            for a bottom sheet (was 0 -12px 32px rgba(23,24,28,0.10)); the
            top dim stays a plain opacity-45 veil with NO backdrop blur,
            because the dimmed chat text above it is sharp in the original
            and blur would smear the strokes (v1.8 evidence, kept). */}
        <div
          key={cycle}
          data-testid="sheet"
          onAnimationEnd={onEnterEnd}
          className={`flex min-h-0 flex-1 flex-col overflow-y-auto scroll-momentum rounded-t-sheet bg-white px-5 pb-2 pt-5 shadow-[0_-10px_26px_rgba(0,0,0,0.16)] backdrop-blur-[50px] backdrop-saturate-[1.8] ${sheetClass} ${sheetExitClass}`}
        >
          <button data-testid="sheet-handle" onClick={dismiss} aria-label="Dismiss sheet" className="flex w-full cursor-pointer justify-center">
            <div className="h-1 w-9 rounded-full bg-[#d8d9dd]" />
          </button>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-page font-bold text-light-text">Chat info</span>
            {Icon.close('#17181c')}
          </div>
          <div className="mt-3 flex gap-2">
            {stat('210', 'Credits used')}
            {stat('9', 'Tool calls')}
            {stat('6', 'Messages')}
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-1.5 text-secondary font-medium text-light-text"><Dot color="#4a7de4" />GLM-5</span>
            <span className="inline-flex items-center gap-1.5 text-secondary font-medium text-light-text"><Dot color="#e4754a" />Claude Sonnet 5.5</span>
            <span className="inline-flex items-center gap-1.5 text-secondary font-medium text-light-text"><Dot color="#2eb5a5" />DeepSeek V4 Pro</span>
          </div>
          <div className="mt-[14px] text-section font-bold text-light-text">Tools</div>
          {toolRow('Web search', '4, 1 from saved results')}
          {toolRow('Pages read', '3')}
          {toolRow('Code runs', '1')}
          {toolRow('Weather', '1')}
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-section font-bold text-light-text">Replies</span>
            <span className="text-secondary text-light-sub">Latest first</span>
          </div>
          <div className="mt-2 rounded-card bg-light-bg p-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[14px] font-bold text-light-text">
                <Dot color="#e4754a" />
                Claude Sonnet 5.5
              </span>
              <span className="text-secondary text-light-sub">10:21</span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {cell('First token', '0.8s')}
              {cell('Speed', '62 tok/s')}
              {cell('Output', '1,240')}
              {cell('Credits', '141')}
              {cell('Tool calls', '6')}
              {cell('Thinking', 'Medium')}
            </div>
          </div>
          {replyRow('#4a7de4', 'GLM-5', '10:24, 28 credits, 1.1s')}
          {replyRow('#2eb5a5', 'DeepSeek V4 Pro', '10:17, 41 credits, 3.5s')}
          <div className="mt-1.5 text-caption leading-[1.45] text-light-sub">
            First token is the time from sending to the first word. Speed counts the visible answer only.
          </div>
        </div>
        {dismissed && <ReopenButton label="Show sheet" onClick={reopen} />}
      </div>
    </Phone>
  )
}
