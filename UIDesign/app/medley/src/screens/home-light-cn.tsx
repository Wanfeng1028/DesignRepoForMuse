import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { InputBar } from '../components/InputBar'
import { SuggestionRow } from '../components/Chat'
import { Icon } from '../components/icons'
import { MedleyMark } from '../components/Model'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'

export const meta = { id: 'home-light-cn', title: 'Home (light, CN)', source: 'cn_r0_c1' }

export default function HomeLightCn() {
  return (
    <Phone theme="light" className="bg-white">
      <div className="flex min-h-0 flex-1 flex-col bg-white">
        <TopBar
          dark={false}
          left={Icon.menu('#17181c')}
          center={
            <Tabs defaultValue="chat" className="rounded-chip bg-light-card p-[3px]">
              <TabsList className="gap-0">
                <TabsTrigger value="chat" className="rounded-[16px] px-[14px] py-[6px] text-[14px] text-light-sub data-[state=active]:bg-light-bubble data-[state=active]:text-light-text">
                  聊天
                </TabsTrigger>
                <TabsTrigger value="agents" className="px-[14px] py-[6px] text-[14px] font-medium text-light-sub data-[state=active]:bg-light-bubble data-[state=active]:text-light-text">
                  智能体
                </TabsTrigger>
              </TabsList>
            </Tabs>
          }
          right={Icon.clock('#17181c')}
        />
        <div className="min-h-0 flex-1" />
        <div className="px-5">
          <MedleyMark size={30} color="#17181c" />
          <div className="mt-[14px] text-greeting font-semibold leading-[1.25] text-light-text">晚上好，Alex</div>
        </div>
        <div className="mt-[18px] border-t border-light-divider px-5 pt-0.5">
          <SuggestionRow dark={false} icon={Icon.news('#6b6c72')} text="今天有什么新闻" />
          <SuggestionRow dark={false} icon={Icon.pdf('#6b6c72')} text="总结一份 PDF" />
          <SuggestionRow dark={false} icon={Icon.searchOrbit('#6b6c72')} text="深度研究一个话题" badge="Pro" />
          <SuggestionRow dark={false} icon={Icon.cards('#6b6c72')} text="把笔记做成闪卡" />
        </div>
        <div className="h-3" />
        <InputBar dark={false} placeholder="有问题，尽管问" modelLabel="自动" sendDark variant="double" />
      </div>
    </Phone>
  )
}
