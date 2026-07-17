import officeToyboxHero from "@/assets/services/office-toybox/user-dashboard.png";
import officeToyboxUserDashboardDefault from "@/assets/services/office-toybox/user-dashboard-default.webp";
import officeToyboxAdminZoneEditor from "@/assets/services/office-toybox/admin-zone-editor.webp";
import officeToyboxAdminCameraSetup from "@/assets/services/office-toybox/admin-camera-setup.webp";
import officeToyboxSpatialMonitor from "@/assets/services/office-toybox/spatial-monitor-mtmc.jpg";
import type { Service } from "./types";

export const officeToybox: Service = {
  slug: "office-toybox",
  index: "103",
  name: "SOMS",
  nameLatin: "SOMS",
  category: "Technology Demonstrator / Spatial Operations",
  tagline: "ローカルな知能を、空間ごとに配置する。",
  pitch:
    "拠点ごとに AI ノードを置き、ReAct LLM と多視点カメラ追跡でオフィス空間を監視・運営する自律ハブ。データはノード内に閉じる。",
  disciplines: ["IOT", "CV", "MTMC", "LLM", "FED", "GPU", "EDGE", "AUDIT"],
  highlights: [
    {
      title: "データは 100% ローカル",
      body: "個人情報はオンメモリで揮発。処理はすべてローカル。保存されるデータはすべて統計値。徹底的なプライバシー保護。",
    },
    {
      title: "CoreHub フェデレーション",
      body: "複数拠点のハブが互いを自動検出し連携。拠点を増やすほど自律的に網が広がる。",
    },
    {
      title: "MTMC 追跡と異常検知",
      body: "YOLOv11 によるマルチカメラ・マルチターゲット追跡で、転倒や異常滞留を検知。",
    },
  ],
  stack: [
    "Python 3.11 / FastAPI",
    "React 19 + Vite + Tailwind",
    "YOLOv11 MTMC / ArUco / WiFi-CSI",
    "llama-cpp",
    "AMD ROCm GPU",
  ],
  useCases: [
    "中小オフィスの夜間無人運営",
    "シェアオフィス・コワーキングの利用者見守り",
    "実証研究拠点の常時センシング基盤",
  ],
  status: "beta",
  statusLabel: "β / Operational",
  media: {
    hero: {
      src: officeToyboxHero,
      alt: "SOMS の利用者向けダッシュボード",
      caption: "Sushitech2026 出展用カスタム ─ NUNUAI 様向けに提供",
      context:
        "完全オフライン前提でチャット側にイベント案内・挨拶・NUNUPC 様紹介を実装。TTS は『顔を向けないと話さない』『通行人数に応じた発話』など対人インタラクトを強化。前夜から指定 PC への OS インストール＋約 250GB のエコシステム導入を貧弱回線下で完遂。流動的な前提と厳しい環境制約の下でも極短期間での開発が可能。",
    },
    gallery: [
      {
        src: officeToyboxUserDashboardDefault,
        alt: "SOMS 利用者ダッシュボード ─ お願い事一覧と SOMS 報酬",
        caption:
          "User Dashboard ─ センサー異常から生成された『お願い事』を SOMS トークン報酬付きで提示",
      },
      {
        src: officeToyboxSpatialMonitor,
        alt: "Spatial Monitor ─ マルチカメラによる人物追跡ビュー",
        caption:
          "Spatial Monitor ─ YOLOv11 MTMC でゾーン横断の人物・デバイス・カメラ視野をリアルタイム可視化",
      },
      {
        src: officeToyboxAdminZoneEditor,
        alt: "SOMS Admin ─ Zone Editor",
        caption:
          "Admin / Zone Editor ─ フロアプラン上にゾーンとセンサー配置を定義し、活動ヒートマップを重畳",
      },
      {
        src: officeToyboxAdminCameraSetup,
        alt: "SOMS Admin ─ Camera Setup",
        caption:
          "Admin / Camera Setup ─ カメラ視野角をフロアにマッピングし、ライブフィードと対応付け",
      },
    ],
  },
};
