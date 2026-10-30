from PIL import Image
from collections import Counter
import os
P = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/docs/references/medley/medley-4-screens-chinese-hd.jpg')
im = Image.open(P).convert('RGB')
print('size', im.size)
# column darkness profile: phone frames are dark, gaps are light? print mode per 100px column strip
for x in range(0, im.size[0], 100):
    crop = im.crop((x, 0, x+100, im.size[1]))
    print('colstrip x%d mode %s' % (x, Counter(crop.getdata()).most_common(1)[0][0]))
# row profile for top edge
for y in range(0, 200, 20):
    crop = im.crop((0, y, im.size[0], y+20))
    print('rowstrip y%d mode %s' % (y, Counter(crop.getdata()).most_common(1)[0][0]))
