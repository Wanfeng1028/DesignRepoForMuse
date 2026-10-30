from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("== pricing top dots: saturated blobs y120..210 x80..340")
# find connected-ish blobs: print all pixels with saturation (max-min>40) grouped by x-bands
pts=[]
for y in range(120,211):
    for x in range(80,341):
        r,g,b = pr.getpixel((x,y))
        if max(r,g,b)-min(r,g,b)>45 and max(r,g,b)>120:
            pts.append((x,y,pr.getpixel((x,y))))
# cluster by proximity: simple grid clustering
clusters=[]
for (x,y,c) in pts:
    placed=False
    for cl in clusters:
        if abs(cl[0]-x)<20 and abs(cl[1]-y)<20:
            cl[2].append((x,y,c)); cl[0]=(cl[0]*0+sum(p[0] for p in cl[2]))/len(cl[2]); cl[1]=sum(p[1] for p in cl[2])/len(cl[2]); placed=True; break
    if not placed: clusters.append([x,y,[(x,y,c)]])
clusters.sort(key=lambda cl: cl[0])
for cl in clusters:
    xs=[p[0] for p in cl[2]]; ys=[p[1] for p in cl[2]]
    # center color: median of cluster
    cs=sorted([p[2] for p in cl[2]])
    med=cs[len(cs)//2]
    print(f"  dot cx~{cl[0]:.0f} cy~{cl[1]:.0f} x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} med={med} n={len(cl[2])}")
print("== pricing Pro card border: row y=560 x60..540 (card top edge region?) — instead scan col x=100 y520..760 for border rows:")
prev=None
for y in range(520,761):
    px=pr.getpixel((100,y))
    k='CARD' if 24<=max(px)<=40 else ('BORD' if 90<=max(px)<=170 else ('BG' if max(px)<24 else 'TXT'))
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
