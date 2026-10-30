"""Build judge composites for UIDesign/app/airbuild round 3 (v1.5 renders).
Corrected screen crops (verified 2026-10-30 by grid overlay + bright-screen scan):
chat/draft share the upright template: screen interior x 148..1173, top y 833
  (earlier 482/283 tops were marketing-headline strokes, NOT the bezel).
detail: screen interior x 200..1121, top y 830.
briefing: phone top is cut by the marketing image; crop starts at image top y 0.
home: tilted hand-held photo; perspective-unwarped from estimated corners.
Panels are 390 wide; left panel height is 844 except chat/draft (774: the
marketing image ends at y 2868, the phone screen continues below it).
Composites: 44px header row (red LEFT: ORIGINAL / blue RIGHT: RENDER),
panels top-aligned below it. Gray fill = no original data, ignore it.
"""
import os
from PIL import Image, ImageDraw
J = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/judge/"
R = J + "renders/"
A = "/home/hatch/workspace/airbuild-refs/appstore/"
OUT = J + "composites/"
os.makedirs(OUT, exist_ok=True)

def find_coeffs(pa, pb):
    import numpy as np
    matrix = []
    for p1, p2 in zip(pa, pb):
        matrix.append([p1[0], p1[1], 1, 0, 0, 0, -p2[0] * p1[0], -p2[0] * p1[1]])
        matrix.append([0, 0, 0, p1[0], p1[1], 1, -p2[1] * p1[0], -p2[1] * p1[1]])
    a = np.array(matrix, dtype=float)
    b = np.array(pb, dtype=float).reshape(8)
    res = np.linalg.solve(a, b)
    return np.array(res).reshape(8)

def orig_panel(kind):
    if kind == "chat":
        im = Image.open(A + "iphone-03-build-with-your-team.jpg").crop((148, 833, 1173, 2868))
        return im.resize((390, 774), Image.LANCZOS), 774
    if kind == "draft":
        im = Image.open(A + "iphone-04-website-draft.jpg").crop((148, 833, 1173, 2868))
        return im.resize((390, 774), Image.LANCZOS), 774
    if kind == "detail":
        im = Image.open(A + "iphone-05-submit-for-review.jpg").crop((200, 830, 1121, 2823))
        return im.resize((390, 844), Image.LANCZOS), 844
    if kind == "briefing":
        im = Image.open(A + "iphone-06-daily-briefing.jpg").crop((150, 0, 1157, 2179))
        return im.resize((390, 844), Image.LANCZOS), 844
    if kind == "home":
        im = Image.open(A + "iphone-01-your-idea.jpg")
        coeffs = find_coeffs([(0, 0), (390, 0), (390, 844), (0, 844)],
                             [(585, 855), (1305, 780), (1140, 2610), (165, 2580)])
        return im.transform((390, 844), Image.PERSPECTIVE, coeffs, Image.BICUBIC), 844
    raise ValueError(kind)

for kind in ["chat", "detail", "home", "draft", "briefing"]:
    left, lh = orig_panel(kind)
    right = Image.open(R + kind + "-390.png").convert("RGB")
    canvas = Image.new("RGB", (792, 44 + 844), (255, 255, 255))
    d = ImageDraw.Draw(canvas)
    d.rectangle([0, 0, 390, 44], fill=(200, 30, 30))
    d.rectangle([402, 0, 792, 44], fill=(30, 90, 200))
    d.text((12, 14), "LEFT: ORIGINAL", fill=(255, 255, 255))
    d.text((414, 14), "RIGHT: RENDER", fill=(255, 255, 255))
    canvas.paste(left, (0, 44))
    if lh < 844:
        d.rectangle([0, 44 + lh, 390, 44 + 844], fill=(128, 128, 128))
    canvas.paste(right, (402, 44))
    canvas.save(OUT + kind + "-v1.5.jpg", quality=88)
    print(kind, "left_h", lh, "->", OUT + kind + "-v1.5.jpg")
