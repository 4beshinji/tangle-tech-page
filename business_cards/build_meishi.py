"""Build Tangle Teck business card pptx by replacing slide1/slide2 in the
ACCEA template, preserving its slide size, masters, and bleed/trim setup.

Design: VAR-B (simplified, 2 type families).
  Latin: Helvetica Neue   (proxy for Hubot Sans on print engines)
  JP:    Hiragino Sans

Site palette → print:
  paper #F5F3EE (cream)   ink #0E0E0C
  ink-mid #5A5852         ink-faint #A3A098
  rule rgba(0,0,0,0.18)   accent #FF3B1C

Coordinate system: 1mm = 36000 EMU.  Slide is 97×61 mm (yoko) with 3 mm bleed,
so trim sits at 3-94 mm × 3-58 mm and the safety zone at 6-91 mm × 6-55 mm.
Top and bottom hairlines align between front and back at fixed y so the
composition reads as one card rotated, not two layouts.
"""

from __future__ import annotations
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE_DIR = ROOT.parent / "accea_meishi_pptx_templates"
TEMPLATE_ZIP = ROOT.parent / "accea_meishi_pptx_templates.zip"

MM = 36000  # EMU per mm

# ---------------------------------------------------------------------------
# Palette
# ---------------------------------------------------------------------------
PAPER = "F5F3EE"
INK = "0E0E0C"
INK_MID = "5A5852"
INK_FAINT = "A3A098"
ACCENT = "FF3B1C"

# Two type families only.
LATIN = "Helvetica Neue"
JP = "Hiragino Sans"

# Shared y positions — top and bottom hairlines must align across faces.
TOP_LABEL_Y = 6.8
TOP_RULE_Y = 11.4
BOTTOM_RULE_Y = 51.6
BOTTOM_TEXT_Y = 53.6
BOTTOM_ACCENT_Y = 53.1

W, H = 97.0, 61.0  # mm — full slide incl. 3mm bleed all around
SAFE_L, SAFE_R = 6.0, 91.0  # safe-area x bounds
SAFE_W = SAFE_R - SAFE_L


def emu(mm: float) -> int:
    return int(round(mm * MM))


# ---------------------------------------------------------------------------
# Shape builders
# ---------------------------------------------------------------------------

def rect_fill(shape_id: int, name: str, x_mm: float, y_mm: float,
              w_mm: float, h_mm: float, fill: str) -> str:
    return f'''<p:sp>
  <p:nvSpPr><p:cNvPr id="{shape_id}" name="{name}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
  <p:spPr>
    <a:xfrm><a:off x="{emu(x_mm)}" y="{emu(y_mm)}"/><a:ext cx="{emu(w_mm)}" cy="{emu(h_mm)}"/></a:xfrm>
    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
    <a:solidFill><a:srgbClr val="{fill}"/></a:solidFill>
    <a:ln><a:noFill/></a:ln>
  </p:spPr>
  <p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:endParaRPr lang="ja-JP"/></a:p></p:txBody>
</p:sp>'''


