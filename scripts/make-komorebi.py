#!/usr/bin/env python3
"""Make the 木漏れ日 light layer from our own shoot: the leaf shadow on the wall behind the bags (frame 146).
Output public/v3/komorebi.webp: white = full sun (no effect under multiply), warm brown = shadow.
Shadow strength is computed per pixel from luminance (wall level → 0, deepest shadow → 1); the plaster texture is
smoothed away first so only the light remains."""
import numpy as np
from PIL import Image, ImageOps, ImageFilter
SRC = "/Users/kishimakoto/Downloads/Yuto-20261001_TC/TC_261001_146.jpg"
im = ImageOps.exif_transpose(Image.open(SRC)).convert("L")
w, h = im.size
wall = im.crop((0, 0, w, int(h * 0.47)))                     # the wall above the bag
wall = wall.resize((2400, int(2400 * wall.height / wall.width)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(5))
a = np.asarray(wall).astype(np.float32)
lit, dark = np.percentile(a, 62), np.percentile(a, 4)
s = np.clip((lit - a) / (lit - dark), 0, 1) ** 1.35             # 0 = sun, 1 = deepest shadow
shadow = np.array([98, 84, 70], np.float32)                      # warm shadow colour, sampled from the photo's shadows
rgb = 255 - s[..., None] * (255 - shadow)
Image.fromarray(rgb.astype(np.uint8), "RGB").save("/Users/kishimakoto/Documents/RTU/snobi-site/public/v3/komorebi.webp", "WEBP", quality=80, method=6)
print(wall.size, round(float(lit), 1), round(float(dark), 1))
