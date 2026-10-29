import { Phone } from '../components/Phone'
import { TopBar, ModelPill } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { UserBubble, AiMeta, ActionRow } from '../components/Chat'
import { Icon } from '../components/icons'

export const meta = { id: 'chat-light-router-en', title: 'Router settings chat (light)', source: 'ov_r1_c1' }

function Bullet({ children }: { children: string }) {
  return (
    <div className="mt-3 flex gap-2.5">
      <span className="shrink-0 text-[15px] leading-[1.5]">•</span>
      <span className="text-[15px] leading-[1.5]">{children}</span>
    </div>
  )
}

export default function ChatLightRouterEn() {
  return (
    <Phone theme="light">
      <TopBar
        dark={false}
        left={Icon.menu('#17181c')}
        center={<ModelPill dark={false} label="GPT-6.1 Sol" />}
        right={<>{Icon.clock('#17181c')}{Icon.edit('#17181c')}</>}
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-5">
        <UserBubble dark={false}>How do I check my home router for open ports and weak settings?</UserBubble>
        <div className="mt-2 rounded-card bg-light-bubble p-4">
          <div className="flex gap-2.5">
            <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-light-sub text-[12px] font-bold text-light-sub">
              !
            </span>
            <div>
              <div className="text-[15px] font-bold leading-[1.45]">Claude Sonnet 5.5 can&apos;t continue this chat</div>
              <p className="mt-2 text-[14px] leading-[1.55] text-light-sub">
                Anthropic&apos;s safety system flagged this request (cybersecurity). Medley switched to GPT-6.1 Sol
                for the rest of this chat. You weren&apos;t charged for the blocked attempt.
              </p>
              <div className="mt-3 flex gap-5">
                <span className="text-[14px] font-semibold">Learn more</span>
                <span className="text-[14px] font-semibold">Send feedback</span>
              </div>
            </div>
          </div>
        </div>
        <AiMeta dark={false} model="GPT-6.1 Sol · Switched" sub="Thought for 4s" />
        <p className="text-[16px] leading-[1.55]">
          Start in your router&apos;s admin page. Most weak spots are settings you can fix in a few minutes.
        </p>
        <Bullet>Update the firmware and change the default admin password.</Bullet>
        <Bullet>Turn off remote management, WPS and UPnP unless you need them.</Bullet>
        <Bullet>Check the connected devices list for anything you don&apos;t recognize.</Bullet>
        <ActionRow dark={false} credits="44 credits" />
        <div className="h-2" />
      </div>
      <InputBar dark={false} placeholder="Message GPT-6.1 Sol" mic="plain" />
    </Phone>
  )
}
