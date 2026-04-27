import type { ImageMetadata } from "astro";

// Auto Bee
import autoBeeHero from "@/assets/services/auto-bee/hero.png";
import autoBeeHiveDetail from "@/assets/services/auto-bee/hive-detail.png";
import autoBeeNectar from "@/assets/services/auto-bee/nectar-source.png";
import autoBeeInspection from "@/assets/services/auto-bee/inspection.png";
import autoBeeFinance from "@/assets/services/auto-bee/finance.png";

// Auto JA
import autoJaHero from "@/assets/services/auto-ja/hero.png";
import autoJaMedium from "@/assets/services/auto-ja/medium-management.png";
import autoJaAquaponics from "@/assets/services/auto-ja/aquaponics.png";
import autoJaCropSuggestion from "@/assets/services/auto-ja/crop-suggestion.png";
import autoJaSchedule from "@/assets/services/auto-ja/cultivation-schedule.png";
import autoJaFinance from "@/assets/services/auto-ja/finance.png";
import autoJaMarketTrend from "@/assets/services/auto-ja/market-trend.png";
import autoJaMarketPrice from "@/assets/services/auto-ja/market-price.png";
import autoJaMarketError from "@/assets/services/auto-ja/market-error.png";

// Auto Aqua
import autoAquaHero from "@/assets/services/auto-aqua/hero.png";
import autoAquaGrowth from "@/assets/services/auto-aqua/growth.png";
import autoAquaShipping from "@/assets/services/auto-aqua/shipping.png";
import autoAquaFinance from "@/assets/services/auto-aqua/finance.png";
import autoAquaYolo from "@/assets/services/auto-aqua/yolo.png";

// HEMS
import hemsHero from "@/assets/services/hems/hero.png";
import hemsDevices from "@/assets/services/hems/devices.png";
import hemsDigitalSpace from "@/assets/services/hems/digital-space.png";
import hemsDigitalSpaceKnowledge from "@/assets/services/hems/digital-space-knowledge.png";
import hemsDashboardAvatar from "@/assets/services/hems/dashboard-avatar.png";

// Office as AI Toybox
import officeToyboxHero from "@/assets/services/office-toybox/user-dashboard.png";
import officeToyboxUserDashboardDefault from "@/assets/services/office-toybox/user-dashboard-default.webp";
import officeToyboxAdminZoneEditor from "@/assets/services/office-toybox/admin-zone-editor.webp";
import officeToyboxAdminCameraSetup from "@/assets/services/office-toybox/admin-camera-setup.webp";
import officeToyboxSpatialMonitor from "@/assets/services/office-toybox/spatial-monitor-mtmc.jpg";

export type GalleryImageItem = {
  kind?: "image";
  src: ImageMetadata | string;
  alt: string;
  caption?: string;
};

