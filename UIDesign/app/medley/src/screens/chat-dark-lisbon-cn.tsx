import type { ReactNode } from 'react'
import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { UserBubble, AiMeta, ActionRow, SourcesChip } from '../components/Chat'
import { Icon } from '../components/icons'

export const meta = { id: 'chat-dark-lisbon-cn', title: 'Lisbon chat (dark, CN)', source: 'cn_r0_c2' }

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-[6px] border border-dark-divider px-[6px] py-[1px] text-[11px] leading-[1.6] text-dark-sub">
      {children}
    </span>
  )
}

function CnItem({ text, tags }: { text: string; tags?: string[] }) {
  return (
    <div className="flex items-start gap-2 text-item leading-[1.5] text-dark-text">
      <span className="shrink-0 text-dark-sub">–</span>
      <span className="flex-1">{text}</span>
      {tags && (
        <span className="inline-flex shrink-0 gap-1">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </span>
      )}
    </div>
  )
}

export default function ChatDarkLisbonCn() {
  return (
    <Phone theme="dark">
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar
          dark
          left={
            <span className="ml-[-8px] flex h-[42px] w-[42px] items-center justify-center rounded-full bg-dark-input">
              {Icon.menu('#f5f5f7')}
            </span>
          }
          center={
            <div className="flex w-full items-center">
              <div className="ml-[-30px] flex flex-col items-start rounded-full bg-[#1c2026] px-4 py-2 leading-[1.15]">
                <span className="text-[12px] font-bold text-dark-text">里斯本穷游三天</span>
                <span className="flex items-center gap-1 text-[10px] text-dark-sub">
                  {Icon.folder('#9a9ba2', 12)}
                  旅行
                </span>
              </div>
            </div>
          }
          right={
            <span className="flex items-center gap-5 rounded-full bg-[#1a202a] px-1.5 py-[11px]">
              {Icon.edit('#f5f5f7', 15)}
              {Icon.moreVertical('#f5f5f7', 20)}
            </span>
          }
        />
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-0">
          <UserBubble dark>帮我规划三天里斯本穷游，我喜欢美食和看风景。</UserBubble>
          <AiMeta dark model="GLM-5 · 自动" sub="搜索了 6 个网站，思考了 3 秒" dot={false} />
          <div className="text-[15px] leading-[1.67] text-dark-text">这份行程花费不高，节奏轻松，好风景留给日落。</div>
          <div className="mt-[14px] text-body font-bold leading-[1.55] text-dark-text">第一天：阿尔法玛和城堡</div>
          <div className="mb-[-4px] mt-2 flex flex-col gap-2">
            <CnItem text="早上 9 点前坐 28 路电车，人少。" tags={['visitlisboa']} />
            <CnItem text="午饭找一家街坊小馆，12 欧以内。" />
            <CnItem text="傍晚去 Senhora do Monte 看日落。" tags={['timeout', '+1']} />
          </div>
          <SourcesChip dark badges={['T', 'L', 'V']} countLabel="3个来源" />
          <ActionRow dark credits="28积分 1.1秒 71 tok/s" />
          <div className="my-[25px] mb-0.5 flex justify-end">
            <div className="rounded-chip border border-dark-divider px-[18px] py-2.5 text-item text-dark-text">第二天全部安排吃的。</div>
          </div>
          <AiMeta dark model="Claude Sonnet 5.5" sub="思考了 2 秒" dot={false} />
          <div className="text-[15px] leading-[1.67] text-dark-text">
            第二天适合慢慢吃。上午 11 点前到 Time Out 市场，赶在午饭高峰之前，点几样小食分着吃，比一顿大餐更划算。下午走到
            Bairro Alto，买一个葡式蛋挞。
            <span className="ml-1.5 inline-block h-[9px] w-[9px] rounded-full bg-brand-dot align-middle" />
          </div>
        </div>
        <InputBar dark placeholder="有问题，尽管问" modelLabel="Sonnet 5.5" mic="stop" variant="double" />
      </div>
    </Phone>
  )
}
