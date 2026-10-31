/**
 * iOS motion values for the web/medley set (v1.8, interaction line).
 *
 * Every value below is either an iOS platform convention or is marked
 * UNMEASURED. The originals are static screenshots: no original motion
 * duration, curve, dwell or streaming rate can be read off them, so
 * nothing here is claimed as a measured original value. What IS original
 * is the behaviour inventory itself (title rotation with one colour per
 * sentence, bottom sheets, drawers, push/pop navigation, segmented
 * switching, press feedback) — those behaviours belong to the iOS app
 * the screenshots depict, and the static gallery already renders their
 * resting states.
 *
 * Curves use the iOS standard ease (0.32, 0.72, 0, 1) already adopted
 * for morphing in v1.6; sheet/push timings are the platform's usual
 * presentation durations, not original measurements.
 */
export const IOS_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
/** Sheet present / dismiss (UNMEASURED — iOS presentation convention). */
export const SHEET_IN_MS = 500;
export const SHEET_OUT_MS = 400;
/** Push / pop navigation (UNMEASURED — iOS navigation convention). */
export const PUSH_MS = 350;
/** Segmented-control indicator slide (UNMEASURED). */
export const SEGMENT_MS = 300;
/** Title rotation dwell + crossfade (UNMEASURED — only the sapphire
 * frame and the per-sentence-colour rule are observed, see
 * WelcomePanel). */
export const ROTATE_DWELL_MS = 3200;
export const ROTATE_FADE_MS = 450;
/** Chat demo: thinking indicator hold + streaming word interval
 * (UNMEASURED — the originals only show the "thought for Ns" meta
 * line, never a live stream). */
export const THINK_MS = 900;
export const STREAM_WORD_MS = 40;
/** Press feedback: iOS buttons scale down slightly and dim on touch. */
export const PRESS_SCALE = 0.97;
