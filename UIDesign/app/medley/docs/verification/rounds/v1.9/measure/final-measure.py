from PIL import Image
import numpy as np
import os
V19 = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.9'
S = 0.9860  # framed scale; content css = shot/S - 2 (2px bezel each side)
def load(name):
    return np.array(Image.open(f'{V19}/{name}.png').convert('RGB')).astype(int)
def band(g, y0, y1, x0, x1, thr, label, bright=True):
    m = (g[y0:y1, x0:x1] > thr) if bright else (g[y0:y1, x0:x1] < thr)
    ys, xs = np.where(m)
    if len(xs) == 0:
        print(f'{label}: none'); return None
    print(f'{label}: shot y {ys.min()+y0}-{ys.max()+y0} -> content {round((ys.min()+y0)/S-2,1)}-{round((ys.max()+y0)/S-2,1)} x {xs.min()+x0}-{xs.max()+x0}')
    return (round((ys.min()+y0)/S-2,1), round((ys.max()+y0)/S-2,1))
def patch(im, x, y, label):
    # content coords -> shot coords
    sx, sy = int((x+2)*S), int((y+2)*S)
    p = im[sy-2:sy+3, sx-2:sx+3].reshape(-1, 3)
    med = tuple(int(np.median(p[:, i])) for i in range(3))
    print(f'{label}: content ({x},{y}) median {med}')
    return med

w = load('welcome-dark'); wg = w.mean(axis=2)
print('== welcome ==')
band(wg, 0, 50, 0, 390, 150, 'status ink bright')
band(wg, 50, 90, 0, 390, 150, 'header band bright')
band(wg, 250, 340, 0, 390, 170, 'title band')
band(wg, 340, 380, 0, 390, 150, 'sub1 band')
band(wg, 380, 430, 0, 390, 120, 'sub2 band (thr120)')
band(wg, 630, 710, 0, 390, 200, 'google pill')
band(wg, 710, 760, 0, 390, 150, 'try btn text')
band(wg, 760, 820, 0, 390, 120, 'footnote')
patch(w, 195, 100, 'welcome bg top-centre')
patch(w, 60, 100, 'welcome bg top-left')
patch(w, 330, 100, 'welcome bg top-right')
patch(w, 195, 250, 'welcome glow blue-ish (195,250)')
patch(w, 60, 450, 'welcome glow warm-left (60,450)')
patch(w, 330, 450, 'welcome glow right (330,450)')
# cursor dot: find blue-ish pixels near title
sub = w[270:330, 280:340].astype(int)
blu = (sub[:, :, 2] > 150) & (sub[:, :, 2] - sub[:, :, 0] > 30)
ys, xs = np.where(blu)
print(f'cursor dot shot bbox x {xs.min()+280}-{xs.max()+280} y {ys.min()+270}-{ys.max()+270} -> content x {round((xs.min()+280)/S-2,1)}-{round((xs.max()+280)/S-2,1)} y {round((ys.min()+270)/S-2,1)}-{round((ys.max()+270)/S-2,1)}')
# status icons boxes: right cluster, bright
m = wg[0:50, 270:390] > 150
ys, xs = np.where(m)
print(f'status icons shot x {xs.min()+270}-{xs.max()+270} y {ys.min()}-{ys.max()} -> content x {round((xs.min()+270)/S-2,1)}-{round((xs.max()+270)/S-2,1)} y {round(ys.min()/S-2,1)}-{round(ys.max()/S-2,1)}')
# home indicator: dark gray bar near bottom
hi = w[820:844, :, :].astype(int)
gm = hi.mean(axis=2)
mask = (np.abs(hi[:, :, 0]-hi[:, :, 1]) < 12) & (gm > 60) & (gm < 110)
ys, xs = np.where(mask)
print(f'home indicator shot rows {ys.min()+820}-{ys.max()+820} cols {xs.min()}-{xs.max()} -> content y {round((ys.min()+820)/S-2,1)}-{round((ys.max()+820)/S-2,1)} w {round((xs.max()-xs.min()+1)/S,1)}')
print('== picker-a ==')
p = load('model-picker-a'); pg = p.mean(axis=2)
band(pg, 90, 130, 0, 390, 60, 'picker sheet top? (dark zone boundary via bright? use all cols mean)', bright=False)
# sheet top: row where bg changes from #08090b to #1e1f23: scan column x=200 mean per row
for y in range(90, 130):
    print(f'  picker row shot {y} content {round(y/S-2,1)} pixel(200) {tuple(p[y, 200])}')
band(pg, 100, 130, 100, 300, 60, 'picker handle dark', bright=False)
band(pg, 130, 180, 0, 390, 150, 'picker title band')
print('== home-en ==')
h = load('home-light-en'); hg = h.mean(axis=2)
band(hg, 0, 50, 0, 390, 120, 'home status ink dark', bright=False)
band(hg, 40, 90, 0, 390, 120, 'home topbar ink dark', bright=False)
band(hg, 480, 560, 0, 390, 120, 'home greeting dark', bright=False)
print('== lisbon-en ==')
l = load('chat-dark-lisbon-en'); lg = l.mean(axis=2)
band(lg, 0, 50, 0, 390, 150, 'lisbon status ink bright')
band(lg, 40, 90, 0, 390, 150, 'lisbon topbar ink bright')
