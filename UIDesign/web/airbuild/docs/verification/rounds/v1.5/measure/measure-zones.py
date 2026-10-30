"""Multi-point / zoned pixel sampling for web/airbuild window renders.
Usage: python3 measure-zones.py <png>  (window coords: origin = window top-left, 1200x668)
Prints per-zone samples; used on v1.4 (before) and v1.5 (after) window-main.png.
"""
import sys
from PIL import Image

def px(im, x, y):
    return im.getpixel((x, y))

def zone(im, name, pts):
    vals = [px(im, x, y) for (x, y) in pts]
    print(f"{name}: {vals}")
    return vals

def main():
    path = sys.argv[1]
    im = Image.open(path).convert('RGB')
    print(f"file={path} size={im.size}")
    zone(im, 'sidebar-pad-strip x=4', [(4, y) for y in (60, 150, 250, 350, 450, 550, 620)])
    zone(im, 'conversation-right-strip x=688', [(688, y) for y in (60, 150, 250, 350, 450, 550, 620)])
    zone(im, 'preview-left x=720', [(720, y) for y in (100, 200, 300, 400, 500)])
    zone(im, 'titlebar-sidebar x=170', [(170, y) for y in (10, 20, 30)])
    zone(im, 'titlebar-conv x=350', [(350, y) for y in (10, 20, 30)])
    zone(im, 'titlebar-conv x=600', [(600, y) for y in (10, 20, 30)])
    zone(im, 'titlebar-preview x=1000', [(1000, y) for y in (10, 20, 30)])
    zone(im, 'capsule-interior NW/NE/SW/SE + divider-top/bottom', [(100, 12), (146, 12), (100, 32), (146, 32), (123, 12), (123, 32)])
    zone(im, 'titlebar-sidebar-edge y=20 x190-200', [(x, 20) for x in range(190, 201)])
    zone(im, 'feed-divider-inset y=313 x860-870', [(x, 313) for x in range(860, 871)])
    zone(im, 'toast-bg y=630 x555-645 step10', [(x, 630) for x in range(555, 646, 10)])
    # Avatar discs: window centres from probe-before2 (page cy -> window cy = page-307, cx=68-40=28)
    agents = [('Ato', 173), ('Pluso', 218), ('Colo', 263), ('Camo', 308), ('Ampo', 353), ('Leto', 398)]
    for name, cy in agents:
        zone(im, f'avatar-{name} centre/top/l/r', [(28, cy), (28, cy - 9), (19, cy - 3), (37, cy - 3)])
    zone(im, 'phone-frame-top', [(948, 88), (900, 88), (1000, 88)])
    zone(im, 'phone-tile-edge-vs-inside', [(834, 211), (835, 211), (840, 211), (870, 211)])
    zone(im, 'sidebar-right-edge y=300 x190-200', [(x, 300) for x in range(190, 201)])
    zone(im, 'titlebar-divider y=20 x690-702', [(x, 20) for x in range(690, 703)])
    zone(im, 'conv-border y=300 x690-700', [(x, 300) for x in range(690, 701)])
    zone(im, 'toast-centre-row y=636 x590-610', [(x, 636) for x in range(590, 611, 5)])
    # Blue bubble search: pixels close to #1987f7
    blues = []
    for y in range(40, 668):
        for x in range(198, 696):
            r, g, b = px(im, x, y)
            if r < 80 and 100 <= g <= 170 and b > 200:
                blues.append((x, y))
    if blues:
        xs = [p[0] for p in blues]; ys = [p[1] for p in blues]
        print(f"user-blue pixels: n={len(blues)} bbox x{min(xs)}-{max(xs)} y{min(ys)}-{max(ys)} sample={px(im, (min(xs)+max(xs))//2, (min(ys)+max(ys))//2)}")
    else:
        print('user-blue pixels: none found in conversation column')
    # Task card bg search: near #fffaf2
    tasks = []
    for y in range(40, 668):
        for x in range(198, 696):
            r, g, b = px(im, x, y)
            if r == 250 and g == 250 and b == 242:
                tasks.append((x, y))
    if tasks:
        xs = [p[0] for p in tasks]; ys = [p[1] for p in tasks]
        print(f"taskcard pixels: n={len(tasks)} bbox x{min(xs)}-{max(xs)} y{min(ys)}-{max(ys)}")
    else:
        print('taskcard pixels: none exact #fffaf2 (may be blended/covered)')

if __name__ == '__main__':
    main()