def text_run(text: str, size_pt: float, color: str, *,
             bold: bool = False, italic: bool = False,
             tracking_em: float = 0.0,
             latin: str = LATIN,
             ea: str = JP) -> str:
    """A single text run.  PPTX size is in 100ths of a point.
    Tracking (`spc`) is in 100ths of a point too — we map roughly from em
    by spc ≈ tracking_em * size_pt * 100."""
    sz = int(round(size_pt * 100))
    spc = int(round(tracking_em * size_pt * 100))
    b = ' b="1"' if bold else ""
    i = ' i="1"' if italic else ""
    spc_attr = f' spc="{spc}"' if spc else ""
    safe = (text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
    return (
        f'<a:r><a:rPr lang="ja-JP" sz="{sz}"{b}{i}{spc_attr} kern="0">'
        f'<a:solidFill><a:srgbClr val="{color}"/></a:solidFill>'
        f'<a:latin typeface="{latin}"/>'
        f'<a:ea typeface="{ea}"/>'
        f'<a:cs typeface="{latin}"/>'
        f'</a:rPr><a:t>{safe}</a:t></a:r>'
    )


def text_box(shape_id: int, name: str, x_mm: float, y_mm: float,
             w_mm: float, h_mm: float, runs: list[str], *,
             align: str = "l", anchor: str = "t",
             wrap: str = "square") -> str:
    """Single-paragraph text box.  `runs` is a list of run XML strings."""
    return f'''<p:sp>
  <p:nvSpPr><p:cNvPr id="{shape_id}" name="{name}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
  <p:spPr>
    <a:xfrm><a:off x="{emu(x_mm)}" y="{emu(y_mm)}"/><a:ext cx="{emu(w_mm)}" cy="{emu(h_mm)}"/></a:xfrm>
    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
    <a:noFill/>
  </p:spPr>
  <p:txBody>
    <a:bodyPr wrap="{wrap}" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="{anchor}"><a:noAutofit/></a:bodyPr>
    <a:lstStyle/>
    <a:p><a:pPr algn="{align}"/>{"".join(runs)}</a:p>
  </p:txBody>
</p:sp>'''


def shared_chrome(shapes: list[str], *, label_text: str) -> None:
    """Background, top label + hairline, bottom hairline + § accent.
    Front and back share these so the structural bars line up exactly."""
    # Background — full bleed.
    shapes.append(rect_fill(100, "bg", 0, 0, W, H, PAPER))

    # Top section label: "§ <LABEL>"
    shapes.append(text_box(110, "top-label", SAFE_L, TOP_LABEL_Y, 30, 3.5, [
        text_run("§", 6, ACCENT, latin=LATIN, bold=True),
        text_run(f"  {label_text}", 6, INK_FAINT, latin=LATIN,
                 tracking_em=0.28, bold=True),
    ]))

    # Top hairline.
    shapes.append(rect_fill(101, "rule-top", SAFE_L, TOP_RULE_Y, SAFE_W, 0.1, INK_MID))

    # Bottom hairline.
    shapes.append(rect_fill(190, "rule-bottom", SAFE_L, BOTTOM_RULE_Y, SAFE_W, 0.1, INK_MID))

    # § accent at bottom-right.
    shapes.append(text_box(192, "bottom-accent", SAFE_R - 5, BOTTOM_ACCENT_Y, 5, 4, [
        text_run("§", 9, ACCENT, latin=LATIN, bold=True),
    ], align="r"))


# ---------------------------------------------------------------------------
# Slide compositions (yoko = 97 × 61 mm)
# ---------------------------------------------------------------------------

def front_yoko() -> str:
    shapes: list[str] = []
    shared_chrome(shapes, label_text="IDENTITY")

    # ABE SHINJI — display name.
    shapes.append(text_box(120, "name-en", SAFE_L, 17.5, SAFE_W, 12, [
        text_run("ABE SHINJI", 26, INK, latin=LATIN, bold=True,
                 tracking_em=-0.025),
    ]))

    # 安部 新司 — JP sub-name.
    shapes.append(text_box(121, "name-jp", SAFE_L, 31.6, SAFE_W, 5, [
        text_run("安部  新司", 11, INK_MID, latin=LATIN, ea=JP,
                 tracking_em=0.18),
    ]))

    # Statement: OSINT · Machine Learning · Information Theory.
    # Sits just above the bottom rule, mirroring the HTML's margin-top:auto.
    shapes.append(text_box(140, "statement", SAFE_L, 47.0, SAFE_W, 4, [
        text_run("OSINT", 6.5, INK_MID, latin=LATIN, bold=True, tracking_em=0.14),
        text_run("  ·  ", 6.5, INK_FAINT, latin=LATIN),
        text_run("MACHINE LEARNING", 6.5, INK_MID, latin=LATIN, bold=True,
                 tracking_em=0.14),
        text_run("  ·  ", 6.5, INK_FAINT, latin=LATIN),
        text_run("INFORMATION THEORY", 6.5, INK_MID, latin=LATIN, bold=True,
                 tracking_em=0.14),
    ]))

    # Email — bottom strip.
    shapes.append(text_box(150, "email", SAFE_L, BOTTOM_TEXT_Y, 60, 3.2, [
        text_run("4beshinji@gmail.com", 7, INK, latin=LATIN,
                 tracking_em=0.04),
    ]))

    return _wrap_slide("\n".join(shapes), creation_id="1911038205")


def back_yoko() -> str:
    shapes: list[str] = []
    shared_chrome(shapes, label_text="MISSION")

    # Tagline line 1 — もつれた課題を、
    shapes.append(text_box(120, "tagline-l1", SAFE_L, 15.0, SAFE_W, 7, [
        text_run("もつれた課題を、", 17, INK, latin=LATIN, ea=JP, bold=True,
                 tracking_em=0.01),
    ]))

    # Tagline line 2 — 解きほぐす。 (red, italic — synthetic skew on JP glyphs
    # since Hiragino has no italic cut. Reads as motion/resolution against the
    # upright problem-statement above.)
    shapes.append(text_box(121, "tagline-l2", SAFE_L, 23.5, SAFE_W, 7, [
        text_run("解きほぐす。", 17, ACCENT, latin=LATIN, ea=JP, bold=True,
                 italic=True, tracking_em=0.01),
    ]))

    # Paraphrase — // untangle what is tangled (italic).
    shapes.append(text_box(122, "paraphrase", SAFE_L, 33.0, SAFE_W, 4.5, [
        text_run("//  ", 8.5, INK_MID, latin=LATIN, italic=True,
                 tracking_em=0.10),
        text_run("untangle what is tangled", 8.5, INK_MID, latin=LATIN,
                 italic=True, tracking_em=0.10),
    ]))

    # TangleTeck. wordmark — sits just above the bottom rule.
    shapes.append(text_box(140, "wordmark", SAFE_L, 41.8, SAFE_W, 9, [
        text_run("TangleTeck", 22, INK, latin=LATIN, bold=True,
                 tracking_em=-0.025),
        text_run(".", 22, ACCENT, latin=LATIN, bold=True),
    ]))

    # URL — bottom strip.
    shapes.append(text_box(150, "url", SAFE_L, BOTTOM_TEXT_Y, 60, 3.2, [
        text_run("tangle-tech.com", 7, INK, latin=LATIN, tracking_em=0.04),
    ]))

    return _wrap_slide("\n".join(shapes), creation_id="1188900872")


def _wrap_slide(spTree_inner: str, *, creation_id: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
{spTree_inner}
</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>'''


# ---------------------------------------------------------------------------
# Build pptx
# ---------------------------------------------------------------------------

def build(template_pptx: Path, out_pptx: Path,
          slide1_xml: str, slide2_xml: str) -> None:
    out_pptx.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(template_pptx, "r") as zin, \
         zipfile.ZipFile(out_pptx, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == "ppt/slides/slide1.xml":
                zout.writestr(item, slide1_xml)
            elif item.filename == "ppt/slides/slide2.xml":
                zout.writestr(item, slide2_xml)
            else:
                zout.writestr(item, zin.read(item.filename))


def main() -> None:
    yoko_template = TEMPLATE_DIR / "meishi_yoko_pptx.pptx"
    if not yoko_template.exists():
        with zipfile.ZipFile(TEMPLATE_ZIP) as z:
            (ROOT.parent / "accea_meishi_pptx_templates").mkdir(exist_ok=True)
            z.extractall(ROOT.parent)

    out = ROOT / "abe_shinji_yoko.pptx"
    build(yoko_template, out, front_yoko(), back_yoko())
    print(f"wrote {out.relative_to(ROOT.parent)}")


if __name__ == "__main__":
    main()
