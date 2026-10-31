"""v1.8 resweep: v1.8 panel/section shots vs v1.7, with numbers.
Reports size, mean abs diff, % pixels with max-channel diff > 10, and
the bounding box of differing pixels (to prove diffs localize to the
changed title glyphs, not to layout/material regressions).
"""
from PIL import Image
import numpy as np
import os

HERE = os.path.dirname(os.path.abspath(__file__))
V18 = HERE
V17 = os.path.join(HERE, "..", "v1.7")

PANELS = ["panel-welcome.png", "panel-home-en.png", "panel-home-cn.png",
          "panel-chat-lisbon.png", "panel-pricing.png", "panel-credits.png",
          "panel-picker-a.png", "panel-chat-info.png", "panel-drawer.png",
          "panel-suspended.png", "panel-language.png", "panel-agent-team.png",
          "panel-phone-chrome.png"]
SECTIONS = ["sec-welcome.png", "sec-home.png", "sec-chat.png", "sec-picker.png",
            "sec-pricing.png", "sec-credits.png", "sec-agent-team.png",
            "sec-drawer.png", "sec-chat-info.png", "sec-suspended.png",
            "sec-language.png", "sec-composer.png", "sec-desktop-lisbon.png",
            "sec-desktop-home.png", "sec-phone-chrome.png"]


def diffstat(a_path, b_path):
    a = np.asarray(Image.open(a_path).convert("RGB"), dtype=int)
    b = np.asarray(Image.open(b_path).convert("RGB"), dtype=int)
    if a.shape != b.shape:
        return {"size_a": a.shape[1::-1] if a.ndim == 3 else a.shape,
                "size_b": b.shape[1::-1] if b.ndim == 3 else b.shape,
                "shape_diff": True}
    d = np.abs(a - b)
    mx = d.max(axis=2)
    ys, xs = np.where(mx > 10)
    box = None
    if len(xs):
        box = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))
    return {"size": (a.shape[1], a.shape[0]),
            "mean_abs": round(float(d.mean()), 3),
            "pct_gt10": round(100.0 * float((mx > 10).mean()), 3),
            "ndiff": int((mx > 10).sum()),
            "box": box}


print("== panels v1.8 vs v1.7 ==")
for f in PANELS:
    pa, pb = os.path.join(V18, f), os.path.join(V17, f)
    if not (os.path.exists(pa) and os.path.exists(pb)):
        print(f, "MISSING", os.path.exists(pa), os.path.exists(pb))
        continue
    print(f, diffstat(pa, pb))
print("== sections v1.8 vs v1.7 ==")
for f in SECTIONS:
    pa, pb = os.path.join(V18, f), os.path.join(V17, f)
    if not (os.path.exists(pa) and os.path.exists(pb)):
        print(f, "MISSING", os.path.exists(pa), os.path.exists(pb))
        continue
    print(f, diffstat(pa, pb))
print("== new in v1.8 (no v1.7 baseline) ==")
for f in ["panel-interactive.png", "sec-interactive.png", "gallery-fullpage.png"]:
    p = os.path.join(V18, f)
    if os.path.exists(p):
        print(f, Image.open(p).size)
