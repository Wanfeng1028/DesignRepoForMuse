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
min 310px 42%`; titlebar 40px in the same three zones (sidebar zone:
traffic lights 17px gap 7px + 64×32 control capsule; conversation zone:
centred 32px squircle project icon; preview zone: device tabs + 64×32
action capsule; divider only at the preview boundary); sidebar bg
`rgba(226,228,226,0.56)` + hairline right border; conversation bg
`rgba(249,249,247,0.54)` (Shadow DOM override layer; v1.3); preview bg
flat `rgba(246,247,245,0.36)` (Shadow layer; v1.3, radial base value out);
agent bubble `#fff`, `rgba(0,0,0,0.045)` border,
`0 5px 16px rgba(0,0,0,0.025)` shadow, `10px 12px` padding, 13px radius,
12px/1.38, container max `min(84%, 330px)`; user bubble white on `#1987f7`, max-width `min(78%, 310px)`;
agent-row grid `30px 1fr auto`, gap 7px, min-height 42px, padding `4px 5px`,
radius 9px, name 11px/600, role em 400 muted `rgba(17,17,15,0.46)`, status 8px
muted `rgba(17,17,15,0.46)` (Shadow layer; v1.3), online dot 8px `#2ecb70`; project-tile grid 3 columns
gap 6px, aspect 1.25, radius 12px, bg `rgba(255,255,255,0.34)`, icon-only
32px / 32% radius (no name label); preview-tab 36px high,
76–180px wide, radius 9px, bg `#f7f7f5`, hover `#f2f2f0`, active
transparent + ink label, 10px/500 device label, icon 12px
opacity 0.45, close 9px (opacity 0, 0.3 on hover/active); phone 270px wide,
aspect 0.51, 7px `#d8d8d6` frame, radius 38px, shadow
`0 24px 48px rgba(0,0,0,0.24)`, statusbar 8px/700, appbar 42px, feed divider
inset from left 33px; follow-up composer 32px high,
capsule 999px, margin `0 14px 10px`, shared control gradient bg, no border,
`inset 0 1px rgba(255,255,255,0.38), 0 3px 8px rgba(0,0,0,0.08)` shadow,
`blur(4px) saturate(1.45)` backdrop (Shadow layer; v1.3); task card bg `#fffaf2`, border
hairline `rgba(17,17,15,0.045)` (Shadow layer; v1.3), radius 12px, padding 12px, 10px, title `#53412e`
11px/600, status `#88755e` on its own line under the title, steps then
4px track (`#e9e0d4` / `#72a682`, radius 3px); status pill `3px 7px`, 999px, 9px, success `#167b3d` on `#e7f8ed`;
toast bottom 16px centred, white on `rgba(18,18,18,0.88)`, 999px, 11px, `blur(18px)` backdrop; drawer
240ms `cubic-bezier(0.32,0.72,0,1)`; message entry 260ms
`cubic-bezier(.22,1,.36,1)`; font SF Pro Rounded first + system fallback;
resizer 8px wide. See `src/tokens/tokens.ts`.

## Components (all prop-driven; no brand copy hardcoded in components)

