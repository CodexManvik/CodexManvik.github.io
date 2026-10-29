"""Converts public/project-*.{png,jpg,jpeg} into 1344x768 WebP cards under ~150 KB.

Cards show the image in an h-44 object-cover crop, so the source is centre-cropped
to 16:9-ish first; keep the subject in the middle band. Originals are left in place
for you to delete once the .webp looks right.

    python scripts/project-images.py            # every project-* source image
    python scripts/project-images.py intelliops # just public/project-intelliops.*
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

SIZE = (1344, 768)
MAX_BYTES = 150 * 1024
PUBLIC = Path(__file__).resolve().parent.parent / "public"


def convert(src: Path) -> None:
    out = src.with_suffix(".webp")
    img = ImageOps.fit(Image.open(src).convert("RGB"), SIZE, Image.LANCZOS)
    for quality in range(82, 40, -4):
        img.save(out, "WEBP", quality=quality, method=6)
        if out.stat().st_size <= MAX_BYTES:
            break
    print(f"{src.name} -> {out.name}: {out.stat().st_size // 1024} KB (q{quality})")


names = sys.argv[1:]
sources = [
    p for p in sorted(PUBLIC.glob("project-*"))
    if p.suffix.lower() in {".png", ".jpg", ".jpeg"}
    and (not names or any(p.stem == f"project-{n}" for n in names))
]
if not sources:
    sys.exit("no matching public/project-* images")
for src in sources:
    convert(src)
