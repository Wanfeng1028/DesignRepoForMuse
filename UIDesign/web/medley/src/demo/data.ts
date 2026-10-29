/**
 * Demo content only. Every string below is copied from the original mobile
 * screens (muse/ screens + DESIGN-TOKENS.md) for gallery demonstration.
 * Components themselves take all copy as props and ship no demo text.
 */
import type { ModelSectionData, ModelRowData } from "../components/model-picker";
import type { PlanData } from "../components/pricing-panel";
import type { DrawerNavItem, DrawerRecentItem } from "../components/search-drawer";
import type { LanguageRow } from "../components/language-panel";
import type { SuspendedAction } from "../components/suspended-panel";
import type { AgentRowData } from "../components/agent-team-panel";
import type { Suggestion } from "../components/home-panel";

export const lisbon = {
  user: "Plan 3 days in Lisbon on a budget. I love food and good views.",
  aiIntro: "Here's a relaxed plan that keeps costs low and saves the best views for sunset.",
  day1: "Day 1: Alfama and the castle",
  bullets: [
    "Ride tram 28 before 9am, while it's still quiet.",
    "Lunch at a neighborhood tasca for under €12.",
    "Sunset at Miradouro da Senhora do Monte.",
  ],
  day2: "Day 2 works best as a slow eating day. Start at Time Out Market around 11am, before the lunch rush, and share a few small plates instead of one big meal. In the afternoon, walk up to Bairro Alto for a pastel de nata.",
  followUp: "Make day 2 all about food.",
};

export const lisbonCn = {
  user: "帮我规划三天里斯本穷游，我喜欢美食和看风景。",
  intro: "这份行程花费不高，节奏轻松，好风景留给日落。",
  day1: "第一天：阿尔法玛和城堡",
  items: ["早上 9 点前坐 28 路电车，人少。", "午饭找一家街坊小馆，12 欧以内。", "傍晚去 Senhora do Monte 看日落。"],
  day2: "第二天适合慢慢吃。上午 11 点前到 Time Out 市场，赶在午饭高峰之前，点几样小食分着吃，比一顿大餐更划算。下午走到 Bairro Alto，买一个葡式蛋挞。",
  followUp: "第二天全部安排吃的。",
};

export const train = {
  user: "Paris to Barcelona: train or plane?",
  verdict: "Take the train unless the flight is much cheaper.",
  body: "Once airport time is counted, flying saves only about 2.5 hours, and the train drops you in the city center.",
  headers: ["Train", "Plane"] as [string, string],
  rows: [
    ["Door to door", "About 7h", "About 4h 30m"],
    ["Typical fare", "€45–140", "€30–160"],
    ["Bags", "2 included", "Often extra"],
    ["Arrives at", "Barcelona Sants", "El Prat airport"],
  ] as [string, string, string][],
  suggestions: ["Find trains for next Friday", "Is there a night train?", "Add a stop in Montpellier"],
};

export const savings = {
  headline: "About $58,160. You put in $36,000 and the rest is growth. Try other amounts below.",
  sliders: [
    { label: "Monthly saving", value: "$200", fill: "16%" },
    { label: "Yearly return", value: "6%", fill: "44%" },
  ],
};

export const kyoto = {
  user: "2 days in Kyoto, temples and food",
  verdict: "Temples on dry Saturday, market on Sunday.",
  days: [
    { date: "Sat, Nov 1", weather: "19° clear", light: true },
    { date: "Sun, Nov 2", weather: "16° rain", light: false },
  ],
  timeline: [
    { time: "7:30", place: "Fushimi Inari", note: "Go before 8 to beat the crowds" },
    { time: "16:30", place: "Kiyomizu-dera", note: "Sunset from the wooden terrace" },
  ],
  poll: ["Nara and the deer park", "Arashiyama bamboo grove", "No, keep it relaxed"],
};

