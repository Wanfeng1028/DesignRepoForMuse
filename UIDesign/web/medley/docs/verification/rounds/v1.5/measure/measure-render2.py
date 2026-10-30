from PIL import Image
base = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/measure/'
def hx(c): return '#%02X%02X%02X' % tuple(c)
w = Image.open(base+'render-welcome.png').convert('RGB'); W,H = w.size; px = w.load()
print('welcome', w.size)
for fx, fy, tgt in [(0.10,0.15,'#0D0E10'),(0.85,0.42,'#23354B'),(0.90,0.50,'#1C2D3F'),(0.70,0.45,'#1A2634'),(0.16,0.76,'#4A2B1E'),(0.85,0.97,'#2C4D44'),(0.73,0.97,'#183731')]:
    c = px[int(fx*W), int(fy*H)]; print(f'  ({fx},{fy}) {c} {hx(c)} target {tgt}')
# cursor dot centre: brightest blue cell around title row y 120..165, x 280..340
best=None
for y in range(120,166):
    for x in range(280,340):
        c=px[x,y]
        if best is None or c[2]>best[0]: best=(c[2],x,y,c)
print('cursor brightest in title band:', best[1], best[2], best[3], hx(best[3]))
print('cursor row y=%d x295..325:' % best[2], ' '.join(f'{x}:{hx(px[x,best[2]])}' for x in range(295,326,3)))
# brand dots header: sample dot centres: find saturated pixels in header band y 5..40, x 15..60
print('brand dots header band:')
for y in range(5,41):
    row=[]
    for x in range(15,61):
        c=px[x,y]
        if max(c)-min(c)>=30: row.append(f'{x},{y}={hx(c)}')
    if row: print('  '+' '.join(row))
h = Image.open(base+'render-home-en.png').convert('RGB'); Hw,Hh = h.size; hp = h.load()
print('home-en', h.size)
for fy, tgt in [(0.05,'#F5F6F8'),(0.15,'#F5F6F8'),(0.25,'~#EFF3F4'),(0.35,'~#EAF0F1'),(0.45,'~#E6EEF0')]:
    vals=[]
    for y in range(max(0,int(fy*Hh)-3), min(Hh,int(fy*Hh)+3)):
        for x in range(int(0.55*Hw), int(0.95*Hw)):
            vals.append(hp[x,y])
    m=tuple(sorted(c[i] for c in vals)[len(vals)//2] for i in range(3))
    print(f'  home fy={fy} median {m} {hx(m)} target {tgt}')