export type GalleryVideoItem = {
  kind: "video";
  src: string; // public/ 直下からの絶対パス e.g. "/videos/services/auto-aqua/foo.mp4"
  poster?: ImageMetadata | string;
  alt: string;
  caption?: string;
  loop?: boolean;
  autoplay?: boolean;
  controls?: boolean;
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

export type ServiceMedia = {
  hero?: { src: ImageMetadata | string; alt: string; caption?: string; context?: string };
  gallery?: GalleryItem[];
};

export type Service = {
  slug: string;
  index: string; // ゼロ埋め 3 桁。SERVICES の並びに合わせて手で振る
  name: string;
  nameLatin?: string;
  category: string;
  tagline: string;
  pitch: string;
  /** 略号で並べる分野コード (装飾ではなく情報構造) */
  disciplines: string[];
  highlights: { title: string; body: string }[];
  stack: string[];
  useCases: string[];
  status: "production" | "beta" | "in-development";
  statusLabel: string;
  /** 画像が用意されたら埋める。未設定でもタイポのみで成立 */
  media?: ServiceMedia;
};

/*
  画像の追加方法:
    1. src/assets/services/<slug>/ 配下に画像を置く
    2. 上部で `import autoBeeHero from "@/assets/services/auto-bee/hero.png";` のように import
    3. 該当 service の media.hero.src に渡す (alt と caption も)
*/

export const SERVICES: Service[] = [
  {
    slug: "auto-bee",
    index: "001",
    name: "Auto Bee",
    nameLatin: "Auto Bee",
    category: "Apiculture",
    tagline: "蜂の巣すら溶けだす温暖化時代の養蜂管理。",
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
  },
  {
    slug: "auto-ja",
    index: "002",
    name: "Auto JA",
    nameLatin: "Auto JA",
    category: "Multi-domain Farm Platform",
    tagline: "市場予測とセンサ駆動の農場。最適な作物、最適な出荷タイミング。最大のリターン。",
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
  },
  {
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
          poster: "/videos/services/auto-aqua/shrimp-detection-20260423-poster.jpg",
          alt: "YOLOv11 によるクルマエビ個体検出のアノテーション動画",
          caption: "YOLOv11 + 個体追跡 ─ 養殖水槽内のサイズ別検出 / 2026.04.23 撮影",
          loop: true,
          autoplay: true,
          controls: false,
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
  },
  {
    slug: "hems",
    index: "004",
    name: "HEMS",
    nameLatin: "Home Embodied AI",
    category: "Personal Assistant",
    tagline: "家とくらしに、寄り添う AI。",
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
        caption: "HEMS Dashboard ─ Chat・Active Tasks・カレンダーが並ぶ常駐ビュー",
      },
      gallery: [
        {
          src: hemsDevices,
          alt: "Devices ─ 部屋ごとの環境センサーとスマートホーム制御",
          caption: "Devices ─ 部屋別の温湿度・CO₂・VOC センサーと Zigbee デバイス制御を一画面に集約",
        },
        {
          src: hemsDigitalSpaceKnowledge,
          alt: "Digital Space ─ Knowledge Base と Google 連携",
          caption: "Digital Space ─ PC Status・Knowledge Base (Obsidian)・Google Services・買い物リストを横断",
        },
        {
          src: hemsDigitalSpace,
          alt: "Digital Space ─ VRMアバターとバイオメトリクスデバッグパネル",
          caption: "Digital Space ─ アバター常駐ビューとバイオメトリクス・モーションのデバッグ",
        },
        {
          src: hemsDashboardAvatar,
          alt: "HEMS Dashboard ─ アバターのジェスチャ応答",
          caption: "Dashboard ─ 発話に合わせたジェスチャでアバターが応答する様子",
        },
      ],
    },
  },
  {
    slug: "nuai",
    index: "005",
    name: "NUAI",
    nameLatin: "NUAI",
    category: "HR / Governance Platform",
    tagline: "AI と人が、対等に働く組織のための業務基盤。",
    pitch:
      "VRChat ネイティブな企業向けに設計された、マルチテナント対応の自律 HR・業務管理基盤。監査・承認・ロールを統合。",
    disciplines: ["HR", "GOV", "LLM", "AUDIT", "RBAC", "UX", "MTNT", "POLICY"],
    highlights: [
      {
        title: "提案ファースト + 承認フロー",
        body: "AI はカレンダーやタスクを勝手に実行せず、提案 → 承認の二段運用。",
      },
      {
        title: "個人技能・職位に合わせた自動タスク割り振り",
        body: "業務資料からタスクを切り出し、個人のスキルセットや職位に基づいて自動割り振り。人も AI も、得意な仕事に集中できる。",
      },
      {
        title: "VRM キャラクターと業務 UI の両立",
        body: "テナント設定でアバターのオン/オフを切替。VRChat 文化と一般業務、どちらにも馴染む見た目。",
      },
    ],
    stack: [
      "Node.js / pnpm モノレポ",
      "Python FastAPI",
      "React 19 + TypeScript",
      "PostgreSQL",
      "llama-cpp (ローカル LLM)",
    ],
    useCases: [
      "VRChat 親和企業の社員 / プロジェクト管理",
      "ローカル LLM 前提の社内アシスタント",
      "監査要件のある HR ワークフロー自動化",
    ],
    status: "in-development",
    statusLabel: "Phase 1 / Build",
  },
  {
    slug: "office-toybox",
    index: "006",
    name: "Office as AI Toybox",
    nameLatin: "SOMS",
    category: "Autonomous Site Operations",
    tagline: "GPU とセンサーと人間が、オフィスを自律運転する。",
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
        alt: "Office as AI Toybox の利用者向けダッシュボード",
        caption: "Sushitech2026 出展用カスタム ─ NUNUAI 様向けに提供",
        context:
          "完全オフライン前提でチャット側にイベント案内・挨拶・NUNUPC 様紹介を実装。TTS は『顔を向けないと話さない』『通行人数に応じた発話』など対人インタラクトを強化。前夜から指定 PC への OS インストール＋約 250GB のエコシステム導入を貧弱回線下で完遂。流動的な前提と厳しい環境制約の下でも極短期間での開発が可能。",
      },
      gallery: [
        {
          src: officeToyboxUserDashboardDefault,
          alt: "SOMS 利用者ダッシュボード ─ お願い事一覧と SOMS 報酬",
          caption: "User Dashboard ─ センサー異常から生成された『お願い事』を SOMS トークン報酬付きで提示",
        },
        {
          src: officeToyboxSpatialMonitor,
          alt: "Spatial Monitor ─ マルチカメラによる人物追跡ビュー",
          caption: "Spatial Monitor ─ YOLOv11 MTMC でゾーン横断の人物・デバイス・カメラ視野をリアルタイム可視化",
        },
        {
          src: officeToyboxAdminZoneEditor,
          alt: "SOMS Admin ─ Zone Editor",
          caption: "Admin / Zone Editor ─ フロアプラン上にゾーンとセンサー配置を定義し、活動ヒートマップを重畳",
        },
        {
          src: officeToyboxAdminCameraSetup,
          alt: "SOMS Admin ─ Camera Setup",
          caption: "Admin / Camera Setup ─ カメラ視野角をフロアにマッピングし、ライブフィードと対応付け",
        },
      ],
    },
  },
];
