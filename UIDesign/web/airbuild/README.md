# UIDesign / web / airbuild — AirBuild style × desktop/web

Self-contained design system. Copy this folder into a project and use it directly.
Stack (fixed by the user, not negotiable): Vite + React + TS + Tailwind CSS v4
+ Radix primitives, shadcn-style (component source copied into the repo, owned
by us). No Ant Design, no MUI, no Next.js.

## Run

```sh
/home/hatch/.npm-global/bin/pnpm install
/home/hatch/.npm-global/bin/pnpm build   # tsc -b && vite build
/home/hatch/.npm-global/bin/pnpm dev
```

`vite.config.ts` sets `base: './'` so the build output also loads from `file://`
(note: Chromium needs `--allow-file-access-from-files` for Vite's module
scripts under `file://`; see `docs/verification/`).

## Sources (read before building, in this order)

1. `~/workspace/airbuild-rea/AIRBUILD-REA-20261029.md` — table A chat-window
   tokens are the single source of truth for this package.
2. `~/workspace/airbuild-refs/user-photo-chatroom-crop.jpg` — the only desktop
   three-column evidence (left member column + centre chat with a central
   "Save for Later" card + right service-module column).
3. `~/workspace/airbuild-refs/REFERENCE-INDEX-20261029.md` — best-reference
   table and the "still missing" list.
4. `~/workspace/airbuild-refs/appstore/ipad-01.jpg` — tablet chat room
   (left project column + member column + right thread).

