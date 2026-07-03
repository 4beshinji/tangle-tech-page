import autoJaHero from "@/assets/services/auto-ja/hero.png";
import autoJaMedium from "@/assets/services/auto-ja/medium-management.png";
import autoJaAquaponics from "@/assets/services/auto-ja/aquaponics.png";
import autoJaCropSuggestion from "@/assets/services/auto-ja/crop-suggestion.png";
import autoJaSchedule from "@/assets/services/auto-ja/cultivation-schedule.png";
import autoJaFinance from "@/assets/services/auto-ja/finance.png";
import autoJaMarketTrend from "@/assets/services/auto-ja/market-trend.png";
import autoJaMarketPrice from "@/assets/services/auto-ja/market-price.png";
import autoJaMarketError from "@/assets/services/auto-ja/market-error.png";
import type { Service } from "./types";

export const autoJa: Service = {
  slug: "auto-ja",
  index: "002",
  name: "Auto JA",
  nameLatin: "Auto JA",
  category: "Multi-domain Farm Platform",
  tagline:
    "市場予測とセンサ駆動の農場。最適な作物、最適な出荷タイミング。最大のリターン。",
  pitch:
    "水耕栽培・養蜂・陸上養殖のドメインプラグインを差し替えて運用する統合農場プラットフォーム。市場価格データを用いた予測エンジンを内蔵し、最適な収穫タイミング提案から環境介入まで。生産から経営まで一気通貫。",
  disciplines: ["AGR", "AQUA", "BIO", "IOT", "CV", "ML", "VLM", "LLM", "ECON"],
  highlights: [
    {
      title: "プラグイン式マルチドメイン",
      body: "水耕・養蜂・養殖を同一基盤上で運用。コアは経営管理基盤としてドメイン非依存に保たれ、新ドメインはプラグインを足すだけで追加できる。",
    },
    {
      title: "市場予測まで一気通貫",
      body: "複数データソースの市場価格を取り込んだ予測エンジンを内蔵。生産だけでなく、出荷タイミング・価格トレンド・モデル誤差検証まで同じ画面で扱える。",
    },
    {
      title: "培地・養液・栽培スケジュールの自動提案",
      body: "作物プロファイルから培地配合・養液目標値・播種〜出荷スケジュールを AI が提案。アクアポニクス連携も同一の培地管理ビューで扱える。",
    },
  ],
  stack: [
    "Python 3.11 / FastAPI",
    "React 19 + Vite + Tailwind",
    "MQTT / PostgreSQL",
    "YOLOv11 / Ollama (LLM)",
    "Plugin-based Domain Vertical",
  ],
  useCases: [
    "複数ドメインを同時運用する大規模農場",
    "農協・自治体の地域統合プラットフォーム",
    "研究機関・実証事業の多ドメイン基盤",
  ],
  status: "beta",
  statusLabel: "β / Field trial",
  media: {
    hero: {
      src: autoJaHero,
      alt: "Auto JA 統合ダッシュボードのトップ画面",
      caption: "Auto JA ─ 統合農場ダッシュボード / ドメイン横断の俯瞰ビュー",
    },
    gallery: [
      {
        src: autoJaMedium,
        alt: "培地管理",
        caption: "培地管理 ─ 作物別の養液配合と推移",
      },
      {
        src: autoJaAquaponics,
        alt: "培地管理 アクアポニクス連携",
        caption: "培地管理 ─ アクアポニクス連携ビュー",
      },
      {
        src: autoJaCropSuggestion,
        alt: "作物提案",
        caption: "作物提案 ─ 環境条件と市況から栽培候補を提示",
      },
      {
        src: autoJaSchedule,
        alt: "栽培スケジュール",
        caption: "栽培スケジュール ─ 播種から出荷までの工程管理",
      },
      {
        src: autoJaFinance,
        alt: "収支管理",
        caption: "収支管理 ─ ドメイン横断の経営ビュー",
      },
      {
        src: autoJaMarketTrend,
        alt: "市場推移予測",
        caption: "市場予測 ─ 価格推移トレンド",
      },
      {
        src: autoJaMarketPrice,
        alt: "市場予測 価格推移詳細",
        caption: "市場予測 ─ 銘柄別の価格推移",
      },
      {
        src: autoJaMarketError,
        alt: "市場予測 誤差検証",
        caption: "市場予測 ─ モデル誤差の事後検証",
      },
    ],
  },
};
