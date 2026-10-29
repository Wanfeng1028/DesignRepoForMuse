/**
 * DEMO CONTENT ONLY — official demo-story structure (user/agent/progress/followUp),
 * NOT a claim of verbatim 1:1 desktop text. Desktop body text in the user photo
 * is unreadable; see README "Residuals". Names/roles below are from the REA roster
 * and the user-photo member column (Leto / Ampo / Camo / Colo / Pluso / Ato).
 */
export interface Agent { key: string; name: string; role: string; bio: string; color: string; bg: string; status?: string }
export const agents: Agent[] = [
  { key: 'ato', name: 'Ato', role: '@Product', bio: 'Product lead', color: '#2f7d4f', bg: '#cdeed9', status: 'Online' },
  { key: 'pluso', name: 'Pluso', role: '@Developer', bio: 'Builds the app', color: '#0b6fa4', bg: '#cdeaff', status: 'Online' },
  { key: 'colo', name: 'Colo', role: '@Designer', bio: 'Visual direction', color: '#b45309', bg: '#ffe4c2', status: 'Online' },
  { key: 'camo', name: 'Camo', role: '@Gaming', bio: 'Play & polish', color: '#92400e', bg: '#fde68a' },
  { key: 'ampo', name: 'Ampo', role: '@AppStore', bio: 'Submission & review', color: '#1d4ed8', bg: '#dbeafe' },
  { key: 'leto', name: 'Leto', role: '@Website', bio: 'Web & review', color: '#be185d', bg: '#fbcfe8' },
]
export const projects = [
  { name: 'Hands Time', icon: '◷', tint: '#e8e4da' },
  { name: 'Hourtown', icon: '⌂', tint: '#d9ecdc' },
  { name: 'Sleepy Coffee', icon: '☕', tint: '#f3e6d3' },
  { name: 'Casehot', icon: '▣', tint: '#e3e0f5' },
]
export interface TaskStep { label: string; state: 'done' | 'active' | 'todo' }
export interface TaskCardData { title: string; status: string; progress: number; steps: TaskStep[] }
export type Msg =
  | { kind: 'agent'; agentKey: string; text: string; task?: TaskCardData }
  | { kind: 'user'; text: string }
  | { kind: 'typing'; agentKey: string }
export const thread: Msg[] = [
  { kind: 'agent', agentKey: 'ato', text: 'Here is a direction for the first-session experience. The town stays at the centre, with just enough guidance to help someone get started.' },
  { kind: 'user', text: 'Yes. Keep the soft green palette, and make sure the town has room to breathe on iPad rather than just stretching the phone layout.' },
  { kind: 'agent', agentKey: 'ato', text: 'I will keep the first release focused on three things:', task: {
    title: 'Make the first session rewarding', status: 'In progress · 2 of 3',
    progress: 66,
    steps: [
      { label: 'Define the first-session flow', state: 'done' },
      { label: 'Build the completion reveal', state: 'active' },
      { label: 'Check the layout on iPhone and iPad', state: 'todo' },
    ] } },
  { kind: 'agent', agentKey: 'pluso', text: 'I will keep the same visual language across both sizes. On iPad, the wider canvas gives the town more space while keeping the session controls easy to reach.' },
]
export const followUps = ['Send follow-up', 'Check the banner on iPad', 'Prepare for submission']
export const serviceModules = [
  { name: 'AirFeedback', desc: 'In-app feedback', tint: '#dbeafe' },
  { name: 'AirPayment', desc: 'Payments & subscriptions', tint: '#e0e7ff' },
  { name: 'AirRouter', desc: 'Deep links & routing', tint: '#dcfce7' },
  { name: 'AirKnowledge', desc: 'Docs & answers', tint: '#fef3c7' },
  { name: 'AirTraffic', desc: 'Growth & attribution', tint: '#fee2e2' },
]
