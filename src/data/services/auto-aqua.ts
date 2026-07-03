import autoAquaHero from "@/assets/services/auto-aqua/hero.png";
import autoAquaGrowth from "@/assets/services/auto-aqua/growth.png";
import autoAquaShipping from "@/assets/services/auto-aqua/shipping.png";
import autoAquaFinance from "@/assets/services/auto-aqua/finance.png";
import autoAquaYolo from "@/assets/services/auto-aqua/yolo.png";
import type { Service } from "./types";

export const autoAqua: Service = {
  slug: "auto-aqua",
  index: "003",
  name: "Auto Aqua",
  nameLatin: "Auto Aqua",
  category: "Land-based Aquaculture",
  tagline: "陸上養殖を、賃貸投資感覚に。",
  pitch:
    "水質センサーと個体認識 AI を組み合わせ、給餌・水換え・疾病検知まで自律化するクルマエビ陸上養殖管理システム。",
  disciplines: ["AQUA", "BIO", "IOT", "CV", "ML", "LLM", "EMB", "CTRL"],
  highlights: [
    {
      title: "水質 × 個体認識の二段監視",
      body: "温度・塩分・pH・DO・ORP と YOLOv11 による個体・サイズ分類を統合。異常を多角的に検出。",
    },
    {
      title: "意図しない自動化を防ぐ Sanitizer",
      body: "World Model と業務ルールで LLM の過剰な自動アクションを抑止。安全側にフェイルする運用設計。",
    },
    {
      title: "幅広いデバイス対応",
      body: "Tapo / SwitchBot / Zigbee / Home Assistant をブリッジするマルチプロトコル対応。",
    },
  ],
  stack: [
    "Python 3.11 / FastAPI",
    "React 19 + Vite + Tailwind",
    "MQTT / PostgreSQL",
    "YOLOv11 / OpenCV / llama-cpp",
    "CVAT 連携",
  ],
  useCases: [
    "小規模クルマエビ陸上養殖場の省人化",
    "夜間・休日の異常検知と自律対処",
    "養殖実証施設のデータ収集基盤",
  ],
  status: "beta",
  statusLabel: "β / Pilot site",
  media: {
    hero: {
      src: autoAquaHero,
      alt: "Auto Aqua のトップページ",
      caption: "Auto Aqua ─ 養殖場運営ダッシュボード",
    },
    gallery: [
      {
        kind: "video",
        src: "/videos/services/auto-aqua/shrimp-detection-20260423.mp4",
        poster:
          "/videos/services/auto-aqua/shrimp-detection-20260423-poster.jpg",
        alt: "YOLOv11 によるクルマエビ個体検出のアノテーション動画",
        caption:
          "YOLOv11 + 個体追跡 ─ 養殖水槽内のサイズ別検出 / 2026.04.23 撮影",
        loop: true,
        autoplay: true,
        controls: true,
      },
      {
        src: autoAquaGrowth,
        alt: "育成画面",
        caption: "育成 ─ 個体サイズ分布と成長カーブ",
      },
      {
        src: autoAquaYolo,
        alt: "YOLO 検出のスクリーンショット",
        caption: "YOLOv11 ─ 水槽内クルマエビの個体検出",
      },
      {
        src: autoAquaShipping,
        alt: "出荷計画",
        caption: "出荷計画 ─ 成長予測と市場価格の重ね合わせ",
      },
      {
        src: autoAquaFinance,
        alt: "収支管理",
        caption: "収支管理 ─ 飼料コストと収益のトラッキング",
      },
    ],
  },
};
