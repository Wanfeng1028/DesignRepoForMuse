from PIL import Image
im = Image.open('/home/hatch/workspace/user/media_library/image/photo-9.jpg').convert('RGB')
px = im.load()
def hx(c): return '#%02X%02X%02X' % tuple(c)
def bright(name, x0,x1,y0,y1):
    print(f'== {name} ==')
    for y in range(y0,y1):
        row=[]
        for x in range(x0,x1):
            c=px[x,y]
            if max(c)-min(c)>=25 and max(c)>70:
                row.append(f'{x},{y}={hx(c)}')
        if row: print('  '+' '.join(row[:40]))
bright('BL header band', 200,520,1660,1780)
bright('BR header band', 800,1120,1660,1780)
print('== BL Kimi msg header (answer header row) ==')
bright('BL msg header', 70,320,1800,1900)
print('== BR GPT msg header ==')
bright('BR msg header', 775,1100,2000,2120)
