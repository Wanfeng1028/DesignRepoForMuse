from PIL import Image
im = Image.open('/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/measure/render-welcome.png').convert('RGB')
base = '/home/hatch/workspace/DesignRepoForMuse/UIDesign/web/medley/docs/verification/rounds/v1.5/crops/'
for name, box in {'render-title': (0,110,420,180), 'render-google': (0,300,560,420)}.items():
    c = im.crop(box)
    c = c.resize((c.width*2, c.height*2), Image.NEAREST)
    c.save(base+name+'.png')
    print(name, box, c.size)
