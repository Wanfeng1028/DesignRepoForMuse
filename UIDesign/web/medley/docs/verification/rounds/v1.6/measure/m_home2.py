from PIL import Image
import statistics
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
im = Image.open(B+"hd5-home-en.jpg").convert("RGB")
# menu bars: row darkness counts x35..95, y105..130, threshold <170
print("menu rows (dark<170 count, x35..95):")
for y in range(105,130):
    c = sum(1 for x in range(35,96) if max(im.getpixel((x,y)))<170)
    xs = [x for x in range(35,96) if max(im.getpixel((x,y)))<170]
    print(f"  y={y} n={c} x={min(xs) if xs else '-'}..{max(xs) if xs else '-'}")
print("clock region rows (grey<200 count, x520..560):")
for y in range(100,135):
    xs = [x for x in range(515,565) if max(im.getpixel((x,y)))<200]
    if xs: print(f"  y={y} n={len(xs)} x={min(xs)}..{max(xs)}")
print("pill row y=145 samples every 10px x200..400:")
print(" ", [im.getpixel((x,145)) for x in range(200,401,20)])
print("pill col x=270 y100..190 (find pill top/bottom edges):")
prev=None
for y in range(100,195):
    px=im.getpixel((270,y))
    if px!=prev: print(f"  y={y} {px}"); prev=px
print("row medians y880..1180 (x100..500, R channel), local peaks marked:")
meds={}
for y in range(880,1181):
    vals=[im.getpixel((x,y))[0] for x in range(100,501)]
    meds[y]=statistics.median(vals)
for y in range(882,1179):
    if meds[y]>=meds[y-1]+2 and meds[y]>=meds[y+1]+2:
        print(f"  peak y={y} medR={meds[y]} (nbr {meds[y-1]},{meds[y+1]})")
print("greeting row dark counts y750..900 (x40..570, <100):")
for y in range(750,901):
    c=sum(1 for x in range(40,571) if max(im.getpixel((x,y)))<100)
    if c>0: print(f"  y={y} n={c}")
