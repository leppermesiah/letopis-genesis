#!/usr/bin/env python3
"""App icon on a flat magenta background -> public/icon-*.png and favicon.

Only the magenta OUTSIDE the frame becomes transparent (flood fill from the edges),
so the violet nebula inside the frame is left alone.
usage: make_app_icon.py ICON.png
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

src = Image.open(sys.argv[1]).convert('RGB')
rgb = np.asarray(src).astype(np.float32) / 255
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
magenta = np.clip(np.minimum(r, b) - g, 0, 1)

# the outside: magenta-ish pixels connected to the border
cand = magenta > 0.35
h, w = rgb.shape[:2]
outside = np.zeros_like(cand)
outside[0, :], outside[-1, :], outside[:, 0], outside[:, -1] = cand[0, :], cand[-1, :], cand[:, 0], cand[:, -1]
while True:
    grow = outside.copy()
    grow[1:] |= outside[:-1]; grow[:-1] |= outside[1:]; grow[:, 1:] |= outside[:, :-1]; grow[:, :-1] |= outside[:, 1:]
    grow &= cand
    if (grow == outside).all():
        break
    outside = grow
# grow the outside a little so the soft edge of the frame is unmixed too
grown = np.asarray(Image.fromarray((outside * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))) > 0

alpha = np.ones_like(magenta)
alpha[grown] = np.clip(1 - magenta[grown] / 0.97, 0, 1)
alpha[outside] = np.minimum(alpha[outside], np.clip(1 - magenta[outside] / 0.6, 0, 1))
col = (rgb - (1 - alpha)[..., None] * np.array([1, 0, 1])) / np.maximum(alpha, 1e-3)[..., None]
img = Image.fromarray((np.dstack([np.clip(col, 0, 1), alpha]) * 255).round().astype(np.uint8), 'RGBA')

pub = Path(__file__).resolve().parent.parent / 'public'
for s in (512, 192, 180, 32):
    name = {512: 'icon-512.png', 192: 'icon-192.png', 180: 'apple-touch-icon.png', 32: 'favicon-32.png'}[s]
    im = img.resize((s, s), Image.LANCZOS)
    if s == 180:  # iOS does not like transparency
        bg = Image.new('RGBA', im.size, (11, 13, 30, 255))
        bg.alpha_composite(im)
        im = bg
    im.save(pub / name, optimize=True)
# maskable (Android): the icon at 80% on the dark space colour
m = Image.new('RGBA', (512, 512), (11, 13, 30, 255))
m.alpha_composite(img.resize((410, 410), Image.LANCZOS), (51, 51))
m.save(pub / 'icon-maskable-512.png', optimize=True)
print('ok')
