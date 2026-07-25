#!/usr/bin/env python3
"""Compose authentic NeoHub space photos into branded 16:9 blog covers."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
OUT = ASSETS / "blog-covers"
LOGO = ASSETS / "footer-logo_707a880a.png"

W, H = 1600, 900
BRAND_ORANGE = (255, 91, 46, 255)

COVERS = [
    {
        "file": "neohub-gomti-nagar-hub.jpg",
        "source": "slider1_0fe6417c.jpg",
        "label": "NeoHub · Gomti Nagar",
        "focus": (0.45, 0.42),
    },
    {
        "file": "neohub-private-cabin.jpg",
        "source": "Private-Spaces_dfb4e03e.png",
        "label": "Private Cabins · NeoHub",
        "focus": (0.50, 0.40),
    },
    {
        "file": "neohub-workstations.jpg",
        "source": "Customized-Desks_f656af2d.png",
        "label": "Workstations · NeoHub",
        "focus": (0.52, 0.45),
    },
    {
        "file": "neohub-startup-floor.jpg",
        "source": "slider2_72c0b9ec.jpg",
        "label": "For Growing Teams · Lucknow",
        "focus": (0.48, 0.40),
    },
    {
        "file": "neohub-conference-room.jpg",
        "source": "Conference-Rooms_feaacc5e.png",
        "label": "Conference Booking · NeoHub",
        "focus": (0.50, 0.42),
    },
    {
        "file": "neohub-locations.jpg",
        "source": "slider3_2d262f91.jpg",
        "label": "Cyber Heights · Bhavya · Experion",
        "focus": (0.50, 0.38),
    },
]


def cover_crop(img: Image.Image, focus=(0.5, 0.45)) -> Image.Image:
    img = img.convert("RGB")
    src_w, src_h = img.size
    target_ratio = W / H
    src_ratio = src_w / src_h

    if src_ratio > target_ratio:
        new_w = int(src_h * target_ratio)
        new_h = src_h
    else:
        new_w = src_w
        new_h = int(src_w / target_ratio)

    fx, fy = focus
    left = int((src_w - new_w) * fx)
    top = int((src_h - new_h) * fy)
    left = max(0, min(left, src_w - new_w))
    top = max(0, min(top, src_h - new_h))

    cropped = img.crop((left, top, left + new_w, top + new_h))
    return cropped.resize((W, H), Image.Resampling.LANCZOS)


def load_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def brand_cover(base: Image.Image, label: str) -> Image.Image:
    canvas = base.convert("RGBA")

    # Slight warmth + clarity so photos feel premium
    rgb = canvas.convert("RGB")
    rgb = ImageEnhance.Color(rgb).enhance(1.05)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    canvas = rgb.convert("RGBA")

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Bottom brand bar gradient
    for y in range(H - 260, H):
        t = (y - (H - 260)) / 260
        alpha = int(20 + t * 195)
        draw.line([(0, y), (W, y)], fill=(10, 14, 22, alpha))

    # Top-left soft brand wash
    for y in range(0, 140):
        t = 1 - (y / 140)
        alpha = int(t * 70)
        draw.line([(0, y), (W, y)], fill=(10, 14, 22, alpha))

    # Orange accent strip
    draw.rectangle([(0, H - 10), (W, H)], fill=BRAND_ORANGE)
    draw.rectangle([(0, 0), (8, H)], fill=BRAND_ORANGE)

    # Logo badge
    logo = Image.open(LOGO).convert("RGBA")
    logo_w = 320
    logo_h = int(logo.height * (logo_w / logo.width))
    logo = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)

    badge_pad_x, badge_pad_y = 22, 16
    badge_w = logo_w + badge_pad_x * 2
    badge_h = logo_h + badge_pad_y * 2
    badge = Image.new("RGBA", (badge_w, badge_h), (0, 0, 0, 0))
    badge_draw = ImageDraw.Draw(badge)
    badge_draw.rounded_rectangle(
        [(0, 0), (badge_w - 1, badge_h - 1)],
        radius=18,
        fill=(12, 16, 24, 190),
    )
    badge.paste(logo, (badge_pad_x, badge_pad_y), logo)

    # Soft shadow under badge
    shadow = Image.new("RGBA", (badge_w + 24, badge_h + 24), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        [(8, 10), (badge_w + 8, badge_h + 12)],
        radius=20,
        fill=(0, 0, 0, 90),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))

    badge_x, badge_y = 48, 42
    overlay.alpha_composite(shadow, (badge_x - 8, badge_y - 6))
    overlay.alpha_composite(badge, (badge_x, badge_y))

    # Location / topic label
    font = load_font(34, bold=True)
    text = label.upper()
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx, ty = 56, H - 78 - th
    pill_pad_x, pill_pad_y = 22, 12
    draw.rounded_rectangle(
        [
            (tx - pill_pad_x, ty - pill_pad_y),
            (tx + tw + pill_pad_x, ty + th + pill_pad_y),
        ],
        radius=999,
        fill=(255, 91, 46, 230),
    )
    draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))

    # Small authenticity mark
    tiny = load_font(22, bold=False)
    mark = "NEOHUBSPACES.IN"
    mb = draw.textbbox((0, 0), mark, font=tiny)
    mw = mb[2] - mb[0]
    draw.text((W - mw - 48, H - 52), mark, font=tiny, fill=(255, 255, 255, 180))

    out = Image.alpha_composite(canvas, overlay).convert("RGB")
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for item in COVERS:
        src = ASSETS / item["source"]
        if not src.exists():
            raise FileNotFoundError(src)
        base = cover_crop(Image.open(src), focus=item["focus"])
        branded = brand_cover(base, item["label"])
        dest = OUT / item["file"]
        branded.save(dest, "JPEG", quality=90, optimize=True, progressive=True)
        print(f"wrote {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
