from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
def sat(px): return max(px)-min(px)
print("== Pro dots row: saturation profile y=806 x150..380 (peaks):")
prof=[(x, sat(pr.getpixel((x,806)))) for x in range(150,381)]
# print local maxima >30
for i in range(1,len(prof)-1):
    if prof[i][1]>30 and prof[i][1]>=prof[i-1][1] and prof[i][1]>=prof[i+1][1]:
        print(f"  x={prof[i][0]} sat={prof[i][1]} px={pr.getpixel((prof[i][0],806))}")
print("== Pro dots row band: for y 795..820, saturated px count per y:")
for y in range(795,821):
    c=sum(1 for x in range(150,381) if sat(pr.getpixel((x,y)))>30)
    print(f"  y={y} n={c}")
print("== Lite card top/bottom border check col x=300 y430..540:")
prev=None
for y in range(430,541):
    px=pr.getpixel((300,y))
    k='BG' if max(px)<24 else ('CARD' if 24<=max(px)<=45 else ('BORD' if 90<=max(px)<=190 else 'TXT'))
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== radio ring rows x95..130 (R 90..200 count per y):")
for y in range(550,601):
    xs=[x for x in range(95,131) if 90<=max(pr.getpixel((x,y)))<=200]
    if xs: print(f"  y={y} n={len(xs)} x{min(xs)}..{max(xs)}")
