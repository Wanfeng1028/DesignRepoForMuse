# UIDesign / app / airbuild — AirBuild style, mobile

Self-contained component set in the AirBuild idiom, for a phone single-column
layout. Copy this directory into a project and it runs on its own:
Vite + React + TS + Tailwind CSS v4 + Radix primitives (shadcn style:
component source lives in the repo, only `@radix-ui/react-slot` is used,
for the Button `asChild` path). No Ant Design, no MUI, no Next.js.

## Run

```sh
pnpm install
pnpm build   # tsc -b && vite build
pnpm dev
```

`vite.config.ts` sets `base: './'` so the build output also renders from
`file://`. The gallery page is `src/App.tsx`: phone frames at 390x844
logical size, one example screen per App Store screenshot, plus a component
inventory screen. Append `?screen=home|chat|briefing|draft|detail|components`
to render a single screen (used for the verification screenshots).

## Sources (1:1 basis)

- App Store official screenshots (iPhone 1320x2868, iPad 2064x2752) in
  `~/workspace/airbuild-refs/appstore/`, read frame by frame:
  `iphone-03` chat thread, `iphone-06` daily briefing + composer,
  `iphone-01` home, `iphone-04` website draft, `iphone-05` detail panel,
  `ipad-01` wide-layout cross-check.
- `~/workspace/airbuild-rea/AIRBUILD-REA-20261029.md` table A, reused
  where it agrees with the phone screenshots: ink `#11110f`,
  muted `rgba(17,17,15,0.46)`, user bubble blue `#1987f7`, online green
  `#2ecb70`, task card `#fffaf2` / border `rgba(94,74,46,0.12)`,
  status pill padding `3px 7px`, radius `999px`, size `9px`,
  font stack `SF Pro Rounded` first with system fallbacks.
- `~/workspace/airbuild-refs/REFERENCE-INDEX-20261029.md`, especially the
  "best reference" table and the "still missing" list.
- NOT used as a basis: BotsTalk `design-airbuild.css` (an approximation:
  `#f6f6f7`, 12px radius) and the web three-column model (the rea report
  itself states the web model has no mobile layout).

## Components (all take their copy through props)

| Component | File | Notes |
|---|---|---|
| phone-frame | `src/components/phone-frame.tsx` | 390x844 logical, bezel, status bar |
| top-bar (chat + home) | `src/components/top-bar.tsx` | Chat: back chevron + project pill + … menu. Home: cloud icon + four-leaf mark + + |
| message (agent / user / typing) | `src/components/message.tsx` | Agent white bubble, user `#1987f7` bubble, typing dots |
| file-card | `src/components/file-card.tsx` | Doc icon + filename + `type · size` |
| task-list-card | `src/components/task-list-card.tsx` | Warm `#fffaf2` card, circle items, View task |
| website-draft-card | `src/components/website-draft-card.tsx` | Browser chrome (traffic lights + URL pill + share) + headline + Download + cover + footnote |
| detail-panel | `src/components/detail-panel.tsx` | Status card + store cards + Versions + Progress |
| briefing-cards | `src/components/briefing-cards.tsx` | The Air Daily card + Sales Report card (stats + SVG line chart) |
| composer | `src/components/composer.tsx` | Hand button + + button row, text + blue circular up-arrow send |
| member-activity-row | `src/components/member-activity-row.tsx` | Blob avatar + name + @role + status + time |
| project-card-grid | `src/components/project-card-grid.tsx` | 2x2 grid, pill label overlapping the tile bottom |
| avatar | `src/components/avatar.tsx` | Own redrawn circular blob character |
| ui | `src/components/ui/` | `button` (Radix Slot), `card`, `pill` / `StatusPill` |
| tokens | `src/tokens/index.ts`, `src/index.css` | `@theme` tokens = CSS variables |

## Demo content notice

The gallery screens reuse the official demo wording (project names,
member names, "Make the first session rewarding", "Hands Time led the
growth", "1204 / $386") so the screenshots can be compared against the
App Store originals. That wording is demo content only: every component
renders whatever is passed in through props, and no brand wording is
hard-coded into any component. No official bitmap assets are used anywhere:
icons are redrawn SVG, avatars are redrawn blobs, project tiles and card
covers are abstract gradients, and the store glyphs are generic redraws
(storefront awning / propeller), not Apple artwork.

## Verification

Build receipt and per-item comparison: `docs/verification/COMPARISON.md`.
Screenshots in `docs/verification/` were taken from the `dist/` build with
a headless Chromium (Playwright-managed `chromium_headless_shell`, since
the VM's `/opt/meta-chromium/chrome` refuses to start here: it exits 13
with "Hatch WebGL domain policy is required for browser startup" without
the browser-daemon policy) at 390x844 and 430x932 viewports, one screen
per shot via `?screen=`.

## Residuals (honest gaps, not 1:1)

- Character portraits have no vector source, so exact portrait colours
  cannot be reproduced; avatars are own redrawn approximations in the
  same coloured-blob idiom.
- The iPad 4th official screenshot URL is dead (404 at every size);
  its content is unknown, so that screen is not built.
- Settings, account, project creation and dark mode have no public
  screenshots at all; every public screenshot is light, so this set is
  light-only.
- Fonts fall back on non-Apple devices: SF Pro Rounded exists only on
  Apple devices, so rendering elsewhere uses the system fallback stack.
- How the three columns collapse on small screens cannot be confirmed
  from any public source; this set implements the App Store phone
  single-column layout and claims no official correspondence with the
  desktop three-column layout.
- Project tiles and report covers use abstract placeholders: the
  official app imagery (photos, app screenshots) is not copied.
