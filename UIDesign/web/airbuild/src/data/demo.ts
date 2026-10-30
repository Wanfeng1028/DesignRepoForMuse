/**
 * DEMO CONTENT ONLY — structure from the official demo model (REA) and the
 * thread copy as legible in the App Store iPad shot (ipad-01). Desktop body
 * text in the user photo is unreadable, so the thread below follows the
 * iPad Hourtown thread, which is the same conversation. Names/roles for the
 * sidebar follow the user-photo left column (lowercase @role); the thread
 * author lines in ipad-01 use longer role titles for the same people.
 * Roles, status lines and online dots are demo state, not live data.
 */
import type { ProjectIconKey } from '../components/icons.tsx'
export interface Agent { key: string; name: string; role: string; status: string; color: string; online: boolean }
export const agents: Agent[] = [
  { key: 'ato', name: 'Ato', role: '@product', status: 'The new screens are ready to review.', color: '#97c151', online: true },
  { key: 'pluso', name: 'Pluso', role: '@developer', status: 'Action needed', color: '#52ccdb', online: true },
  { key: 'colo', name: 'Colo', role: '@design', status: 'The design is ready.', color: '#855dfe', online: false },
  { key: 'camo', name: 'Camo', role: '@gaming', status: 'Still working on, new app released', color: '#f9d01f', online: true },
  { key: 'ampo', name: 'Ampo', role: '@appstore', status: 'The latest build is ready to test.', color: '#4db7da', online: true },
  { key: 'leto', name: 'Leto', role: '@website', status: 'The sync issue is fixed.', color: '#f8ad43', online: false },
]
export const projects: { name: string; icon: ProjectIconKey; tint: string }[] = [
  { name: 'Hands Time', icon: 'clock', tint: '#e8e4da' },
  { name: 'Hourtown', icon: 'house', tint: '#d9ecdc' },
  { name: 'Sleepy Coffee', icon: 'cup', tint: '#f3e6d3' },
  { name: 'Casehot', icon: 'grid', tint: '#e3e0f5' },
]
export interface TaskStep { label: string; state: 'done' | 'active' | 'todo' }
export interface TaskCardData { title: string; status: string; progress: number; steps: TaskStep[] }
export type Msg =
  | { kind: 'agent'; agentKey: string; text: string; task?: TaskCardData }
  | { kind: 'user'; text: string }
  | { kind: 'typing'; agentKey: string }
export const thread: Msg[] = [
  { kind: 'agent', agentKey: 'ato', text: 'I’ve put together a direction for the first-session experience. The town stays at the center, with just enough guidance to help someone get started.' },
  { kind: 'user', text: 'Yes. Keep the soft green palette. And please make sure the town has room to breathe on iPad rather than just stretching the phone layout.' },
  { kind: 'agent', agentKey: 'ato', text: 'I’d keep the first release focused on three things:', task: {
    title: 'Make the first session rewarding', status: 'In progress · 2 of 3',
    progress: 66,
    steps: [
      { label: 'Define the first-session flow', state: 'done' },
      { label: 'Build the completion reveal', state: 'active' },
      { label: 'Check the layout on iPhone and iPad', state: 'todo' },
    ] } },
  { kind: 'agent', agentKey: 'pluso', text: 'I’ll keep the same visual language across both sizes. On iPad, the wider canvas gives the town more space while keeping the session controls easy to reach.' },
  { kind: 'agent', agentKey: 'colo', text: 'The iPad composition looks better with the town slightly larger and the controls grouped below it. On the phone, I’d keep the primary button near the bottom.' },
  { kind: 'user', text: 'Let’s try that. Also, what happens when I finish a session?' },
]
export const followUps = ['Send follow-up', 'Check the banner on iPad', 'Prepare for submission']
export const serviceModules = [
  { name: 'AirFeedback', desc: 'In-app feedback', tint: '#dbeafe' },
  { name: 'AirPayment', desc: 'Payments & subscriptions', tint: '#e0e7ff' },
  { name: 'AirRouter', desc: 'Deep links & routing', tint: '#dcfce7' },
  { name: 'AirKnowledge', desc: 'Docs & answers', tint: '#fef3c7' },
  { name: 'AirTraffic', desc: 'Growth & attribution', tint: '#fee2e2' },
]
