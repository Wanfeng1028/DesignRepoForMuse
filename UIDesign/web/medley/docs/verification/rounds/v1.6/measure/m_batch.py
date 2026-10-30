from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
# --- Lisbon stop disc center row + square ---
im = Image.open(B+"hd5-lisbon.jpg").convert("RGB")
print("== lisbon stop disc row y=1038, peach run:")
run=[]; 
for x in range(400,600):
    r,g,b = im.getpixel((x,1038))
    peach = (180<r<250 and 130<g<190 and 100<b<160)
    run.append('P' if peach else '.')
s=''.join(run)
import re
for m in re.finditer(r'P+', s):
    print(f"  x{400+m.start()}..{400+m.end()-1} ({m.end()-m.start()}px = {css(m.end()-m.start())}css)")
print("== lisbon stop square: dark px bbox x470..545 y1000..1075:")
pts=[(x,y) for y in range(1000,1076) for x in range(470,546) if max(im.getpixel((x,y)))<60]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
print("== lisbon user bubble: non-bg bbox x180..590 y110..215 (bg=(13,14,16) tol 8):")
pts=[(x,y) for y in range(110,216) for x in range(180,591) if sum(abs(a-b) for a,b in zip(im.getpixel((x,y)),(13,14,16)))>24]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)}")
    for y in range(min(ys),min(ys)+30):
        xs2=[x for x in range(180,591) if sum(abs(a-b) for a,b in zip(im.getpixel((x,y)),(13,14,16)))>24]
        if xs2: print(f"   y={y} xmax={max(xs2)} xmin={min(xs2)}")
print("== GLM dot: saturated pink scan y250..380 x80..200:")
pts=[(x,y) for y in range(250,381) for x in range(80,201) if im.getpixel((x,y))[0]>150 and im.getpixel((x,y))[1]<140 and 80<im.getpixel((x,y))[2]<170 and im.getpixel((x,y))[0]-im.getpixel((x,y))[2]>40]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} n={len(pts)}")
else: print("  none")
# --- Welcome CN buttons ---
w = Image.open(B+"cn4-welcome-cn.jpg").convert("RGB")
print("== welcome CN size", w.size)
# find white button: rows with many near-white px
for y in range(0, w.size[1], 1):
    c=sum(1 for x in range(60,541) if max(w.getpixel((x,y)))>245)
    if c>400: pass
# instead: col x=300 profile y800..1305 (buttons near bottom)
print("welcome col x=300 y750..1305 runs:")
prev=None; start=0
for y in range(750,1305):
    px=w.getpixel((300,y))
    key = 'W' if max(px)>245 else ('D' if max(px)<40 else 'M')
    if key!=prev:
        if prev is not None: print(f"  y{start}..{y-1} {prev}")
        prev=key; start=y
print(f"  y{start}..1304 {prev}")
# --- CN home segment + stacked composer ---
ch = Image.open(B+"cn4-home-cn.jpg").convert("RGB")
print("== cn home size", ch.size)
print("cn home col x=300 y80..260:")
prev=None; start=0
for y in range(80,261):
    px=ch.getpixel((300,y))
    key='W' if max(px)>245 else ('G' if 225<=max(px)<=245 else 'D')
    if key!=prev:
        if prev is not None: print(f"  y{start}..{y-1} {prev} {ch.getpixel((300,start))}")
        prev=key; start=y
print(f"  y{start}..260 {prev}")
