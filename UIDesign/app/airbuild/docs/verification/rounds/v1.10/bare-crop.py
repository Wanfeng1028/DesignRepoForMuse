"""v1.10 bare crops: strip the 10px PhoneFrame border off each 390x844 shot
-> 370x824 inner screen, same method as v1.6-v1.9. chat-430 is left framed."""
from PIL import Image
import os
base = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.10')
out = os.path.join(base, 'bare')
os.makedirs(out, exist_ok=True)
for name in sorted(os.listdir(base)):
    if name.endswith('-390.png'):
        im = Image.open(os.path.join(base, name))
        im.crop((10, 10, 380, 834)).save(os.path.join(out, name))
        print(name, '-> bare/' + name, im.crop((10, 10, 380, 834)).size)
