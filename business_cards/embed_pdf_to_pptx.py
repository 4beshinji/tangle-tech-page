"""Build a print-ready ('完全データ') PPTX by placing the rasterised PDF
of the card design as full-bleed pictures into the ACCEA template.

This sidesteps font-substitution risk on the print-shop side: the design is
already pixels matching the rendered PDF.
"""

from __future__ import annotations
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT.parent / "accea_meishi_pptx_templates" / "meishi_yoko_pptx.pptx"
FRONT_PNG = ROOT / "print-1.png"
BACK_PNG = ROOT / "print-2.png"
OUT_PPTX = ROOT / "abe_shinji_yoko_PRINT.pptx"

# Slide size from the template (97 × 61 mm in EMU).
SLIDE_CX = 3492500
SLIDE_CY = 2195513


def slide_xml(image_rid: str, shape_id: int, name: str) -> str:
    """Slide containing only a single full-bleed picture."""
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
      <p:pic>
        <p:nvPicPr>
          <p:cNvPr id="{shape_id}" name="{name}"/>
          <p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>
          <p:nvPr userDrawn="1"/>
        </p:nvPicPr>
        <p:blipFill>
          <a:blip r:embed="{image_rid}"/>
          <a:stretch><a:fillRect/></a:stretch>
        </p:blipFill>
        <p:spPr>
          <a:xfrm>
            <a:off x="0" y="0"/>
            <a:ext cx="{SLIDE_CX}" cy="{SLIDE_CY}"/>
          </a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        </p:spPr>
      </p:pic>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>'''


def slide_rels(image_filename: str, image_rid: str = "rId2") -> str:
    """Slide rels: keep the slideLayout link, add the image link."""
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="{image_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/{image_filename}"/>
</Relationships>'''


def build() -> None:
    assert FRONT_PNG.exists(), FRONT_PNG
    assert BACK_PNG.exists(), BACK_PNG

    front_bytes = FRONT_PNG.read_bytes()
    back_bytes = BACK_PNG.read_bytes()

    with zipfile.ZipFile(TEMPLATE, "r") as zin, \
         zipfile.ZipFile(OUT_PPTX, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            name = item.filename
            if name == "ppt/slides/slide1.xml":
                zout.writestr(item, slide_xml("rId2", 10, "card-front"))
            elif name == "ppt/slides/slide2.xml":
                zout.writestr(item, slide_xml("rId2", 11, "card-back"))
            elif name == "ppt/slides/_rels/slide1.xml.rels":
                zout.writestr(item, slide_rels("card_front.png"))
            elif name == "ppt/slides/_rels/slide2.xml.rels":
                zout.writestr(item, slide_rels("card_back.png"))
            else:
                zout.writestr(item, zin.read(name))

        # Add the new image files into ppt/media/.
        zout.writestr("ppt/media/card_front.png", front_bytes)
        zout.writestr("ppt/media/card_back.png", back_bytes)

    print(f"wrote {OUT_PPTX.relative_to(ROOT.parent)}")


if __name__ == "__main__":
    build()
