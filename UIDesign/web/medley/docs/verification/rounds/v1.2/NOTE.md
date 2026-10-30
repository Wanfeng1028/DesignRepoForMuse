# v1.2 evidence — D-01 fix only

Scope: the round4 J11a verdict-driven suspended-panel button fix.
This directory is NOT a claim that the set is clean: round4 returned
14/14 FAIL, and only the J11a button item was fixed here. Full queue
evidence and triage: `../round4/SUMMARY.md`.

- `gallery-fullpage.png` — post-fix fullpage (differs from the round4
  pre-fix fullpage only in button-label pixels, rows 11258-11272).
- `suspended-fixed.png` — fresh suspended crop from the post-fix
  fullpage (same offset 10650, height 950 as the round4 crop).
- `J11a-verdict-before.txt` — round4 J11a FAIL (buttons
  "Contact support"/"Sign out" vs original "Appeal"/"Contact support").
- `J11a-verdict-after.txt` — re-judge PASS on the fresh crop, both
  button labels explicitly confirmed.

Change: `src/App.tsx` demo props only (component is props-driven):
primaryLabel "Contact support" -> "Appeal", secondaryLabel "Sign out"
-> "Contact support". "Sign out" remains as a "You can still:" row, as
in the original. Build passes (`pnpm build`: tsc -b && vite build).
