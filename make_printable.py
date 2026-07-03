#!/usr/bin/env python3
"""
Convert the dark-themed PPTX to a printer-friendly (light) version.

Two output modes:
  --mode light      : white background, dark text, keep pink accent, keep images as-is
  --mode ultralight : same as light + images converted to light grayscale (least toner)

Strategy:
  Per slide/layout/master XML, detect the slide background.
  If the background is dark or heavy-pink, swap it to white and remap:
    background   0A0A0A / FF2D78 -> FFFFFF
    text/bullet  FFFFFF          -> 1A1A1A
  Pink accent FF2D78 is preserved (small usage; keeps design identity).
"""

import io
import os
import re
import shutil
import sys
import zipfile
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

SRC = Path("original.pptx")

DARK_BGS = {"0A0A0A", "1A1A1A", "000000"}
PINK_BGS = {"FF2D78"}
INVERT_BGS = DARK_BGS | PINK_BGS

# Regex helpers
BG_RE = re.compile(r'(<p:bg>.*?</p:bg>)', re.S)
SRGB_RE = re.compile(r'srgbClr val="([0-9A-Fa-f]{6})"')


def transform_slide_xml(xml: str) -> str:
    """
    For a single slide XML, if the background is dark/pink invert the palette:
      - background -> white
      - shape fills that match the old bg color -> white
      - white text/bullet colors -> near-black
    Otherwise leave everything untouched.
    """
    bg_match = BG_RE.search(xml)
    if not bg_match:
        return xml
    bg_block = bg_match.group(1)
    m = SRGB_RE.search(bg_block)
    if not m:
        return xml
    bg_color = m.group(1).upper()
    if bg_color not in INVERT_BGS:
        return xml

    # 1) rewrite background block to solid white
    new_bg = '<p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>'
    xml = xml.replace(bg_block, new_bg, 1)

    # 2) walk every <p:sp> shape and, inside its <p:spPr>, retint the old bg color -> white
    def swap_sp(sp_match):
        sp = sp_match.group(0)
        # Only spPr fills — leave text colors for step 3
        def swap_sppr(sppr_match):
            block = sppr_match.group(0)
            return block.replace(f'srgbClr val="{bg_color}"',
                                 'srgbClr val="FFFFFF"')
        sp = re.sub(r'<p:spPr>.*?</p:spPr>', swap_sppr, sp, flags=re.S)
        return sp

    xml = re.sub(r'<p:sp>.*?</p:sp>', swap_sp, xml, flags=re.S)

    # 3) Text/bullet white -> near-black, but only inside rPr / endParaRPr / buClr
    def swap_white_in(pattern_open, pattern_close):
        nonlocal xml
        def rep(m):
            return m.group(0).replace('srgbClr val="FFFFFF"',
                                       'srgbClr val="1A1A1A"')
        xml = re.sub(
            f'{pattern_open}.*?{pattern_close}', rep, xml, flags=re.S)

    swap_white_in(r'<a:rPr\b', r'</a:rPr>')
    swap_white_in(r'<a:endParaRPr\b', r'</a:endParaRPr>')
    swap_white_in(r'<a:defRPr\b', r'</a:defRPr>')
    swap_white_in(r'<a:buClr>', r'</a:buClr>')

    return xml


def transform_master_or_layout(xml: str) -> str:
    """
    Slide masters/layouts: same treatment — invert if the master itself uses
    a dark solid bg. In our file the master uses schemeClr, so this is a no-op.
    """
    return transform_slide_xml(xml)


def lighten_image(data: bytes, ext: str) -> tuple[bytes, str]:
    """
    Convert an image to a light-grayscale version to save toner.
    Keeps output format for JPEG, converts PNG to JPEG only if it has no alpha.
    """
    im = Image.open(io.BytesIO(data))
    has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    im_rgb = im.convert('RGB')
    gray = ImageOps.grayscale(im_rgb)
    # Boost midtones so dark screenshots don't drink the toner tray
    gray = ImageOps.autocontrast(gray, cutoff=2)
    # Blend the grayscale image with a white layer (65% white) => very light print
    white = Image.new('L', gray.size, 255)
    lightened = Image.blend(gray, white, 0.55)
    # Push contrast a touch so lines remain visible
    lightened = ImageEnhance.Contrast(lightened).enhance(1.4)

    buf = io.BytesIO()
    if ext.lower() == '.png' and has_alpha:
        # keep PNG with alpha; convert back to RGBA with the lightened luma
        rgba = Image.merge('RGBA', (lightened, lightened, lightened, im.split()[-1]))
        rgba.save(buf, format='PNG', optimize=True)
        return buf.getvalue(), '.png'
    # Save as JPEG at good quality — smaller and prints fine
    lightened.convert('RGB').save(buf, format='JPEG', quality=85, optimize=True)
    return buf.getvalue(), '.jpg'


def build(mode: str, out_path: Path):
    assert mode in ('light', 'ultralight')
    with zipfile.ZipFile(SRC, 'r') as zin:
        names = zin.namelist()
        with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as zout:
            for name in names:
                data = zin.read(name)
                if name.startswith('ppt/slides/slide') and name.endswith('.xml'):
                    data = transform_slide_xml(data.decode('utf-8')).encode('utf-8')
                elif name.startswith('ppt/slideLayouts/') and name.endswith('.xml'):
                    data = transform_master_or_layout(data.decode('utf-8')).encode('utf-8')
                elif name.startswith('ppt/slideMasters/') and name.endswith('.xml'):
                    data = transform_master_or_layout(data.decode('utf-8')).encode('utf-8')
                elif name.startswith('ppt/notesSlides/') and name.endswith('.xml'):
                    data = transform_slide_xml(data.decode('utf-8')).encode('utf-8')
                elif mode == 'ultralight' and name.startswith('ppt/media/'):
                    ext = os.path.splitext(name)[1]
                    if ext.lower() in ('.jpg', '.jpeg', '.png'):
                        try:
                            new_data, new_ext = lighten_image(data, ext)
                            # Keep original filename so relationships still resolve.
                            # PowerPoint tolerates a JPEG payload in a .png file for our
                            # purposes here, but to be safe we only override the bytes
                            # while keeping the extension.
                            if new_ext == ext.lower():
                                data = new_data
                            else:
                                # If we would need to change container, fall back to
                                # PNG-encoded lightened image to keep the original ext.
                                buf = io.BytesIO()
                                im = Image.open(io.BytesIO(new_data)).convert('RGB')
                                if ext.lower() == '.png':
                                    im.save(buf, format='PNG', optimize=True)
                                else:
                                    im.save(buf, format='JPEG', quality=85, optimize=True)
                                data = buf.getvalue()
                        except Exception as e:
                            print(f'  ! could not lighten {name}: {e}')
                zout.writestr(name, data)


def main():
    if not SRC.exists():
        sys.exit(f'missing {SRC}')
    build('light', Path('presentation_print_light.pptx'))
    print('wrote presentation_print_light.pptx')
    build('ultralight', Path('presentation_print_ultralight.pptx'))
    print('wrote presentation_print_ultralight.pptx')


if __name__ == '__main__':
    main()
