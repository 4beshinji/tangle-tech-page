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
  index: "001",
  name: "Auto JA",
  nameLatin: "Auto JA",
  category: "Core / Field Intelligence & Control",
  tagline: "植物の生理から、温室と農場の次の状態を決める。",
  pitch:
    "植物群落の光合成・蒸散・炭素収支と温室の空間気候をモデル化し、センサー観測から環境介入までを閉じる自律制御基盤。露地・水耕・養蜂・陸上養殖にもドメインプラグインで展開する。",
  disciplines: ["AGR", "AQUA", "BIO", "IOT", "CV", "ML", "VLM", "LLM", "ECON"],
  highlights: [
    {
      title: "植物群落モデルを制御の起点に",
      body: "キュウリ群落のキャノピー光合成、維持呼吸、乾物分配、収穫を連続モデルで推定。光・CO₂・温度の律速要因と植物の生体状態から、環境目標を動的に算出する。",
    },
    {
      title: "速い物理制御と遅い戦略判断",
      body: "分単位の内ループは決定論的な植物―ハウス結合モデルが担当。時間・日単位の外ループはLLMが経済、作物ステアリング、例外を扱う。安全性と説明可能性を両立する。",
    },
    {
      title: "観測から実測較正へ",
      body: "PAR・CO₂・温湿度・土壌温度を分散エッジで収集し、実測値と収穫実績からシミュレータを較正。観測、状態推定、栽培助言、承認付き介入を同じ基盤で接続する。",
    },
  ],
  stack: [
    "Python 3.11 / FastAPI",
    "React 19 + Vite + Tailwind",
    "MQTT / PostgreSQL",
    "GreenLight / PCSE-WOFOST / canopy model",
    "physical-ai-core / DomainVertical plugins",
  ],
  useCases: [
    "施設園芸の生理駆動型環境制御",
    "分散した露地・温室の遠隔観測と介入",
    "農場法人の生産・市場・経営統合",
  ],
  status: "beta",
  statusLabel: "Core / Research implementation",
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
