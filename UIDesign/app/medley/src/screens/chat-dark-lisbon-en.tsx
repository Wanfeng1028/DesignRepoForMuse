import { useEffect, useRef, useState } from 'react'
import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { UserBubble, AiMeta, ActionRow, SourcesChip } from '../components/Chat'
import { Icon } from '../components/icons'
import { ModelDot } from '../components/Model'

export const meta = { id: 'chat-dark-lisbon-en', title: 'Lisbon chat (dark, EN)', source: 'det_r0_c0' }

const bullets: { text: string; cite?: string }[] = [
  { text: 'Ride tram 28 before 9am, while it\'s still quiet.', cite: '1' },
  { text: 'Lunch at a neighborhood tasca for under €12.' },
  { text: 'Sunset at Miradouro da Senhora do Monte.', cite: '2' },
]

/**
 * v1.9 interaction line (demo exemplar for the set's chat screens): the
 * composer is live — type, send, watch the thinking indicator, then the
 * streamed reply, with a stop button that halts the stream. The streamed
 * text is a demo echo of the user's own message (labelled as such), never
 * a fabricated model answer. In the initial state (empty composer) the
 * bar renders exactly the static InputBar pixels: same 56px dark glass
 * bar, same plus icon, same placeholder colour, same stop-accent button.
 */
type DemoMsg = { id: number; kind: 'user' | 'ai'; text: string }