export const router = {
  user: "How do I check my home router for open ports and weak settings?",
  noticeTitle: "Claude Sonnet 5.5 can't continue this chat",
  noticeBody: "Anthropic's safety system flagged this request (cybersecurity). Medley switched to GPT-6.1 Sol for the rest of this chat. You weren't charged for the blocked attempt.",
  body: "Start in your router's admin page. Most weak spots are settings you can fix in a few minutes.",
  bullets: [
    "Update the firmware and change the default admin password.",
    "Turn off remote management, WPS and UPnP unless you need them.",
    "Check the connected devices list for anything you don't recognize.",
  ],
};

export const pickerASections: ModelSectionData[] = [
  {
    title: "Everyday", desc: "Fast and light, for everyday questions.",
    rows: [
      { name: "GLM-5.3 Flash", desc: "Fast everyday answers", cost: "-5" },
      { name: "DeepSeek V4.1 Flash", desc: "Quick answers, good at math and code", cost: "-11" },
    ],
  },
  {
    title: "Advanced", desc: "Better at writing and reasoning.",
    rows: [{ name: "GLM-5", desc: "Long documents and writing", cost: "-31" }],
  },
  {
    title: "Flagship", desc: "Strong all-rounders for serious work.",
    rows: [
      { name: "Claude Sonnet 5.5", desc: "Writing and coding", cost: "-80" },
      { name: "Kimi K3", desc: "Very long documents", cost: "-120" },
    ],
  },
  {
    title: "Frontier", desc: "The most capable models, for the hardest problems.",
    rows: [{ name: "Claude Fable 5.1", desc: "The hardest problems", cost: "-400", badge: "Pro" }],
  },
];

export const pickerBSections: ModelSectionData[] = [
  {
    title: "Advanced", desc: "Better at writing and reasoning.",
    rows: [{ name: "GLM-5", desc: "Long documents and writing", cost: "-31" }],
  },
  {
    title: "Flagship", desc: "Strong all-rounders for serious work.",
    rows: [{ name: "Claude Sonnet 5.5", desc: "Writing and coding", cost: "-80", selected: true }],
  },
];

export const pickerBUntitled: ModelRowData[] = [
  { name: "GPT-6.1 Sol", desc: "Advanced reasoning", cost: "-80" },
  { name: "Kimi K3", desc: "Very long documents", unavailableNote: "Not available in this chat" },
  { name: "Claude Opus 5.5", desc: "Deep, careful work", cost: "-160" },
];

export const pricingPlans: PlanData[] = [
  { name: "Lite", monthly: "$4.00/mo", yearly: "$47.99 a year" },
  {
    name: "Pro", monthly: "$16.00/mo", yearly: "$191.99 a year", selected: true, badge: "7 days free",
    detail: "80,000 credits a month, about 1,000 Claude Sonnet messages.",
    features: [
      "Claude Sonnet and Opus, GPT-5.1, GLM-5, Kimi K3",
      "Image generation and deep research",
      "30 agent tasks a month, 3 scheduled",
    ],
  },
  { name: "Pro+", monthly: "$56.00/mo", yearly: "$671.99 a year" },
];

export const creditsBars = [18, 24, 20, 32, 28, 40, 36, 48, 44, 58, 52, 64, 60, 72, 68, 80, 76, 88, 84, 96];
export const creditsLegend = [
  { label: "Claude", color: "#E4754A" },
  { label: "GLM", color: "#4A7DE4" },
  { label: "Kimi", color: "#9B5DE5" },
  { label: "DeepSeek", color: "#2EB5A5" },
];
export const creditsModels = [
  { name: "Claude Sonnet 5.5", messages: "480 messages", amount: "38,400", pct: "54%" },
  { name: "GLM-5", messages: "590 messages", amount: "18,300", pct: "26%" },
  { name: "Kimi K3", messages: "60 messages", amount: "7,200", pct: "10%" },
  { name: "DeepSeek V4.1 Flash", messages: "420 messages", amount: "4,620", pct: "6%" },
];

