import autoBeeHero from "@/assets/services/auto-bee/hero.png";
import autoBeeHiveDetail from "@/assets/services/auto-bee/hive-detail.png";
import autoBeeNectar from "@/assets/services/auto-bee/nectar-source.png";
import autoBeeInspection from "@/assets/services/auto-bee/inspection.png";
import autoBeeFinance from "@/assets/services/auto-bee/finance.png";
import type { Service } from "./types";

export const autoBee: Service = {
  slug: "auto-bee",
  index: "102",
  name: "Auto Bee",
  nameLatin: "Auto Bee",
  category: "Technology Demonstrator / Apiculture",
  tagline: "巣箱の内側と、その周囲の植生を一つの系として見る。",
  pitch:
    "巣箱の設置位置決定支援からモニタリング・分蜂検知まで、IoT センサー・画像認識・LLM エージェントで一貫管理する自律養蜂システム。",
  disciplines: ["AGR", "BIO", "IOT", "CV", "ML", "LLM", "GIS", "ECON"],
  highlights: [
    {
      title: "巣箱センシングと分蜂リスク検知",
      body: "重量・巣内温湿度・出入り活動量をリアルタイム監視し、複合スコアで分蜂リスクを算出。ルールベースとReAct ループの併用で即時検知と複雑な判断を両立。",
    },
    {
      title: "蜜源GIS分析",
      body: "周辺の蜜源植生・土地利用・距離減衰を空間解析し、巣箱設置位置の候補を提案。群馬県前橋市の JGD2011 座標系で実証。",
    },
    {
      title: "遠隔オペレーション",
      body: "各種外部ツール連携で、異常を即座に通知。アクチュエータをその場で制御。だめそうなら……現場にダッシュ！",
    },
  ],
  stack: [
    "Python 3.11 / FastAPI",
    "React 19 + Vite + Tailwind",
    "MQTT / PostgreSQL",
    "YOLOv11 / llama-cpp",
    "Docker Compose (15+)",
  ],
  useCases: [
    "ESG投資文脈での生態系記録と都市環境改善投資",
    "山間部養蜂家の分蜂検知と遠隔監視",
    "教育・研究機関の養蜂センシング基盤",
  ],
  status: "beta",
  statusLabel: "β / Field trial",
  media: {
    hero: {
      src: autoBeeHero,
      alt: "Auto Bee の巣箱マップ画面",
      caption: "Auto Bee ─ 巣箱マップ / 蜜源ポテンシャルと巣箱配置",
    },
    gallery: [
      {
        src: autoBeeHiveDetail,
        alt: "巣箱詳細",
        caption: "巣箱詳細 ─ 重量・温湿度・出入り活動量の時系列",
      },
      {
        src: autoBeeNectar,
        alt: "蜜源登録",
        caption: "蜜源登録 ─ 植生 / 土地利用データから候補地を評価",
      },
      {
        src: autoBeeInspection,
        alt: "内見記録",
        caption: "内見記録 ─ 蜂群健康・女王蜂・産卵状況のフィールドログ",
      },
      {
        src: autoBeeFinance,
        alt: "収支管理",
        caption: "収支管理 ─ 蜂蜜収量と運営コストのトラッキング",
      },
    ],
  },
};
