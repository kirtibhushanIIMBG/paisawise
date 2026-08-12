#!/usr/bin/env python3
"""PaisaWise identity system — indigo-ink / electric-violet palette.

Mark  : three ascending coin stacks (1/2/3) with a trajectory arrow tracing
        their growth — 'paisa' (coins) + 'wise' (guided upward).
Word  : PaisaWise, two-tone. Aptos Black.
Tag   : YOUR PERSONAL FINANCE GUIDE, Aptos SemiBold, wide tracking.
"""
import io, os
import cairosvg
from PIL import Image, ImageDraw, ImageFont

HERE  = os.path.dirname(os.path.abspath(__file__))
BRAND = os.path.join(HERE, "brand")
DF = "/Applications/Microsoft PowerPoint.app/Contents/Resources/DFonts"
os.makedirs(BRAND, exist_ok=True)

INK      = "#171526"   # near-black indigo
INK_2    = "#241F3D"   # raised surface on dark
VIOLET   = "#6C4CF1"   # primary accent
VIOLET_L = "#9B85FF"   # accent on dark ground
COIN_TOP = "#8F76FF"
COIN_BODY= "#5B3FD6"
COIN_HI  = "#BCA9FF"
MINT     = "#2AD69A"   # growth / positive
BODY     = "#5A5474"
PALE_D   = "#9B93C4"   # tagline on dark
WHITE    = "#FFFFFF"

APTOS_BLACK = f"{DF}/Aptos-Black.ttf"
APTOS_SEMI  = f"{DF}/Aptos-SemiBold.ttf"


# ----------------------------------------------------------------- mark (SVG)
def _stack(x, n, base, rx=10.5, ry=4.0, h=6.0, pitch=9.6):
    """Coin stack, drawn bottom-up so the overlaps read correctly."""
    out = []
    for k in range(n):
        cy = base - k * pitch
        out.append(f'<rect x="{x-rx}" y="{cy}" width="{2*rx}" height="{h}" fill="{COIN_BODY}"/>')
        out.append(f'<ellipse cx="{x}" cy="{cy+h}" rx="{rx}" ry="{ry}" fill="{COIN_BODY}"/>')
        out.append(f'<ellipse cx="{x}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{COIN_TOP}"/>')
        out.append(f'<ellipse cx="{x-rx*0.34}" cy="{cy-ry*0.30}" rx="{rx*0.40}" ry="{ry*0.34}" '
                   f'fill="{COIN_HI}" opacity="0.55"/>')
    return "".join(out)


def mark_svg(badge=INK, arrow=MINT):
    """badge=None renders the mark with no disc, for placing on coloured ground."""
    parts = []
    if badge:
        parts.append(f'<circle cx="50" cy="50" r="50" fill="{badge}"/>')
    parts.append(_stack(26, 1, 67))
    parts.append(_stack(50, 2, 67))
    parts.append(_stack(74, 3, 67))
    parts.append(f'<path d="M 22 53 L 48 42 L 74 28" fill="none" stroke="{arrow}" '
                 f'stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>')
    parts.append(f'<path d="M 63 26.5 L 75.5 27 L 74.5 39" fill="none" stroke="{arrow}" '
                 f'stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>')
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
            'width="100" height="100">' + "".join(parts) + '</svg>')


def render_mark(svg, px):
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=px, output_height=px)
    return Image.open(io.BytesIO(png)).convert("RGBA")


# ----------------------------------------------------------------- type utils
def track_len(font, text, tracking):
    if not text:
        return 0
    return sum(font.getlength(c) for c in text) + tracking * (len(text) - 1)


def draw_tracked(draw, xy, text, font, fill, tracking):
    x, y = xy
    for c in text:
        draw.text((x, y), c, font=font, fill=fill, anchor="ls")
        x += font.getlength(c) + tracking
    return x


