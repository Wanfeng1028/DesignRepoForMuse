from PIL import Image
import os
ORIG = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
pr = Image.open(os.path.join(ORIG, "hd5-pricing.jpg")).convert("RGB")
# badge: scan y=598 (Pro text row) for light pixels x190..310
for y in [592, 598, 604, 610]:
    lights = [x for x in range(190, 320) if sum(pr.getpixel((x,y))) > 300]
    print("pricing y", y, "light xs:", (min(lights), max(lights)) if lights else None)
    darks = [x for x in range(190, 320) if sum(pr.getpixel((x,y))) < 150]
    print("   dark xs:", (min(darks), max(darks)) if darks else None)
cr = Image.open(os.path.join(ORIG, "hd5-credits.jpg")).convert("RGB")
# chart card edges: row y=600 white extent
row = [x for x in range(0, 600) if sum(cr.getpixel((x,600))) > 740]
print("credits y600 white extent:", (min(row), max(row)) if row else None)
col = [y for y in range(450, 560) if sum(cr.getpixel((100,y))) > 740]
print("credits x100 white top:", (min(col), max(col)) if col else None)
col2 = [y for y in range(700, 850) if sum(cr.getpixel((100,y))) > 740]
print("credits x100 white bottom:", (min(col2), max(col2)) if col2 else None)
# bars: scan rows near baseline for colored runs
def runs(y):
    out = []; cur = None
    for x in range(40, 560):
        r,g,b = cr.getpixel((x,y))
        sat = max(r,g,b)-min(r,g,b)
        colored = sat > 25 and sum((r,g,b)) < 700
        if colored and cur is None: cur = x
        if not colored and cur is not None: out.append((cur, x-1)); cur = None
    if cur is not None: out.append((cur, 559))
    return out
for y in [740, 720, 690, 660, 630, 600, 570]:
    print("bars y", y, "runs:", runs(y))
