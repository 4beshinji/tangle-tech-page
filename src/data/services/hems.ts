import hemsHero from "@/assets/services/hems/hero.png";
import hemsDevices from "@/assets/services/hems/devices.png";
import hemsDigitalSpace from "@/assets/services/hems/digital-space.png";
import hemsDigitalSpaceKnowledge from "@/assets/services/hems/digital-space-knowledge.png";
import hemsDashboardAvatar from "@/assets/services/hems/dashboard-avatar.png";
import type { Service } from "./types";

export const hems: Service = {
  slug: "hems",
  index: "104",
  name: "HEMS",
  nameLatin: "Home Embodied AI",
  category: "Technology Demonstrator / Home",
  tagline: "生活空間を、ローカルな知識と制御につなぐ。",
  pitch:
    "家電制御・買い物管理・チャット・知識検索・バイオメトリクスを束ね、3D VRM アバターやPSD立ち絵等で応対する家庭向け AI アシスタント。",
  disciplines: ["IOT", "LLM", "TTS", "3D", "NLP", "BIO", "CV", "KG"],
  highlights: [
    {
      title: "アバター常駐",
      body: "ダッシュボード上にアバターが常駐し、発話内容に合わせた表情やモーションで応対。",
    },
    {
      title: "ハイブリッド知識検索",
      body: "BM25 + ベクトル埋め込み + タイトルブーストの 3-way RRF で、ノートや家庭内ドキュメントを横断検索。",
    },
    {
      title: "家のエコシステムに溶け込む",
      body: "Home Assistant / Obsidian / Google Sheets / GAS と連携。後付けで導入できる。",
    },
  ],
  stack: [
    "Python 3.11 / FastAPI",
    "React 19 + TypeScript + Tailwind",
    "Three.js (VRM)",
    "VOICEVOX / VoiSona / Edge TTS",
    "YOLOv11s-pose",
  ],
  useCases: [
    "在宅勤務者の生活支援エージェント",
    "高齢者の見守り・声掛け・異常/転倒検知",
    "個人ナレッジの集約と即応検索",
  ],
  status: "beta",
  statusLabel: "β / Live-in test",
  media: {
    hero: {
      src: hemsHero,
      alt: "HEMS Dashboard ─ Chat / Active Tasks / カレンダー の3カラムビュー",
      caption:
        "HEMS Dashboard ─ Chat・Active Tasks・カレンダーが並ぶ常駐ビュー",
    },
    gallery: [
      {
        src: hemsDevices,
        alt: "Devices ─ 部屋ごとの環境センサーとスマートホーム制御",
        caption:
          "Devices ─ 部屋別の温湿度・CO₂・VOC センサーと Zigbee デバイス制御を一画面に集約",
      },
      {
        src: hemsDigitalSpaceKnowledge,
        alt: "Digital Space ─ Knowledge Base と Google 連携",
        caption:
          "Digital Space ─ PC Status・Knowledge Base (Obsidian)・Google Services・買い物リストを横断",
      },
      {
        src: hemsDigitalSpace,
        alt: "Digital Space ─ VRMアバターとバイオメトリクスデバッグパネル",
        caption:
          "Digital Space ─ アバター常駐ビューとバイオメトリクス・モーションのデバッグ",
      },
      {
        src: hemsDashboardAvatar,
        alt: "HEMS Dashboard ─ アバターのジェスチャ応答",
        caption: "Dashboard ─ 発話に合わせたジェスチャでアバターが応答する様子",
      },
    ],
  },
};
