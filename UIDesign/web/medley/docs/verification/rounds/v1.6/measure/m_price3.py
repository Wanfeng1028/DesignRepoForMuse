from PIL import Image
B = "/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/round4/judge/orig/"
S = 1.446
def css(px): return round(px/S,1)
pr = Image.open(B+"hd5-pricing.jpg").convert("RGB")
print("== Pro card left edge: row y=600 x60..130:")
prev=None
for x in range(60,131):
    px=pr.getpixel((x,600))
    k='BG' if max(px)<24 else ('CARD' if 24<=max(px)<=45 else ('BORD' if 90<=max(px)<=190 else 'TXT'))
    if k!=prev: print(f"  x={x} {k} {px}"); prev=k
print("== Pro card top edge: col x=300 y530..600:")
prev=None
for y in range(530,601):
    px=pr.getpixel((300,y))
    k='BG' if max(px)<24 else ('CARD' if 24<=max(px)<=45 else ('BORD' if 90<=max(px)<=190 else 'TXT'))
    if k!=prev: print(f"  y={y} {k} {px}"); prev=k
print("== Lite card left edge (unselected, control): row y=470 x60..130:")
prev=None
for x in range(60,131):
    px=pr.getpixel((x,470))
    k='BG' if max(px)<24 else ('CARD' if 24<=max(px)<=45 else ('BORD' if 90<=max(px)<=190 else 'TXT'))
    if k!=prev: print(f"  x={x} {k} {px}"); prev=k