export const agentLead: AgentRowData = { role: "Lead", model: "Claude Sonnet 5.5", task: "Merging results from 4 agents", status: "Running", time: "31s" };
export const agentRows: AgentRowData[] = [
  { role: "Researcher", model: "DeepSeek V4 Pro", task: "Reading notion.com/pricing", status: "Running", time: "9s" },
  { role: "Researcher", model: "DeepSeek V4 Pro", task: "Searching 'Obsidian Sync price'", status: "Running", time: "7s" },
  { role: "Researcher", model: "DeepSeek V4 Pro", task: "Done: 2 plans found", status: "Done", time: "6s" },
  { role: "Analyst", model: "GPT-6.1 Sol", task: "Running code to build the table", status: "Running", time: "21s" },
  { role: "Reviewer", model: "GPT-6.1 Sol", task: "Waiting for a free slot", status: "Queued", time: "8s" },
];

export const drawerNav: DrawerNavItem[] = [
  { label: "Images", icon: "image" },
  { label: "Projects", icon: "folder" },
  { label: "Agent tasks", icon: "dots", badge: "1 running" },
  { label: "Flashcards", icon: "cards" },
];
export const drawerRecent: DrawerRecentItem[] = [
  { label: "Lisbon on a budget", dot: "#E4754A" },
  { label: "Fix my Python script", dot: "#4A7DE4" },
  { label: "Cell biology notes", dot: "#2EB5A5" },
  { label: "Q3 report summary", dot: "#9B5DE5" },
  { label: "Cover letter draft", dot: "#3FA34D" },
  { label: "Spanish verbs quiz", dot: "#4A7DE4" },
];

export const homeEnSuggestions: Suggestion[] = [
  { icon: "news", text: "What's in the news today" },
  { icon: "pdf", text: "Summarize a PDF" },
  { icon: "image", text: "Create an image" },
  { icon: "cards", text: "Make flashcards from my notes" },
];
export const homeCnSuggestions: Suggestion[] = [
  { icon: "news", text: "今天有什么新闻" },
  { icon: "pdf", text: "总结一份 PDF" },
  { icon: "searchOrbit", text: "深度研究一个话题", badge: "Pro" },
  { icon: "cards", text: "把笔记做成闪卡" },
];

export const languageRows: LanguageRow[] = [
  { name: "System default", sub: "English (United States)", selected: true },
  { name: "English" },
  { name: "简体中文", sub: "Chinese (Simplified)" },
  { name: "繁體中文", sub: "Chinese (Traditional)" },
  { name: "日本語", sub: "Japanese" },
  { name: "한국어", sub: "Korean" },
  { name: "Español", sub: "Spanish (Latin America)" },
  { name: "Português (Brasil)", sub: "Portuguese (Brazil)" },
  { name: "Français", sub: "French" },
  { name: "Deutsch", sub: "German" },
];

export const suspendedRows: SuspendedAction[] = [
  { label: "Export my data", icon: "download" },
  { label: "Delete account", icon: "trash" },
  { label: "Sign out", icon: "logout" },
];

export const chatInfo = {
  stats: [
    { value: "210", label: "Credits used" },
    { value: "9", label: "Tool calls" },
    { value: "6", label: "Messages" },
  ],
  modelChips: [
    { name: "GLM-5", dot: "#4A7DE4" },
    { name: "Claude Sonnet 5.5", dot: "#E4754A" },
    { name: "DeepSeek V4 Pro", dot: "#2EB5A5" },
  ],
  tools: [
    { name: "Web search", right: "4, 1 from saved results" },
    { name: "Pages read", right: "3" },
    { name: "Code runs", right: "1" },
    { name: "Weather", right: "1" },
  ],
  latestReply: { model: "Claude Sonnet 5.5", dot: "#E4754A", time: "10:21" },
  latestMetrics: [
    { label: "First token", value: "0.8s" },
    { label: "Speed", value: "62 tok/s" },
    { label: "Output", value: "1,240" },
    { label: "Credits", value: "141" },
    { label: "Tool calls", value: "6" },
    { label: "Thinking", value: "Medium" },
  ],
  replies: [
    { model: "GLM-5", dot: "#4A7DE4", right: "10:24, 28 credits, 1.1s" },
    { model: "DeepSeek V4 Pro", dot: "#2EB5A5", right: "10:17, 41 credits, 3.5s" },
  ],
  footnote: "First token is the time from sending to the first word. Speed counts the visible answer only.",
};
