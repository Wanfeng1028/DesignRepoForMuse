from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("== Pro card row y=650 x40..560 runs (classify by R):")
prev=None; start=40
for x in range(40,561):
    r,g,b = pr.getpixel((x,650))
    k='BG' if r<24 else ('CARD' if 24<=r<=45 else ('BORD' if 90<=r<=180 else 'TXT'))
    if k!=prev:
        if prev is not None: print(f"  x{start}..{x-1} {prev} {pr.getpixel((x-1,650))}")
        prev=k; start=x
print(f"  x{start}..560 {prev}")
print("== Pro dots: saturated blobs y720..790 x120..360:")
pts=[]
for y in range(720,791):
    for x in range(120,361):
        r,g,b = pr.getpixel((x,y))
        if max(r,g,b)-min(r,g,b)>45 and max(r,g,b)>120:
            pts.append((x,y,pr.getpixel((x,y))))
clusters=[]
for (x,y,c) in pts:
    placed=False
    for cl in clusters:
        if abs(cl[0]-x)<20 and abs(cl[1]-y)<20:
            cl[2].append((x,y,c)); cl[0]=sum(p[0] for p in cl[2])/len(cl[2]); cl[1]=sum(p[1] for p in cl[2])/len(cl[2]); placed=True; break
    if not placed: clusters.append([x,y,[(x,y,c)]])
clusters.sort(key=lambda cl: cl[0])
for cl in clusters:
    xs=[p[0] for p in cl[2]]; ys=[p[1] for p in cl[2]]
    cs=sorted([p[2] for p in cl[2]]); med=cs[len(cs)//2]
    print(f"  dot cx~{cl[0]:.0f} cy~{cl[1]:.0f} x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} med={med} n={len(cl[2])}")
print("== segmented control col x=300 y360..460:")
prev=None
for y in range(360,461):
    px=pr.getpixel((300,y))
    k='BG' if max(px)<24 else ('CONT' if 24<=max(px)<=40 else 'SEL' if 40<max(px)<=60 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== CTA col x=300 y900..1010:")
prev=None
for y in range(900,1011):
    px=pr.getpixel((300,y))
    k='W' if max(px)>245 else ('BG' if max(px)<24 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== radio Pro: ring px x95..150 y540..600 dark/light ring:")
pts=[(x,y) for y in range(540,601) for x in range(95,151) if 60<=max(pr.getpixel((x,y)))<=200]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