export default function ChatDarkLisbonEn() {
  const [msgs, setMsgs] = useState<DemoMsg[]>([])
  const [draft, setDraft] = useState('')
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'streaming'>('idle')
  const [streamed, setStreamed] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // Auto-scroll only for demo messages (never on mount: the static
  // content is 1px taller than its container, so a mount-time scrollTo
  // would shift it by 1px and break the verification shots).
  useEffect(() => {
    if (msgs.length === 0 && phase === 'idle' && streamed === '') return
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [msgs, streamed, phase])
  useEffect(() => () => {
    timers.current.forEach(clearTimeout)
    if (streamTimer.current) clearInterval(streamTimer.current)
  }, [])

  const stopStream = () => {
    if (streamTimer.current) clearInterval(streamTimer.current)
    streamTimer.current = null
    setStreamed((cur) => {
      if (cur) setMsgs((m) => [...m, { id: Date.now(), kind: 'ai', text: cur }])
      return ''
    })
    setPhase('idle')
  }

  const send = () => {
    const text = draft.trim()
    if (!text || phase !== 'idle') return
    setMsgs((m) => [...m, { id: Date.now(), kind: 'user', text }])
    setDraft('')
    setPhase('thinking')
    const full = `Demo echo — ${text}`
    timers.current.push(
      setTimeout(() => {
        setPhase('streaming')
        let i = 0
        streamTimer.current = setInterval(() => {
          i += 2
          if (i >= full.length) {
            if (streamTimer.current) clearInterval(streamTimer.current)
            streamTimer.current = null
            setMsgs((m) => [...m, { id: Date.now() + 1, kind: 'ai', text: full }])
            setStreamed('')
            setPhase('idle')
          } else {
            setStreamed(full.slice(0, i))
          }
        }, 14)
      }, 900),
    )
  }

  return (
    <Phone theme="dark">
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar
          dark
          left={Icon.menu('#f5f5f7')}
          center={
            <span className="flex items-center gap-1.5 text-[16px] font-bold text-dark-text">
              <ModelDot model="Claude Sonnet 5.5" />
              Claude Sonnet 5.5
              {Icon.chevronDown('#9a9ba2', 14)}
            </span>
          }
          right={Icon.edit('#f5f5f7')}
        />
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto scroll-momentum px-5 pb-4 pt-1">
          <div className="pt-[7px] pb-px">
            <UserBubble dark>Plan 3 days in Lisbon on a budget. I love food and good views.</UserBubble>
          </div>
          <AiMeta dark model="GLM-5 · Auto" />
          <div className="text-body leading-[1.55] text-dark-text">
            Here&apos;s a relaxed plan that keeps costs low and saves the best views for sunset.
          </div>
          <div className="mt-[14px] text-body font-bold leading-[1.55] text-dark-text">Day 1: Alfama and the castle</div>
          <div className="mt-[3px] flex flex-col gap-2">
            {bullets.map((b) => (
              <div key={b.text} className="flex gap-2 text-item leading-[1.45] text-dark-text">
                <span className="shrink-0 text-dark-sub">•</span>
                <span>
                  {b.text}
                  {b.cite && (
                    <span className="ml-1 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-[4px] bg-dark-row px-[3px] align-super text-[10px] font-semibold text-dark-sub">
                      {b.cite}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <SourcesChip dark badges={['T', 'L', 'V']} countLabel="3 sources" />
          <ActionRow dark credits="28 credits" />
          <div className="mt-[33px] mb-[26px] flex justify-end">
            <div className="rounded-chip border border-dark-divider px-[18px] py-2.5 text-item text-dark-text">
              Make day 2 all about food.
            </div>
          </div>
          <AiMeta dark model="Claude Sonnet 5.5" />
          <div className="text-[15px] leading-[1.67] text-dark-text">
            Day 2 works best as a slow eating day. Start at Time Out Market around 11am, before the lunch rush, and share a
            few small plates instead of one big meal. In the afternoon, walk up to Bairro Alto for a pastel de nata.
            <span className="ml-1.5 inline-block h-[9px] w-[9px] rounded-full bg-brand-dot align-middle" />
          </div>
          {msgs.map((m) =>
            m.kind === 'user' ? (
              <div key={m.id} className="pt-[7px] pb-px">
                <UserBubble dark>{m.text}</UserBubble>
              </div>
            ) : (
              <div key={m.id}>
                <AiMeta dark model="Claude Sonnet 5.5" />
                <div className="text-body leading-[1.55] text-dark-text">{m.text}</div>
              </div>
            ),
          )}
          {phase === 'thinking' && (
            <div data-testid="thinking" className="flex items-center gap-1.5 py-2">
              <span className="anim-ios-thinking-dot h-[7px] w-[7px] rounded-full bg-dark-sub" />
              <span className="anim-ios-thinking-dot h-[7px] w-[7px] rounded-full bg-dark-sub" style={{ animationDelay: '0.15s' }} />
              <span className="anim-ios-thinking-dot h-[7px] w-[7px] rounded-full bg-dark-sub" style={{ animationDelay: '0.3s' }} />
              <span className="ml-1 text-secondary text-dark-sub">Thinking</span>
            </div>
          )}
          {phase === 'streaming' && (
            <div>
              <AiMeta dark model="Claude Sonnet 5.5" />
              <div className="text-body leading-[1.55] text-dark-text">
                {streamed}
                <span className="anim-ios-caret ml-1 inline-block h-[15px] w-[2px] bg-dark-text align-middle" />
              </div>
            </div>
          )}
        </div>
        <div className="shrink-0 px-4 pt-3">
          <div className="flex h-[56px] items-center gap-2.5 rounded-input bg-dark-input py-0 pl-[14px] pr-2 shadow-[0_10px_26px_rgba(0,0,0,0.16),inset_0_0_0_0.5px_rgba(255,255,255,0.06)] backdrop-blur-[50px] backdrop-saturate-[1.8] focus-within:ring-2 focus-within:ring-[#6ea9dd]/50">
            <span className="flex text-dark-sub">{Icon.plus('#9a9ba2')}</span>
            <input
              data-testid="chat-composer"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
              placeholder="Message Claude Sonnet 5.5"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-dark-text outline-none placeholder:text-[#6b6c72]"
            />
            {phase === 'idle' && draft.trim() === '' && (
              <span className="flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-full bg-accent transition-all duration-200 active:scale-95">
                <span className="h-[9px] w-[9px] rounded-[2px] bg-[#111214] transition-all duration-200" />
              </span>
            )}
            {phase === 'idle' && draft.trim() !== '' && (
              <button
                data-testid="composer-send"
                onClick={send}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all duration-200 active:scale-95"
              >
                {Icon.send('#ffffff')}
              </button>
            )}
            {phase !== 'idle' && (
              <button
                data-testid="composer-stop"
                onClick={stopStream}
                aria-label="Stop generating"
                className="flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-full bg-accent transition-all duration-200 active:scale-95"
              >
                <span className="h-[9px] w-[9px] rounded-[2px] bg-[#111214] transition-all duration-200" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Phone>
  )
}
