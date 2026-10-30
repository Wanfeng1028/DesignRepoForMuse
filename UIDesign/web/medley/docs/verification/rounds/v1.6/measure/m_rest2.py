from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S_HD = 1.446; S_OV = 1.692
def css(px,s): return round(px/s,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("radio ASCII2 x95..175 y580..630:")
for y in range(580,631):
    line=""
    for x in range(95,176):
        r=pr.getpixel((x,y))[0]
        line += '.' if r<40 else (':' if r<90 else ('o' if r<160 else ('O' if r<220 else '#')))
    print(f"  y={y} {line}")
pk = Image.open(B+"hd5-pickerA.jpg").convert("RGB")
print("picker bg grid (empty areas):")
for (x,y) in [(300,100),(100,600),(300,600),(500,900),(300,1100),(100,100)]:
    print(f"  ({x},{y}) {pk.getpixel((x,y))}")
cr = Image.open(B+"hd5-credits.jpg").convert("RGB")
print("credits Buy col x=150 y340..440 runs:")
prev=None
for y in range(340,441):
    px=cr.getpixel((150,y))
    k='BLACK' if max(px)<60 else ('BG' if max(px)>235 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("credits legend scan: sat>40 rows y680..900 (count per y, x60..500):")
for y in range(680,901):
    c=0
    for x in range(60,501):
        r,g,b = cr.getpixel((x,y))
        if max(r,g,b)-min(r,g,b)>40 and max(r,g,b)>100: c+=1
    if c>=4: print(f"  y={y} n={c}")
sp = Image.open(B+"ov-suspended.jpg").convert("RGB")
print("suspended size", sp.size)
print("suspended buttons: dark/light bands col x=330 y1000..1400:")
prev=None
for y in range(1000,1401):
    px=sp.getpixel((330,y))
    k='DARK' if max(px)<60 else ('W' if max(px)>240 else 'BG')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
ag = Image.open(B+"ov-agent.jpg").convert("RGB")
print("agent size", ag.size)
print("agent progress bar: row y? scan col x=330 y300..700 for bar rows (bright line):")
for y in range(300,701):
    c=sum(1 for x in range(100,560) if max(ag.getpixel((x,y)))>200)
    if c>100: print(f"  y={y} bright-n={c}")
dr = Image.open(B+"ov-drawer.jpg").convert("RGB")
print("drawer search pill col x=330 y120..300:")
prev=None
for y in range(120,301):
    px=dr.getpixel((330,y))
    k='PILL' if 25<=max(px)<=50 else ('BG' if max(px)<25 else 'TXT')
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
lg = Image.open(B+"cn4-language.jpg").convert("RGB")
print("language: check bbox? rows: dark text bands col x=300 y150..900 (count>20):")
bands=[]; inb=False; s=0
for y in range(150,901):
    c=sum(1 for x in range(60,541) if max(lg.getpixel((x,y)))<100)
    if c>20 and not inb: inb=True; s=y
    if c<=20 and inb: bands.append((s,y-1)); inb=False
print("  text bands:", bands[:20])