| Component | File | Notes |
|---|---|---|
| `AppWindow` + `ScaleCanvas` | `src/components/AppWindow.tsx` | Three-column grid + scale; device-tab state lives here; both collapsed states |
| `Titlebar` / `TrafficLights` | `src/components/Titlebar.tsx` | 40px, same three grid zones as the body: sidebar zone (17px lights + 64×32 control capsule), conversation zone (centred 32px project icon), preview zone (device tabs + new-tab + 64×32 action capsule); divider only at the preview boundary |
| `Sidebar` / `ProjectTile` / `AgentRow` | `src/components/Sidebar.tsx` | Icon-only project grid (3 cols, gap 6px) + agent list (illustrated avatar + name + @role + status line + green online dot) + 32px icon-only Account button + 3 32px round footer buttons (narrow-sidebar form, Shadow layer; v1.3); tile hover white 0.5 + up 1px, row hover white 0.5 |
| `AgentMessage` / `UserMessage` / `TypingRow` / `TaskCard` | `src/components/Message.tsx` | Avatar bottom-aligned; typing = 3× 5px `#aaa` dots, 800ms, 0/160/320ms stagger; task card = title, status line, steps, track |
| `FollowUpComposer` | `src/components/FollowUpComposer.tsx` | 32px capsule composer, `onSend` prop; attach `#ededeb`, send blue `#1987f7` (see Residuals 9) |
| `PreviewTabs` / `PhonePreview` | `src/components/Preview.tsx` | Tabs live in the titlebar; phone-statusbar (8px/700) / phone-appbar (42px) / phone-projects / phone-feed (divider inset 33px) |
| `ServiceModuleColumn` | `src/components/ServiceModuleColumn.tsx` | ORIGINAL right column: AirFeedback / AirPayment / AirRouter / AirKnowledge / AirTraffic |
| `BottomModuleBar` | `src/components/BottomModuleBar.tsx` | ADAPTED variant, labelled 改编（非原版） — not the original |
| `Toast` / `Resizer` | `src/components/Toast.tsx` | Toast bottom 16px, 11px; resizer 8px col-resize |
| `AvatarBlob` | `src/components/AvatarBlob.tsx` | Vector-redrawn illustrated member figures, one face per roster member (see Residuals) |
| `icons` | `src/components/icons.tsx` | Lucide (lucide-react) for all 19 used icons, strokeWidth 2; panel toggles are Lucide-geometry morph SVGs (divider slides, never hard-cuts) |
| `Button` / `Input` / `StatusPill` / `Separator` | `src/components/ui/` | shadcn-style; Button/Input via Radix Slot, Separator via Radix |
| `cn` | `src/lib/utils.ts` | clsx + tailwind-merge |
| `tokens` / `dark-tokens` | `src/tokens/` | Table A (live) / table B (reserve only, not rendered) |

The gallery page is `src/App.tsx`: it lists every component and example
screen. No Storybook. Gallery copy is demo content only (see Residuals).

## Verification

- Build: `/home/hatch/.npm-global/bin/pnpm build` → `tsc -b && vite build`,
  40 modules, built clean.
