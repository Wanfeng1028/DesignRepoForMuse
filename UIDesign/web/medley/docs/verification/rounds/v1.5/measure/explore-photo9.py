from PIL import Image
from collections import Counter
import colorsys
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
W,H = im.size
print('size', W, H)
px = im.load()
# Row mean brightness: find horizontal gap band (collage background dark?)
for y in range(0, H, 20):
    s = sum(sum(px[x,y]) for x in range(0,W,10)) / (W//10)
    print(f'row y={y} meanRGBsum={s:.0f}')
