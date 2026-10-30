from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S_HD = 1.446; S_OV = 660/390
def css(px,s): return round(px/s,1)
# Picker dividers: col x=300 y400..560 (between GLM row and DeepSeek row)
pk = Image.open(B+"hd5-pickerA.jpg").convert("RGB")
print("picker size", pk.size)
print("picker col x=300 y400..560:")
prev=None
for y in range(400,561):
    px=pk.getpixel((300,y))
    k='BG' if max(px)<30 else ('ROW' if max(px)<60 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("picker Auto dots: saturated blobs y230..290 x60..200:")
pts=[]
for y in range(230,291):
    for x in range(60,201):
        r,g,b = pk.getpixel((x,y))
        if max(r,g,b)-min(r,g,b)>40 and max(r,g,b)>100:
            pts.append((x,y,pk.getpixel((x,y))))
clusters=[]
for (x,y,c) in pts:
    placed=False
    for cl in clusters:
        if abs(cl[0]-x)<20 and abs(cl[1]-y)<20:
            cl[2].append((x,y,c)); cl[0]=sum(p[0] for p in cl[2])/len(cl[2]); cl[1]=sum(p[1] for p in cl[2])/len(cl[2]); placed=True; break
    if not placed: clusters.append([x,y,[(x,y,c)]])
clusters.sort(key=lambda cl: cl[0])
for cl in clusters:
    if len(cl[2])<5: continue
    xs=[p[0] for p in cl[2]]; ys=[p[1] for p in cl[2]]
    cs=sorted([p[2] for p in cl[2]]); med=cs[len(cs)//2]
    print(f"  dot cx~{cl[0]:.0f} cy~{cl[1]:.0f} x{min(xs)}..{max(xs)} y{min(ys)}..{max(ys)} med={med} n={len(cl[2])}")
# Chatinfo handle (OV scale 1.69, quant +-3px)
ci = Image.open(B+"ov-chatinfo.jpg").convert("RGB")
print("chatinfo size", ci.size)
print("chatinfo handle: grey px (150..210) bbox x200..460 y430..480:")
pts=[(x,y) for y in range(430,481) for x in range(200,461) if 150<=max(ci.getpixel((x,y)))<=215]
if pts:
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    print(f"  x{min(xs)}..{max(xs)} ({max(xs)-min(xs)+1}px={round((max(xs)-min(xs)+1)/1.692,1)}css) y{min(ys)}..{max(ys)} ({max(ys)-min(ys)+1}px={round((max(ys)-min(ys)+1)/1.692,1)}css)")
print("chatinfo sheet top corners: row y=470 x0..660 (sheet top edge y?):")
for y in [460,470,480,490]:
    print(f"  y={y}:", [(x, ci.getpixel((x,y))) for x in range(0,661,60)])
# Drawer (OV)
dr = Image.open(B+"ov-drawer.jpg").convert("RGB")
print("drawer size", dr.size)
print("drawer search pill col x=330 y150..280:")
prev=None
for y in range(150,281):
    px=dr.getpixel((330,y))
    k='PILL' if 25<=max(px)<=45 else ('BG' if max(px)<25 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
# Language (CN HD)
lg = Image.open(B+"cn4-language.jpg").convert("RGB")
print("language size", lg.size)
print("language col x=300 y200..700 (row bands):")
prev=None
for y in range(200,701):
    px=lg.getpixel((300,y))
    k='BG' if max(px)>240 else 'TXT'
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
