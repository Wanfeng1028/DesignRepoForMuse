from PIL import Image
P = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/docs/references/medley/medley-5-screens-hd.jpg'
im = Image.open(P).convert('RGB')
px = im.load()
# original picker phone: left 1034, top 129, width 392, height 852 (strip approx = phone coords + offset)
def orig_bands():
    print('== ORIGINAL picker (strip coords; phone = strip-1034 / strip-129 approx, scale ~1.0)')
    # light-text rows: count pixels with sum>550 in x1080-1380 per row, group bands with count>=15
    bands = []
    for y in range(129, 981):
        n = sum(1 for x in range(1080, 1380) if sum(px[x, y]) > 550)
        if n >= 15:
            bands.append(y)
    groups = []
    for y in bands:
        if groups and y - groups[-1][-1] <= 3:
            groups[-1].append(y)
        else:
            groups.append([y])
    for g in groups:
        print('  text band strip y%d-%d -> phone y%d-%d (h=%d)' % (g[0], g[-1], g[0]-129, g[-1]-129, len(g)))
    # bg modes per 20px segment in center column range
    from collections import Counter
    for y in range(129, 981, 20):
        crop = im.crop((1100, y, 1400, y+20))
        print('  bg strip y%d mode %s' % (y, Counter(crop.getdata()).most_common(1)[0][0]))
R = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/app/medley/docs/verification/rounds/v1.8/pre/model-picker-a.png'
rim = Image.open(R).convert('RGB')
rpx = rim.load()
def rend_bands():
    print('== RENDER picker pre (phone coords)')
    bands = []
    for y in range(0, 844):
        n = sum(1 for x in range(40, 350) if sum(rpx[x, y]) > 550)
        if n >= 15:
            bands.append(y)
    groups = []
    for y in bands:
        if groups and y - groups[-1][-1] <= 3:
            groups[-1].append(y)
        else:
            groups.append([y])
    for g in groups:
        print('  text band y%d-%d (h=%d)' % (g[0], g[-1], len(g)))
    from collections import Counter
    for y in range(0, 844, 20):
        crop = rim.crop((50, y, 350, y+20))
        print('  bg y%d mode %s' % (y, Counter(crop.getdata()).most_common(1)[0][0]))
orig_bands()
rend_bands()
