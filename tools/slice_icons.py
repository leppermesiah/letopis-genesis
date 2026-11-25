#!/usr/bin/env python3
"""Cut a 4x4 icon sheet on a flat magenta background into public/icons/<id>.webp.

usage: slice_icons.py SHEET.png id1,id2,...,id16 [--size 256]
The magenta is turned into transparency, also inside soft glows (the colour is unmixed),
then every icon is cropped to its content, centred on a square and resized.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

KEY = np.array([1.0, 0.0, 1.0])


def unkey(rgb: np.ndarray) -> np.ndarray:
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    magenta = np.clip(np.minimum(r, b) - g, 0, 1)
    alpha = np.clip(1 - magenta / 0.97, 0, 1)
    col = (rgb - (1 - alpha)[..., None] * KEY) / np.maximum(alpha, 1e-3)[..., None]
    return np.dstack([np.clip(col, 0, 1), alpha])


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    size = int(sys.argv[sys.argv.index('--size') + 1]) if '--size' in sys.argv else 256
    sheet, ids = Path(args[0]), args[1].split(',')
    out = Path(__file__).resolve().parent.parent / 'public' / 'icons'
    out.mkdir(parents=True, exist_ok=True)
    rgb = np.asarray(Image.open(sheet).convert('RGB')).astype(np.float32) / 255
    rgba = unkey(rgb)
    h, w = rgba.shape[:2]
    n = 4
    for i, name in enumerate(ids):
        if not name:
            continue
        r, c = divmod(i, n)
        cell = rgba[r * h // n:(r + 1) * h // n, c * w // n:(c + 1) * w // n]
        ys, xs = np.where(cell[..., 3] > 0.04)
        if len(xs) == 0:
            print('empty cell', i, name)
            continue
        cell = cell[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        ch, cw = cell.shape[:2]
        side = int(max(ch, cw) * 1.06)
        sq = np.zeros((side, side, 4), np.float32)
        y0, x0 = (side - ch) // 2, (side - cw) // 2
        sq[y0:y0 + ch, x0:x0 + cw] = cell
        img = Image.fromarray((sq * 255).round().astype(np.uint8), 'RGBA').resize((size, size), Image.LANCZOS)
        img.save(out / f'{name}.webp', 'WEBP', quality=88, method=6)
        print('ok', name)


if __name__ == '__main__':
    main()