NOT a source: BotsTalk's `design-airbuild.css` is an approximation
(#f6f6f7, 12px radii) and was not used as a basis. The marketing-page dark
theme (#141414 family, REA table C) is kept out of the chat window: the chat
window is always light; the dark chat variant (REA table B) lives only in
`src/tokens/dark-tokens.ts` as a token reserve and is not rendered.

## Tokens (REA table A, implemented verbatim)

Canvas 1200×668 fixed + whole-canvas `transform: scale()` adaptation (never
reflowed); window radius 18px; window bg `rgba(244,246,244,0.42)` +
`blur(34px) saturate(1.24)`; ink `#11110f`; muted `rgba(17,17,15,0.46)`;
hairline `rgba(17,17,15,0.045)`; divider `rgba(17,17,15,0.22)`; blue `#1987f7`;
green `#2ecb70`; grid `sidebar 198px / conversation min 320px 1fr / preview
min 310px 42%`; sidebar bg `rgba(226,228,226,0.56)`; conversation bg
`rgba(249,249,247,0.92)`; preview bg radial-gradient (50% 22% white →
`#f7f7f5` → `#e4e4e2`); agent bubble `#fff`, `rgba(0,0,0,0.045)` border,
`0 5px 16px rgba(0,0,0,0.025)` shadow, `10px 12px` padding, 13px radius,
12px/1.38; user bubble white on `#1987f7`, max-width `min(78%, 310px)`;
agent-row grid `30px 1fr auto`, gap 7px, min-height 42px, padding `4px 5px`,
radius 9px, name 11px/600, bio 8px; project-tile aspect 1.25, radius 12px,
bg `rgba(255,255,255,0.34)`, icon 32px / 32% radius; preview-tab 36px high,
76–180px wide, radius 9px, bg `#f7f7f5`; follow-up composer 32px high,
capsule 999px, margin `0 14px 10px`, bg `rgba(255,255,255,0.94)`,
`0 10px 28px rgba(0,0,0,0.065)` shadow; task card bg `#fffaf2`, border
`rgba(94,74,46,0.12)`, radius 12px, padding 12px, 10px, title `#53412e`
11px/600; status pill `3px 7px`, 999px, 9px, success `#167b3d` on `#e7f8ed`;
toast bottom 30px centred, white on `rgba(18,18,18,0.88)`, 999px; drawer
240ms `cubic-bezier(0.32,0.72,0,1)`; message entry 260ms
`cubic-bezier(.22,1,.36,1)`; font SF Pro Rounded first + system fallback;
traffic-lights titlebar; resizer 8px wide. See `src/tokens/tokens.ts`.

## Components (all prop-driven; no brand copy hardcoded in components)

| Component | File | Notes |
|---|---|---|
| `AppWindow` + `ScaleCanvas` | `src/components/AppWindow.tsx` | Three-column grid + scale; both collapsed states |
| `Titlebar` / `TrafficLights` | `src/components/Titlebar.tsx` | Red/yellow/green lights, new, sidebar/preview toggles |
| `Sidebar` / `ProjectTile` / `AgentRow` | `src/components/Sidebar.tsx` | Project grid + agent list + round footer buttons |
| `AgentMessage` / `UserMessage` / `TypingRow` / `TaskCard` | `src/components/Message.tsx` | Typing = 3× 5px dots, 800ms, 0/160/320ms stagger |
| `FollowUpComposer` | `src/components/FollowUpComposer.tsx` | 32px capsule composer, `onSend` prop |
| `PreviewTabs` / `PhonePreview` | `src/components/Preview.tsx` | phone-statusbar / phone-appbar / phone-projects / phone-feed |
| `ServiceModuleColumn` | `src/components/ServiceModuleColumn.tsx` | ORIGINAL right column: AirFeedback / AirPayment / AirRouter / AirKnowledge / AirTraffic |
| `BottomModuleBar` | `src/components/BottomModuleBar.tsx` | ADAPTED variant, labelled 改编（非原版） — not the original |
| `Toast` / `Resizer` | `src/components/Toast.tsx` | Toast bottom 30px; resizer 8px col-resize |
| `AvatarBlob` | `src/components/AvatarBlob.tsx` | Self-drawn circular blob avatar (see Residuals) |
| `icons` | `src/components/icons.tsx` | All 12 official icon semantics redrawn as vector SVG |
| `Button` / `Input` / `StatusPill` / `Separator` | `src/components/ui/` | shadcn-style; Button/Input via Radix Slot, Separator via Radix |
| `cn` | `src/lib/utils.ts` | clsx + tailwind-merge |
| `tokens` / `dark-tokens` | `src/tokens/` | Table A (live) / table B (reserve only, not rendered) |

The gallery page is `src/App.tsx`: it lists every component and example
screen. No Storybook. Gallery copy is demo content only (see Residuals).

## Verification

- Build: `/home/hatch/.npm-global/bin/pnpm build` → `tsc -b && vite build`,
  40 modules, built clean (see build receipt in the final report).
- Screenshots: `docs/verification/shoot.cjs` renders the `dist/` build with a
  headless Chromium and saves `gallery-1280.png` (full page),
  `gallery-1280-top.png` (1280×800 viewport) and `gallery-1200x668.png`
  (1200×668 canvas viewport), plus `check-collapsed.png` and
  `check-sidebar-collapsed.png` crops. Note: the VM's `/opt/meta-chromium/chrome`
  currently refuses to start ("Hatch WebGL domain policy is required for
  browser startup"), so the script uses the Playwright-cached
  `chrome-headless-shell` binary instead; the rendered page is the same
  `dist/` build, and `file://` is used with `--allow-file-access-from-files`.

Comparison against the references (read from the screenshots, item by item):

- Three-column grid + fixed 1200×668 canvas + scale: PASS — window renders
  at full width, sidebar / conversation / preview proportions match the
  REA grid; at 1280px viewport the canvas scales to fit without reflowing.
- Window glass (translucent bg + blur + 18px radius) + traffic lights: PASS
  (backdrop blur is not visible on the flat grey gallery background, which
  is expected — the value is in code, not faked).
- Sidebar project tiles (2×2, aspect 1.25) + agent rows (avatar + name +
  @role + bio + Online): PASS — matches the user photo's left column
  (Leto / Ampo / Camo / Colo / Pluso / Ato) and ipad-01's member column.
- Agent white bubbles / user blue bubbles / task card with progress + steps:
  PASS — colours, radii and the #fffaf2 task card match REA table A and the
  ipad-01 "Make the first session rewarding" card shape.
- Follow-up composer capsule + toast: PASS — capsule with + and blue ↑
  buttons; toast renders bottom-centred (it transiently overlaps the
  composer row, as a bottom-30px toast over a bottom-anchored composer does).
- Preview tabs + iPhone preview: PASS — 36px tabs, phone frame, 3-column
  project grid, 48px feed rows; statusbar redrawn as vector bars + battery.
- Service module column (original, right side): PASS — five modules with
  coloured mini-icons and round action buttons, matching the user photo's
  right column names and order.
- Bottom module bar: present ONLY as the labelled adapted variant, kept
  visually separate from the original column.
- Collapsed states: PASS — sidebar-collapsed renders sidebar width 0 with
  the conversation stream shifted by the REA 174px compensation (190px
  total left padding incl. the 16px base); preview-collapsed renders only
  the 48px vertical "Preview" strip.
- Resizer: present as an 8px col-resize separator component (drag-to-resize
  wiring is left to the host app; the gallery does not fake a drag).

## Residuals (honest gaps — not 1:1, not approximated away)

1. Desktop chat body text is not available in high resolution: the user
   photo's message text is unreadable, so body copy is reproduced from the
   REA demo-story structure (user/agent/progress/followUp) and is NOT
   claimed to be verbatim 1:1 desktop text.
2. All public images are light: whether a dark mode exists is unknown.
   This package ships light only; the REA table B dark tokens are stored
   as a reserve file (`src/tokens/dark-tokens.ts`) and are not rendered
   as a main style.
3. No official evidence exists for a bottom module bar: the bottom bar in
   this package is an adaptation (BotsTalk-style), explicitly labelled
   改编（非原版）; the original is the right-hand column.
4. Avatar portraits have no vector source: avatars are self-drawn circular
   blob approximations (initial + tint), not the official webp portraits,
   and their exact colours are not claimed.
5. Font fallback on non-Apple devices: SF Pro Rounded exists only on Apple
   devices; elsewhere the stack falls back to SF Pro Display /
   -apple-system / Helvetica Neue / Arial, so rendering there will differ.
6. Official bitmap assets are not used anywhere: the 12 icons are redrawn
   vector SVGs in the same semantics, so stroke weight and corner details
   may differ slightly from the official raster icons.
7. The real in-app chat room (native iOS) is not open source and is not in
   the public web bundles; this package reproduces the official web demo
   model (REA) + the user photo layout, not the native app's internals.
8. Resizer drag behaviour and the original message-playback timing are
   component contracts, not a pixel-verified interaction: the gallery
   shows the states, it does not claim the original's live drag physics.
