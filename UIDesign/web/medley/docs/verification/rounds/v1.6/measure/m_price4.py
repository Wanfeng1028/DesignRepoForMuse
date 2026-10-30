from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("== row y=620 x30..130 raw:")
print(" ", [(x, pr.getpixel((x,620))) for x in range(30,131,2)])
print("== col x=100 y540..820 runs:")
prev=None
for y in range(540,821):
    px=pr.getpixel((100,y))
    k='BG' if max(px)<24 else ('CARD' if 24<=max(px)<=45 else ('BORD' if 90<=max(px)<=190 else 'TXT'))
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== CTA col x=150 y930..1040:")
prev=None
for y in range(930,1041):
    px=pr.getpixel((150,y))
    k='W' if max(px)>245 else ('BG' if max(px)<24 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== radio ring x95..145 y550..600 (R 90..200):")
pts=[(x,y) for y in range(550,601) for x in range(95,146) if 90<=max(pr.getpixel((x,y)))<=200]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css) n={len(pts)}")
print("== Pro dots low-sat scan y680..810 x120..400 (sat>25, max>110):")
pts=[]
for y in range(680,811):
    for x in range(120,401):
        r,g,b = pr.getpixel((x,y))
        if max(r,g,b)-min(r,g,b)>25 and max(r,g,b)>110:
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
    if len(cl[2])<8: continue
    xs=[p[0] for p in cl[2]]; ys=[p[1] for p in cl[2]]
    cs=sorted([p[2] for p in cl[2]]); med=cs[len(cs)//2]
    print(f"  dot cx~{cl[0]:.0f} cy~{cl[1]:.0f} x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} med={med} n={len(cl[2])}")
