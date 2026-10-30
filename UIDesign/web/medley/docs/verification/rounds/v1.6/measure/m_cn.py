from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
ch = Image.open(B+"cn4-home-cn.jpg").convert("RGB")
print("== CN segment row y=130 x150..460 runs (W>252, C 232..242, P 243..250, D<200):")
prev=None; start=150
for x in range(150,461):
    r=ch.getpixel((x,130))[0]
    k='W' if r>252 else ('C' if 232<=r<=242 else ('P' if 243<=r<=250 else 'D'))
    if k!=prev:
        if prev is not None: print(f"  x{start}..{x-1} {prev}")
        prev=k; start=x
print(f"  x{start}..460 {prev}")
for cx in [250, 350]:
    print(f"== CN segment col x={cx} y80..180:")
    prev=None
    for y in range(80,181):
        r=ch.getpixel((cx,y))[0]
        k='W' if r>252 else ('C' if 232<=r<=242 else ('P' if 243<=r<=250 else 'D'))
        if k!=prev: print(f"  y={y} {k} {ch.getpixel((cx,y))}"); prev=k
print("== CN stacked composer col x=300 y1150..1355:")
prev=None
for y in range(1150,1355):
    px=ch.getpixel((300,y))
    k='CARD' if max(px)>250 else ('BG' if max(px)<40 else 'MID')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== CN mic disc: dark px bbox x480..580 y1220..1355:")
pts=[(x,y) for y in range(1220,1355) for x in range(480,581) if max(ch.getpixel((x,y)))<60]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
print("== CN M mark: dark px bbox x30..130 y680..800:")
pts=[(x,y) for y in range(680,801) for x in range(30,131) if max(ch.getpixel((x,y)))<100]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
print("== CN Pro text: dark px bbox x500..580 y980..1060:")
pts=[(x,y) for y in range(980,1061) for x in range(500,581) if max(ch.getpixel((x,y)))<150]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
# Pricing
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("== pricing size", pr.size)
print("== pricing col x=300 y250..1206 (card/segment bands):")
prev=None
for y in range(250,1206):
    px=pr.getpixel((300,y))
    k='CARD' if 28<=max(px)<=40 else ('BG' if max(px)<25 else 'MID')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
