"""Q8: verification screenshots without the device bezel (gallery keeps the frame).
Crops the 10px PhoneFrame border off each 390x844 shot -> 370x824 inner screen."""
from PIL import Image
import os
base = os.path.expanduser('~/workspace/DesignRepoForMuse/UIDesign/app/airbuild/docs/verification/rounds/v1.6')
out = os.path.join(base, 'bare')
os.makedirs(out, exist_ok=True)
for name in sorted(os.listdir(base)):
    if name.endswith('-390.png'):
        im = Image.open(os.path.join(base, name))
        im.crop((10, 10, 380, 834)).save(os.path.join(out, name))
        print(name, '->', 'bare/' + name, im.crop((10, 10, 380, 834)).size)
