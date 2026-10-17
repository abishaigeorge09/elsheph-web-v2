"""
Produce cropped + light-on-dark variants of the Elsheph logo.

The source PNGs are 500x500 with the mark in a thin central band and a lot of
empty transparent margin, so `h-6 w-auto` in the header rendered a ~24px smudge.
And the mark's ink is the deep logo brown #582008, which sits at 1.6:1 against
the site's near-black ground -- effectively invisible.

So: crop each to its actual content, and emit a knockout variant that remaps the
deep brown to the page's ink cream while leaving the terracotta accent alone.
Brand hues are not invented here; only the dark ink is lifted so the mark reads
on a dark ground, which is the normal light-on-dark treatment of a wordmark.
"""

from PIL import Image
import os

SRC_DIR = "public/logos"
DEEP = (0x58, 0x20, 0x08)      # logo deep brown
INK = (0xF0, 0xEA, 0xE1)       # site --ink
TERRA = (0xA0, 0x58, 0x38)     # logo terracotta, preserved
TERRA_LIGHT = (0xC0, 0x8A, 0x4E)  # --accent, for the knockout


def crop_to_content(im):
    bbox = im.split()[-1].getbbox()  # alpha channel bbox
    return im.crop(bbox) if bbox else im


def dist(c1, c2):
    return sum((a - b) ** 2 for a, b in zip(c1, c2)) ** 0.5


def knockout(im):
    """Remap dark ink -> cream, terracotta -> accent. Preserves alpha + edges."""
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            d_deep = dist((r, g, b), DEEP)
            d_terra = dist((r, g, b), TERRA)
            if d_deep < d_terra:
                # how dark relative to the deep brown -- keep antialiasing ramps
                t = min(1.0, d_deep / 120)
                nr = int(INK[0] * (1 - t) + r * t)
                ng = int(INK[1] * (1 - t) + g * t)
                nb = int(INK[2] * (1 - t) + b * t)
                px[x, y] = (nr, ng, nb, a)
            else:
                t = min(1.0, d_terra / 120)
                nr = int(TERRA_LIGHT[0] * (1 - t) + r * t)
                ng = int(TERRA_LIGHT[1] * (1 - t) + g * t)
                nb = int(TERRA_LIGHT[2] * (1 - t) + b * t)
                px[x, y] = (nr, ng, nb, a)
    return im


for name in ["elsheph-full", "elsheph-name", "elsheph-symbol"]:
    src = os.path.join(SRC_DIR, f"{name}.png")
    if not os.path.exists(src):
        print(f"skip {src} (missing)")
        continue
    im = Image.open(src).convert("RGBA")
    cropped = crop_to_content(im)
    cropped.save(os.path.join(SRC_DIR, f"{name}-cropped.png"))
    light = knockout(cropped.copy())
    light.save(os.path.join(SRC_DIR, f"{name}-light.png"))
    print(f"{name}: {im.size} -> cropped {cropped.size}, wrote -cropped and -light")