- Screenshots: `docs/verification/shoot.cjs` renders the `dist/` build with a
  headless Chromium and saves `gallery-1280.png` (full page),
  `gallery-1280-top.png` (1280×800 viewport) and `gallery-1200x668.png`
  (1200×668 canvas viewport). `docs/verification/shoot-sections.cjs`
  screenshots the three gallery windows individually (`window-main.png`,
  `window-sidebar-collapsed.png`, `window-preview-collapsed.png`) into
  `docs/verification/rounds/<version>/`; the root `check-*.png` files are
  copies of the latest collapsed windows. Note: the VM's `/opt/meta-chromium/chrome`
  currently refuses to start ("Hatch WebGL domain policy is required for
  browser startup"), so both scripts use the Playwright-cached
  `chrome-headless-shell` binary instead; the rendered page is the same
  `dist/` build, and `file://` is used with `--allow-file-access-from-files`.
- Judging: every round is judged by `qiniu/conatus-free` (BotsRouter) on
  the render side by side with the real originals (user-photo desktop crop
  + App Store iPad shot). Round verdicts live in `CHANGELOG.md`; a round is
  clean only on an explicit zero-substantive-difference verdict.

Comparison against the references (v1.1 state, measured from code + shots):

- Three-column grid + fixed 1200×668 canvas + scale: window renders at full
  width, sidebar / conversation / preview proportions match the REA grid;
  at 1280px viewport the canvas scales to fit without reflowing.
- Titlebar: 40px, three zones matching the body grid; 17px traffic lights
  (gap 7px); sidebar zone with 64×32 control capsule; conversation zone
  with the 32px project icon measured centred (main 447px, sidebar-collapsed
  ~432px per the 174px compensation, preview-collapsed ~678px per the 48px
  strip); preview zone with the 10px `iOS 26.5` device tab + new-tab +
  action capsule; divider only at the preview boundary.
- Sidebar project tiles: 3-column grid, gap 6px, icon-only 32px squircle
  vector mini-icons (Hands Time / Hourtown / Sleepy Coffee / Casehot —
  the iPad project set, not the web demo's 8-project set).
- Agent rows: blob avatar + name + lowercase @role + status sentence +
  green online dot; footer = 32px icon-only Account button + Home / Settings / Activity (32px).
- Agent white bubbles (container max `min(84%, 330px)`) / user blue bubbles
  (`min(78%, 310px)`) / task card (title, status line, steps, track at the
  bottom) / typing dots `#aaa` / composer capsule with gradient attach
  and blue ↑ send / toast bottom-16px centred (pill centre measured x=639
  vs window centre 640 in v1.2; bottom value corrected to the Shadow layer in v1.3).
- Preview tabs in the titlebar + iPhone preview: 270px wide, aspect 0.51,
  7px `#d8d8d6` frame, 38px radius, centred stage; feed dividers inset
  from left 33px.
- Service module column (original, right side): five modules with
  coloured mini-icons and round action buttons, matching the user photo's
  right column names and order.
- Bottom module bar: present ONLY as the labelled adapted variant, kept
  visually separate from the original column.
- Collapsed states: sidebar-collapsed renders the traffic lights +
  control capsule as a 170px transparent overlay with the conversation
  title compensated by 174px and the message stream unshifted (padding
  stays 16px); preview-collapsed renders a 48px titlebar strip with the
  toggle and no body preview column.
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
4. Avatar portraits have no vector source: avatars are vector-redrawn
   illustrated figures (one distinct face per roster member: Ato green +
   sprout, Pluso blue open smile, Colo amber + freckles, Camo yellow
   happy-arc eyes, Ampo blue + glasses, Leto pink + blush and hair tuft),
   not the official webp portraits, and their exact colours and faces
   are not claimed. The demo roster has no Qesto member, so no Qesto
   figure is drawn; Leto carries the pink figure.
9. Composer send button, platform conflict: the web demo's base CSS makes
   the send button near-black `#111` (its Shadow DOM layer restyles the
   floating controls as white gradient), while the native App Store shots
   show a blue ↑ button. This package keeps the blue `#1987f7` send button
   per the high-resolution native visual evidence; the web-demo black /
   gradient variant is not rendered.
10. Task card, platform difference: the web demo card is title, status line,
    steps, progress track (this package follows it). The native iPad card
    shows no track and no status line, but a "View task >" link at the
    bottom right; that link is not rendered here.
11. Project set, source mix: the sidebar shows the 4 iPad projects (Hands
    Time / Hourtown / Sleepy Coffee / Casehot) in the web demo's 3-column
    grid, so the second row holds a single tile. The web demo's own roster
    has 8 projects (Soft Moon / Level / Pigeon / Touch Time / Lofi Dot /
    AirBuild / Slobox + Hands Time); those four extra names are not shown.
5. Font fallback on non-Apple devices: SF Pro Rounded exists only on Apple
   devices; elsewhere the stack falls back to SF Pro Display /
   -apple-system / Helvetica Neue / Arial, so rendering there will differ.
6. Official bitmap assets are not used anywhere: icons are Lucide
   (lucide-react) at strokeWidth 2, so stroke weight and corner details
   follow Lucide, not the official raster icons.
7. The real in-app chat room (native iOS) is not open source and is not in
   the public web bundles; this package reproduces the official web demo
   model (REA) + the user photo layout, not the native app's internals.
8. Resizer drag behaviour and the original message-playback timing are
   component contracts, not a pixel-verified interaction: the gallery
   shows the states, it does not claim the original's live drag physics.
