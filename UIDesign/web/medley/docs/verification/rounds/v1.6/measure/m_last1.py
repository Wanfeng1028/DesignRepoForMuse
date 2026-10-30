from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("radio Pro full bbox x95..132 y550..640 (R 90..200):")
pts=[(x,y) for y in range(550,641) for x in range(95,133) if 90<=max(pr.getpixel((x,y)))<=200]
xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={css(max(xs)-min(xs)+1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
print("radio center grid x105..125 y565..585 (R values):")
for y in range(565,586,2):
    print(f"  y={y}:", [pr.getpixel((x,y))[0] for x in range(105,126,2)])
print("Lite radio bbox x95..132 y440..530 (R 90..200):")
pts=[(x,y) for y in range(440,531) for x in range(95,133) if 90<=max(pr.getpixel((x,y)))<=200]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)}")
else: print("  none")
cr = Image.open(B+"hd5-credits.jpg").convert("RGB")
print("Buy button dark bbox x40..300 y350..440 (max<60):")
pts=[(x,y) for y in range(350,441) for x in range(40,301) if max(cr.getpixel((x,y)))<60]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={css(max(ys)-min(ys)+1)}css)")
print("legend dots: colored blobs y770..830 x60..420 (sat>40):")
pts=[]
for y in range(770,831):
    for x in range(60,421):
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
