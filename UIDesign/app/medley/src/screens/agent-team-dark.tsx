import { Phone } from '../components/Phone'
import { TopBar } from '../components/TopBar'
import { Icon } from '../components/icons'
import { AgentRow, AgentStatus, CreditsProgress } from '../components/AgentTeam'

export const meta = { id: 'agent-team-dark', title: 'Agent team task (dark)', source: 'ov_r2_c4' }

export default function AgentTeamDark() {
  return (
    <Phone theme="dark">
      <TopBar dark left={Icon.back('#f5f5f7')} right={Icon.more('#f5f5f7')} />
      <div className="min-h-0 flex-1 overflow-y-auto scroll-momentum px-5">
        <h1 className="my-0.5 mb-2.5 text-[17px] font-bold leading-[1.3]">
          Compare the pricing of 12 note-taking<br />apps
        </h1>
        <div className="flex gap-4 text-[13px] text-dark-sub">
          <span>Team, 6 agents</span>
          <span>Auto review</span>
        </div>
        <CreditsProgress label="1,240 of 6,000 credits" step="Step 3 of 8" percent="20%" />
        <div className="mt-4 rounded-card bg-dark-card px-4 py-3">
          <div className="flex items-center justify-between gap-2.5">
            <span className="text-[14px]">
              <span className="font-bold">Lead</span>
              <span className="text-dark-sub"> · Claude Sonnet 5.5</span>
            </span>
            <AgentStatus label="Running" />
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2.5">
            <div className="text-[14px] text-dark-sub">Merging results from 4 agents</div>
            <span className="shrink-0 text-[13px] text-dark-sub">31s</span>
          </div>
        </div>
        <div className="mt-5 text-[15px] font-bold">Agents</div>
        <AgentRow role="Researcher" model="DeepSeek V4 Pro" task="Reading notion.com/pricing" status="Running" time="9s" />
        <AgentRow role="Researcher" model="DeepSeek V4 Pro" task="Searching 'Obsidian Sync price'" status="Running" time="7s" />
        <AgentRow role="Researcher" model="DeepSeek V4 Pro" task="Done: 2 plans found" status="Done" time="6s" />
        <AgentRow role="Analyst" model="GPT-6.1 Sol" task="Running code to build the table" status="Running" time="21s" />
        <AgentRow role="Reviewer" model="GPT-6.1 Sol" task="Waiting for a free slot" status="Queued" time="8s" />
        <div className="mt-4 flex gap-3">
          <span className="flex h-12 flex-1 items-center justify-center rounded-button border border-dark-divider text-[15px] font-semibold">
            Pause all
          </span>
          <span className="flex h-12 flex-1 items-center justify-center rounded-button border border-dark-divider text-[15px] font-semibold">
            Stop all
          </span>
        </div>
        <div className="h-3" />
      </div>
      <div className="shrink-0 px-4">
        <div className="flex h-[52px] items-center gap-2.5 rounded-input bg-dark-input py-0 pl-[14px] pr-2">
          <span className="flex text-dark-sub">{Icon.plus('#9a9ba2')}</span>
          <span className="flex-1 text-[15px] text-dark-dim">Add an instruction</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
            {Icon.send('#111214')}
          </span>
        </div>
      </div>
    </Phone>
  )
}
