"""Build Tangle Teck business card pptx by replacing slide1/slide2 in the
ACCEA template, preserving its slide size, masters, and bleed/trim setup.

Site palette → print:
  paper #F5F3EE (cream)   ink #0E0E0C
  ink-mid #5A5852         ink-faint #A3A098
  rule rgba(0,0,0,0.18)   accent #FF3B1C

Coordinate system: 1mm = 36000 EMU.  Slide is 97×61 mm (yoko) with 3 mm bleed,
so trim sits at 3-94 mm × 3-58 mm and the safety zone at 6-91 mm × 6-55 mm.
All foreground content stays inside the safety zone.
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

# Fonts — chosen to render reasonably across systems and print engines.
LATIN_DISPLAY = "Helvetica Neue"
LATIN_SANS = "Helvetica Neue"
LATIN_MONO = "JetBrains Mono"
LATIN_SERIF_IT = "EB Garamond"

JP_SANS = "Hiragino Sans"
JP_MINCHO = "Hiragino Mincho ProN"


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
             latin: str = LATIN_SANS,
             ea: str = JP_SANS) -> str:
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
    """Single-paragraph text box.  `runs` is a list of run XML strings.
    `wrap='square'` clips text to the box width; `wrap='none'` lets it
    overflow (use only for short, measured strings)."""
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


# ---------------------------------------------------------------------------
# Slide compositions (yoko = 97 × 61 mm)
# ---------------------------------------------------------------------------

W, H = 97.0, 61.0  # mm — full slide incl. 3mm bleed all around


def front_yoko() -> str:
    shapes = []

    # Background — full bleed, cream paper.
    shapes.append(rect_fill(100, "bg", 0, 0, W, H, PAPER))

    # Top metadata strip ----------------------------------------------------
    # Hairline below the metadata.
    shapes.append(rect_fill(101, "rule-top", 8, 11.4, 81, 0.1, INK_MID))

    # Section index (left): "§ 001"
    shapes.append(text_box(110, "section-index", 8, 6.8, 30, 3.5, [
        text_run("§", 6.5, ACCENT, latin=LATIN_MONO, tracking_em=0.18, bold=True),
        text_run(" 001", 6.5, INK_MID, latin=LATIN_MONO, tracking_em=0.18),
    ]))

    # Wordmark (right): TANGLETECK
    shapes.append(text_box(111, "wordmark", 55, 6.8, 34, 3.5, [
        text_run("TANGLETECK", 6.5, INK, latin=LATIN_MONO, tracking_em=0.22, bold=True),
    ], align="r"))

    # Hero block ------------------------------------------------------------
    # Latin name — display.
    shapes.append(text_box(120, "name-en", 8, 17.5, 78, 12, [
        text_run("ABE SHINJI", 26, INK, latin=LATIN_DISPLAY, bold=True, tracking_em=-0.03),
    ]))

    # JP name — mincho.
    shapes.append(text_box(121, "name-jp", 8, 31.5, 60, 5, [
        text_run("安部 新司", 12, INK_MID, latin=LATIN_SERIF_IT, ea=JP_MINCHO),
    ]))

    # Title (italic serif) — sits at the right of the JP name baseline.
    shapes.append(text_box(122, "title", 55, 31.7, 34, 5, [
        text_run("Independent", 10.5, INK, latin=LATIN_SERIF_IT, italic=True),
    ], align="r"))

    # Hairline + discipline lattice ----------------------------------------
    shapes.append(rect_fill(130, "rule-mid", 8, 41.8, 81, 0.1, INK_MID))
    shapes.append(text_box(131, "lattice-label", 8, 43.6, 30, 3.5, [
        text_run("DISCIPLINES", 6, INK_FAINT, latin=LATIN_MONO, tracking_em=0.22),
    ]))
    shapes.append(text_box(132, "lattice", 8, 47.2, 81, 4, [
        text_run("OSINT", 9, INK, latin=LATIN_MONO, tracking_em=0.16, bold=True),
        text_run("    ·    ", 9, INK_FAINT, latin=LATIN_MONO),
        text_run("ML", 9, INK, latin=LATIN_MONO, tracking_em=0.16, bold=True),
        text_run("    ·    ", 9, INK_FAINT, latin=LATIN_MONO),
        text_run("INFO-TH", 9, INK, latin=LATIN_MONO, tracking_em=0.16, bold=True),
    ]))

    # Bottom contact strip --------------------------------------------------
    shapes.append(text_box(150, "email", 8, 54.6, 45, 3.2, [
        text_run("4beshinji@gmail.com", 7, INK, latin=LATIN_MONO, tracking_em=0.04),
    ]))
    shapes.append(text_box(151, "url", 55, 54.6, 30, 3.2, [
        text_run("tangle-tech.com", 7, INK, latin=LATIN_MONO, tracking_em=0.04, bold=True),
    ], align="r"))
    shapes.append(text_box(152, "accent-mark", 86, 54.4, 4, 3.5, [
        text_run("§", 8, ACCENT, latin=LATIN_MONO, bold=True),
    ], align="r"))

    return _wrap_slide("\n".join(shapes), creation_id="1911038205")


def back_yoko() -> str:
    shapes = []

    # Background.
    shapes.append(rect_fill(100, "bg", 0, 0, W, H, PAPER))

    # Top metadata strip — mirrors front structure but lighter.
    shapes.append(rect_fill(101, "rule-top", 8, 11.4, 81, 0.1, INK_MID))
    shapes.append(text_box(110, "back-tag", 8, 6.8, 30, 3.5, [
        text_run("§", 6.5, ACCENT, latin=LATIN_MONO, tracking_em=0.18, bold=True),
        text_run(" MISSION", 6.5, INK_MID, latin=LATIN_MONO, tracking_em=0.22),
    ]))
    shapes.append(text_box(111, "back-wordmark", 55, 6.8, 34, 3.5, [
        text_run("TANGLETECK", 6.5, INK, latin=LATIN_MONO, tracking_em=0.22, bold=True),
    ], align="r"))

    # Centered Japanese tagline — the hero of the back.
    shapes.append(text_box(120, "tagline-jp", 6, 22, 85, 9, [
        text_run("もつれた課題を、解きほぐす。", 17, INK,
                 latin=LATIN_SERIF_IT, ea=JP_MINCHO, tracking_em=0.06),
    ], align="ctr"))

    # Latin paraphrase under it — terser.
    shapes.append(text_box(121, "tagline-en", 6, 34.5, 85, 5, [
        text_run("Untangle what is tangled.", 10, INK_MID,
                 latin=LATIN_SERIF_IT, italic=True),
    ], align="ctr"))

    # Hairline near footer.
    shapes.append(rect_fill(122, "rule-bottom", 8, 48.5, 81, 0.1, INK_MID))

    # Footer: company-wide discipline lattice (echoes the site's hero).
    shapes.append(text_box(130, "lattice-back", 6, 50.6, 85, 3.5, [
        text_run("AGR · BIO · IOT · CV · ML · LLM · ECON · EMB", 6, INK_FAINT,
                 latin=LATIN_MONO, tracking_em=0.18),
    ], align="ctr"))

    # Bottom URL.
    shapes.append(text_box(131, "url-back", 6, 55.2, 85, 3.5, [
        text_run("tangle-tech.com", 7, INK, latin=LATIN_MONO,
                 tracking_em=0.08, bold=True),
    ], align="ctr"))

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
        # Fall back: extract from the zipped templates if needed.
        import io
        with zipfile.ZipFile(TEMPLATE_ZIP) as z:
            (ROOT.parent / "accea_meishi_pptx_templates").mkdir(exist_ok=True)
            z.extractall(ROOT.parent)

    out = ROOT / "abe_shinji_yoko.pptx"
    build(yoko_template, out, front_yoko(), back_yoko())
    print(f"wrote {out.relative_to(ROOT.parent)}")


if __name__ == "__main__":
    main()
