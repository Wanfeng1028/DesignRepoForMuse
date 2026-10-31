"""v1.8 big-title weight audit: stem-width / cap-height ratios.

Method (NOT ink coverage — that method was voided in v1.7 for taking the
wrong band): for each title crop, binarize (adaptive midpoint threshold),
label connected components, take capTop = top of tall components and
baseline = modal bottom of tall components, then count full-height ink
columns (span >= 85% of cap height) and report the median run width as
the stem. Ratio = median stem / cap height (scale-free, so JPEG scale
and DSF cancel). Reference ratios come from PIL renders of the same
strings in SF Pro Display Bold and Semibold at 300px.

Decision rule (pre-registered): change a title Bold -> Semibold only if
the verdict is Semibold under BOTH the raw original ratio and a
blur-adjusted ratio (raw - 0.02, allowing for JPEG blur inflating the
original stems). Otherwise keep Bold and report inconclusive/Bold.
Browser-Bold must land near PIL-Bold (within 0.02) or the pipeline is
suspect and no token changes.
"""
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from collections import Counter, deque
import os, statistics as st

HERE = os.path.dirname(os.path.abspath(__file__))
STEM = os.path.join(HERE, "stem")
SF = os.path.expanduser("~/.local/share/fonts/sf-pro")
BOLD = os.path.join(SF, "SF-Pro-Display-Bold.otf")
SEMI = os.path.join(SF, "SF-Pro-Display-Semibold.otf")


def components(mask):
    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    comps = []
    for y in range(h):
        for x in range(w):
            if mask[y, x] and not seen[y, x]:
                q = deque([(y, x)])
                seen[y, x] = True
                pts = []
                while q:
                    cy, cx = q.popleft()
                    pts.append((cy, cx))
                    for dy in (-1, 0, 1):
                        for dx in (-1, 0, 1):
                            ny, nx = cy + dy, cx + dx
                            if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                                seen[ny, nx] = True
                                q.append((ny, nx))
                ys = [p[0] for p in pts]
                xs = [p[1] for p in pts]
                comps.append((min(ys), max(ys), min(xs), max(xs), len(pts)))
    return comps


def measure(gray, dark_bg):
    """gray: 2D uint8 array. Returns dict or None."""
    g = gray.astype(float)
    if dark_bg:
        bg = float(np.median(g))
        fg = float(np.percentile(g, 98))
        thr = (bg + fg) / 2.0
        mask = g > thr
    else:
        bg = float(np.median(g))
        fg = float(np.percentile(g, 2))
        thr = (bg + fg) / 2.0
        mask = g < thr
    comps = components(mask)
    if not comps:
        return None
    maxh = max(c[1] - c[0] + 1 for c in comps)
    kept = [c for c in comps if c[1] - c[0] + 1 >= 0.35 * maxh]
    cap_top = min(c[0] for c in kept)
    bottoms = Counter(c[1] for c in kept)
    baseline = bottoms.most_common(1)[0][0]
    cap_h = baseline - cap_top + 1
    band = mask[cap_top:baseline + 1, :]
    colsum = band.sum(axis=0)
    need = 0.85 * cap_h
    runs = []
    run = 0
    for v in colsum:
        if v >= need:
            run += 1
        elif run:
            runs.append(run)
            run = 0
    if run:
        runs.append(run)
    if not runs:
        return {"cap_h": cap_h, "runs": [], "median": None, "ratio": None, "thr": round(thr, 1)}
    med = float(st.median(runs))
    return {"cap_h": int(cap_h), "runs": runs, "median": med,
            "ratio": round(med / cap_h, 4), "thr": round(thr, 1)}


def pil_render(text, font_path, dark_bg):
    font = ImageFont.truetype(font_path, 300)
    tmp = Image.new("L", (3000, 600), 0)
    d = ImageDraw.Draw(tmp)
    d.text((20, 20), text, font=font, fill=255)
    bbox = tmp.getbbox()
    crop = tmp.crop((bbox[0] - 5, bbox[1] - 5, bbox[2] + 5, bbox[3] + 5))
    arr = np.asarray(crop)
    # White text on black -> invert to black on white, then measure in
    # light form (threshold symmetry makes the ratio identical).
    arr = 255 - arr
    return measure(arr, dark_bg=False)


TITLES = [
    # name, orig crop file, orig box (or None = whole file), dark_bg, css px
    ("welcome 41px", "orig-welcome-src.png", None, True, 41),
    ("greeting 27px", "orig-greeting-src.png", None, False, 27),
    ("pricing 22px", "orig-pricing-src.png", None, True, 22),
    ("credits 37px", "orig-credits-src.png", None, False, 37),
    ("suspended 26px", "orig-suspended-src.png", None, False, 26),
    ("picker 20px", "orig-picker-src.png", None, True, 20),
]
STRINGS = {
    "welcome 41px": "Let's discover",
    "greeting 27px": "Good evening, Alex",
    "pricing 22px": "Every top AI in one app",
    "credits 37px": "12,480",
    "suspended 26px": "Your account is suspended",
    "picker 20px": "Choose a model",
}
RENDER = {
    "welcome 41px": "render-welcome.png",
    "greeting 27px": "render-greeting.png",
    "pricing 22px": "render-pricing.png",
    "credits 37px": "render-credits.png",
    "suspended 26px": "render-suspended.png",
    "picker 20px": "render-picker.png",
}

print("== original vs browser-Bold vs PIL Bold/Semibold ==")
print("title | orig ratio (cap_h, runs) | browser-Bold | PIL Bold | PIL Semi | verdict")
verdicts = {}
for name, src, _box, dark_bg, _px in TITLES:
    o = measure(np.asarray(Image.open(os.path.join(STEM, src)).convert("L")), dark_bg)
    r = measure(np.asarray(Image.open(os.path.join(STEM, RENDER[name])).convert("L")), dark_bg)
    pb = pil_render(STRINGS[name], BOLD, dark_bg)
    ps = pil_render(STRINGS[name], SEMI, dark_bg)
    def fmt(m):
        return "-" if m is None or m["ratio"] is None else f'{m["ratio"]:.3f} (cap {m["cap_h"]}, runs {m["runs"]})'
    print(f"{name} | orig {fmt(o)} | browser {fmt(r)} | PIL-B {fmt(pb)} | PIL-S {fmt(ps)}")
    if o and pb and ps and o["ratio"] is not None:
        d_bold = abs(o["ratio"] - pb["ratio"])
        d_semi = abs(o["ratio"] - ps["ratio"])
        d_bold_adj = abs((o["ratio"] - 0.02) - pb["ratio"])
        d_semi_adj = abs((o["ratio"] - 0.02) - ps["ratio"])
        raw_semi = d_semi < d_bold - 0.015
        adj_semi = d_semi_adj < d_bold_adj - 0.015
        v = "SEMIBOLD" if (raw_semi and adj_semi) else ("BOLD" if d_bold < d_semi - 0.015 else "INCONCLUSIVE-KEEP-BOLD")
        verdicts[name] = v
        print(f"   -> d_bold={d_bold:.3f} d_semi={d_semi:.3f} | blur-adj d_bold={d_bold_adj:.3f} d_semi={d_semi_adj:.3f} | {v}")
    else:
        verdicts[name] = "UNMEASURED"
        print("   -> measurement failed")
print()
print("verdicts:", verdicts)
