from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
pk = Image.open(B+"hd5-pickerA.jpg").convert("RGB")
print("picker Auto dots wide scan y180..380 x50..230 (sat>35):")
pts=[]
for y in range(180,381):
    for x in range(50,231):
        r,g,b = pk.getpixel((x,y))
        if max(r,g,b)-min(r,g,b)>35 and max(r,g,b)>95:
            pts.append((x,y,pk.getpixel((x,y))))
clusters=[]
for (x,y,c) in pts:
    placed=False
    for cl in clusters:
        if abs(cl[0]-x)<22 and abs(cl[1]-y)<22:
            cl[2].append((x,y,c)); cl[0]=sum(p[0] for p in cl[2])/len(cl[2]); cl[1]=sum(p[1] for p in cl[2])/len(cl[2]); placed=True; break
    if not placed: clusters.append([x,y,[(x,y,c)]])
clusters.sort(key=lambda cl: cl[0])
for cl in clusters:
    if len(cl[2])<5: continue
    xs=[p[0] for p in cl[2]]; ys=[p[1] for p in cl[2]]
    cs=sorted([p[2] for p in cl[2]]); med=cs[len(cs)//2]
    print(f"  dot cx~{cl[0]:.0f} cy~{cl[1]:.0f} x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} med={med} n={len(cl[2])}")
print("picker row divider check: row y=470 x60..540 step 20:")
print(" ", [(x, pk.getpixel((x,470))) for x in range(60,541,20)])
print("picker Auto card: col x=300 y200..380 (card fill ~47,48,52?):")
prev=None
for y in range(200,381):
    px=pk.getpixel((300,y))
    k='CARD' if 40<=max(px)<=60 else ('BG' if max(px)<30 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
