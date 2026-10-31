/**
 * iOS status bar + home indicator + Dynamic Island (v1.7).
 * Geometry is verbatim from baoyu-design/starter-components/ios-frame.jsx
 * (iOS 26 UI Kit + Figma status bar spec), scaled by width/402 — never
 * copied blindly at 402: the gallery frame is 390 CSS, so s = 390/402 =
 * 0.970 and every spec value below is multiplied by s (see the adaptation
 * table in CHANGELOG v1.7). No Lucide approximation is used for the status
 * glyphs: signal / wifi / battery are the spec's own SVG paths.
 * Photo-9 cross-check: the real screenshots confirm the FORMS (4 ascending
 * signal bars, wifi 2 arcs + dot, battery rounded rect + nub, semibold
 * time left, white pill indicator centred, dark/light colorways) but their
 * absolute pixels do not reduce to one scale (time cap ~13px vs indicator
 * height ~11px vs cluster span ~90px imply mutually inconsistent scales —
 * a stitched collage, not a uniform screenshot), so the spec stays the
 * geometry authority and photo-9 stays form evidence (CHANGELOG v1.7).
 */
function sc(v: number, s: number) {
  return Math.round(v * s * 10) / 10;
}

export function IOSStatusBar({
  dark = false,
  time = "10:24",
  width = 390,
  island = false,
}: {
  dark?: boolean;
  time?: string;
  width?: number;
  island?: boolean;
}) {
  const s = width / 402;
  const c = dark ? "#ffffff" : "#000000";
  return (
    <div
      style={{
        display: "flex",
        gap: sc(154, s),
        alignItems: "center",
        justifyContent: "center",
        padding: `${sc(21, s)}px ${sc(24, s)}px ${sc(19, s)}px`,
        boxSizing: "border-box",
        position: "relative",
        zIndex: 20,
        width: "100%",
      }}
    >
      <div
        style={{
          flex: 1,
          height: sc(22, s),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: sc(1.5, s),
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, "SF Pro", system-ui',
            fontWeight: 590,
            fontSize: sc(17, s),
            lineHeight: `${sc(22, s)}px`,
            color: c,
          }}
        >
          {time}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          height: sc(22, s),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: sc(7, s),
          paddingTop: sc(1, s),
          paddingRight: sc(1, s),
        }}
      >
        <svg width={sc(19, s)} height={sc(12, s)} viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} />
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} />
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} />
        </svg>
        <svg width={sc(17, s)} height={sc(12, s)} viewBox="0 0 17 12">
          <path
            d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z"
            fill={c}
          />
          <path
            d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z"
            fill={c}
          />
          <circle cx="8.5" cy="10.5" r="1.5" fill={c} />
        </svg>
        <svg width={sc(27, s)} height={sc(13, s)} viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c} />
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
      {island && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: sc(11, s),
            transform: "translateX(-50%)",
            width: sc(126, s),
            height: sc(37, s),
            borderRadius: sc(24, s),
            background: "#000000",
          }}
        />
      )}
    </div>
  );
}

export function HomeIndicator({ dark = false, width = 390 }: { dark?: boolean; width?: number }) {
  const s = width / 402;
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingBottom: sc(8, s) }}>
      <div
        style={{
          width: sc(139, s),
          height: sc(5, s),
          borderRadius: sc(100, s),
          background: dark ? "#ffffff" : "#000000",
        }}
      />
    </div>
  );
}