def wordmark(size, c_paisa, c_wise):
    f = ImageFont.truetype(APTOS_BLACK, size)
    w = int(f.getlength("Paisa") + f.getlength("Wise")) + size
    img = Image.new("RGBA", (w, int(size * 1.9)), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    bl = int(size * 1.25)
    d.text((0, bl), "Paisa", font=f, fill=c_paisa, anchor="ls")
    d.text((f.getlength("Paisa"), bl), "Wise", font=f, fill=c_wise, anchor="ls")
    return img.crop(img.getbbox())


def tagline(size, colour, text="YOUR PERSONAL FINANCE GUIDE"):
    f = ImageFont.truetype(APTOS_SEMI, size)
    tr = size * 0.20
    w = int(track_len(f, text, tr)) + size
    img = Image.new("RGBA", (w, int(size * 2.2)), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    draw_tracked(d, (0, int(size * 1.45)), text, f, colour, tr)
    return img.crop(img.getbbox())


def paste(canvas, img, x, y):
    canvas.alpha_composite(img, (int(x), int(y)))


# ----------------------------------------------------------------- lockups
def horizontal(dark, mark_px=300):
    c_paisa = WHITE if dark else INK
    c_wise  = VIOLET_L if dark else VIOLET
    c_tag   = PALE_D if dark else BODY
    mk = render_mark(mark_svg(badge=INK_2 if dark else INK), mark_px)
    wm = wordmark(int(mark_px * 0.62), c_paisa, c_wise)
    tg = tagline(int(mark_px * 0.128), c_tag)

    gap, gutter = int(mark_px * 0.30), int(mark_px * 0.16)
    W = mark_px + gap + max(wm.width, tg.width)
    canvas = Image.new("RGBA", (W, mark_px), (0, 0, 0, 0))
    paste(canvas, mk, 0, 0)
    ty = (mark_px - (wm.height + gutter + tg.height)) / 2
    paste(canvas, wm, mark_px + gap, ty)
    paste(canvas, tg, mark_px + gap + 2, ty + wm.height + gutter)
    return canvas


def stacked(dark, mark_px=340):
    c_paisa = WHITE if dark else INK
    c_wise  = VIOLET_L if dark else VIOLET
    c_tag   = PALE_D if dark else BODY
    mk = render_mark(mark_svg(badge=INK_2 if dark else INK), mark_px)
    wm = wordmark(int(mark_px * 0.60), c_paisa, c_wise)
    tg = tagline(int(mark_px * 0.118), c_tag)

    g1, g2 = int(mark_px * 0.20), int(mark_px * 0.13)
    W = max(mark_px, wm.width, tg.width)
    H = mark_px + g1 + wm.height + g2 + tg.height
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    paste(canvas, mk, (W - mark_px) / 2, 0)
    paste(canvas, wm, (W - wm.width) / 2, mark_px + g1)
    paste(canvas, tg, (W - tg.width) / 2, mark_px + g1 + wm.height + g2)
    return canvas


def contact_sheet():
    tiles = [
        ("mark / ink disc", render_mark(mark_svg(), 260),             "#F6F5FA"),
        ("mark / on dark",  render_mark(mark_svg(badge=INK_2), 260),  INK),
        ("mark / no disc",  render_mark(mark_svg(badge=None), 260),   INK),
        ("mark @ 48px",     render_mark(mark_svg(), 48).resize((260, 260), Image.NEAREST), "#F6F5FA"),
    ]
    pad, cap = 26, 30
    tw = max(t[1].width for t in tiles) + pad * 2
    th = max(t[1].height for t in tiles) + pad * 2
    sheet = Image.new("RGBA", (tw * len(tiles), th + cap + 380), (255, 255, 255, 255))
    d = ImageDraw.Draw(sheet)
    f = ImageFont.truetype(APTOS_SEMI, 15)
    for i, (label, img, bgc) in enumerate(tiles):
        x = i * tw
        d.rectangle([x, 0, x + tw, th], fill=bgc)
        paste(sheet, img, x + (tw - img.width) / 2, (th - img.height) / 2)
        d.text((x + pad, th + 8), label, font=f, fill=INK)
    lh, ld = horizontal(False, 150), horizontal(True, 150)
    y = th + cap + 10
    d.rectangle([0, y, sheet.width, y + 185], fill="#F6F5FA")
    paste(sheet, lh, 40, y + (185 - lh.height) / 2)
    d.rectangle([0, y + 185, sheet.width, y + 370], fill=INK)
    paste(sheet, ld, 40, y + 185 + (185 - ld.height) / 2)
    return sheet


if __name__ == "__main__":
    open(f"{BRAND}/paisawise-mark.svg", "w").write(mark_svg())
    open(f"{BRAND}/paisawise-mark-reverse.svg", "w").write(mark_svg(badge=INK_2))
    open(f"{BRAND}/paisawise-mark-nodisc.svg", "w").write(mark_svg(badge=None))

    render_mark(mark_svg(), 1024).save(f"{BRAND}/paisawise-mark.png")
    render_mark(mark_svg(badge=INK_2), 1024).save(f"{BRAND}/paisawise-mark-reverse.png")
    render_mark(mark_svg(badge=None), 1024).save(f"{BRAND}/paisawise-mark-nodisc.png")
    horizontal(False, 300).save(f"{BRAND}/paisawise-logo-horizontal.png")
    horizontal(True,  300).save(f"{BRAND}/paisawise-logo-horizontal-reverse.png")
    stacked(False, 340).save(f"{BRAND}/paisawise-logo-stacked.png")
    stacked(True,  340).save(f"{BRAND}/paisawise-logo-stacked-reverse.png")
    contact_sheet().save(f"{BRAND}/_contact-sheet.png")
    print("logo assets written to", BRAND)
