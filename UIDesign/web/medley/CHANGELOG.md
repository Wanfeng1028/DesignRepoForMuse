# Medley — Desktop / Web CHANGELOG

> Scope: UIDesign/web/medley only. Desktop layout itself has no original
> image; 1:1 covers tokens and component forms (see README residual 1).

## v1.0 — 2026-10-29 (baseline)

- 2026-10-29 delivery, user verdict: not up to standard, rework required.
  This entry is the rework baseline: prior two-round self-check (README
  "Verification") claimed component matches with 8 filed residuals; the
  rework loop below re-verifies every component against the real Doubao
  collages with an independent vision judge (qiniu/conatus-free) instead
  of trusting the prior self-check.
- Build: `/home/hatch/.npm-global/bin/pnpm build` passes
  (tsc -b && vite build).
- Verification tooling added this round: `scripts/shot-viewport.cjs`
  (1280x800 / 1440x900 viewport shots, same headless-shell renderer as
  `scripts/shot-fullpage.cjs`) and `scripts/judge.py` (vision-judge client;
  token only from env, never written to disk).
- Screenshots for this baseline: `docs/verification/rounds/v1.0/` —
  `gallery-1280x800.png`, `gallery-1440x900.png`, `gallery-fullpage.png`
  (1280x13028), 9 slices in `crops/`, per-section render crops +
  per-phone original crops + judge prompts in `judge/`.
- **STOPPED at judge pilot J1 (Welcome) — rate limit, iteration halted
  per the conatus rate-limit iron rule (no sleep-retry, no model swap).**
  `qiniu/conatus-free` returned HTTP 429
  (`free_campaign_global_limit`, request id in `judge/judge-j1.err`).
  No judge verdict was obtained for any component; no code was changed
  in this round; no v1.1 exists. Pending judge queue on resume:
  J1 welcome, J2 home EN/CN, J3 lisbon/train, J4 savings/kyoto,
  J5 router, J6 picker A/B, J7 pricing, J8 credits, J9 agent team,
  J10 drawer/chat-info, J11 suspended/language, J12 composer states.
- Candidate (UNVERIFIED, not fixed — needs judge confirmation on
  resume): suspended panel buttons. Gallery demo props pass
  primary "Contact support" / secondary "Sign out", while the verified
  mobile reference (`muse/src/screens/suspended-light.tsx`, itself
  checked against the original in 3 rounds) renders primary "Appeal" /
  secondary "Contact support", with "Sign out" only as a "You can still:"
  row. If the judge confirms against the original suspended phone
  (`ov_r2_c3`), fix = change the two demo props in `src/App.tsx` only
  (component is props-driven); then rebuild, re-screenshot, re-judge.
