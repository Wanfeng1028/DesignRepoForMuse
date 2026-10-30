from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("radio ASCII x95..140 y553..595 (char by R: .=<40, :=40-90, o=90-160, O=160-220, #>220):")
for y in range(553,596):
    line=""
    for x in range(95,141):
        r=pr.getpixel((x,y))[0]
        line += '.' if r<40 else (':' if r<90 else ('o' if r<160 else ('O' if r<220 else '#')))
    print(f"  y={y} {line}")
ch = Image.open(B+"cn4-home-cn.jpg").convert("RGB")
print("CN stacked: col x=300 y1050..1355 (CARD if max>250, BG if <40, else MID):")
prev=None
for y in range(1050,1355):
    px=ch.getpixel((300,y))
    k='CARD' if max(px)>250 else ('BG' if max(px)<40 else 'MID')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("CN placeholder text band x60..300 y1150..1300 (grey 100..200 count):")
for y in range(1150,1301):
    c=sum(1 for x in range(60,301) if 100<=max(ch.getpixel((x,y)))<=200)
    if c>10: print(f"  y={y} n={c}")
print("CN controls: plus bbox x50..110 y1200..1355 (dark<120):")
pts=[(x,y) for y in range(1200,1355) for x in range(50,111) if max(ch.getpixel((x,y)))<120]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)}")
print("CN mic disc bbox x500..580 y1200..1355 (dark<60):")
pts=[(x,y) for y in range(1200,1355) for x in range(500,581) if max(ch.getpixel((x,y)))<60]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
cr = Image.open(B+"hd5-credits.jpg").convert("RGB")
print("credits Buy col x=150 y340..440:")
prev=None
for y in range(340,441):
    px=cr.getpixel((150,y))
    k='BLACK' if max(px)<60 else ('BG' if max(px)>235 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("credits legend sat blobs y650..830 x60..500:")
pts=[]
for y in range(650,831):
    for x in range(60,501):
        r,g,b = cr.getpixel((x,y))
        if max(r,g,b)-min(r,g,b)>40 and max(r,g,b)>100:
            pts.append((x,y,cr.getpixel((x,y))))
clusters=[]
for (x,y,c) in pts:
    placed=False
    for cl in clusters:
        if abs(cl[0]-x)<15 and abs(cl[1]-y)<15:
            cl[2].append((x,y,c)); cl[0]=sum(p[0] for p in cl[2])/len(cl[2]); cl[1]=sum(p[1] for p in cl[2])/len(cl[2]); placed=True; break
    if not placed: clusters.append([x,y,[(x,y,c)]])
clusters.sort(key=lambda cl: cl[0])
for cl in clusters:
    if len(cl[2])<5: continue
    xs=[p[0] for p in cl[2]]; ys=[p[1] for p in cl[2]]
    cs=sorted([p[2] for p in cl[2]]); med=cs[len(cs)//2]
    print(f"  dot cx~{cl[0]:.0f} cy~{cl[1]:.0f} x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} med={med} n={len(cl[2])}")
