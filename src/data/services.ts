import type { ImageMetadata } from "astro";

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
  index: string; // "001"-"005"
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
    2. 上部で `import autoBeeHero from "@/assets/services/auto-bee/hero.jpg";` のように import
    3. 該当 service の media.hero.src に渡す (alt と caption も)
*/

export const SERVICES: Service[] = [
  {
    slug: "auto-bee",
    index: "001",
    name: "Auto Bee",
    nameLatin: "Auto Bee",
    category: "Apiculture × Hydroponics",
    tagline: "蜜源GIS分析から環境監視、制御まで。蜂の巣すら溶けだす温暖化時代の養蜂管理。",
    pitch:
      "巣箱の設置位置決定支援からモニタリング・分蜂検知まで、IoT センサー・画像認識・LLM エージェントで一貫管理する自律ファームシステム。",
    disciplines: ["AGR", "BIO", "IOT", "CV", "ML", "LLM", "ECON", "EMB"],
    highlights: [
      {
        title: "養蜂 × 水耕の統合制御",
        body: "巣箱の振動・内部カメラ・温湿度と、水耕の pH/EC/温度を同一ダッシュボードで監視・制御。",
      },
      {
        title: "経営分析まで一気通貫",
        body: "11 データソースの市場価格スクレイパーと予測エンジンを内蔵。生産だけでなく出荷・収益まで支援。",
      },
      {
        title: "遠隔オペレーション",
        body: "音声通知と Discord 連携で、現場へ行かずに異常検知・操作判断を行う運用体制。",
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
      "都市型小規模養蜂家の見守り自動化",
      "葉物野菜の通年水耕生産",
      "養蜂と水耕を組み合わせた複合経営",
    ],
    status: "beta",
    statusLabel: "β / Field trial",
  },
  {
    slug: "auto-aqua",
    index: "002",
    name: "Auto Aqua",
    nameLatin: "Auto Aqua",
    category: "Land-based Aquaculture",
    tagline: "陸上養殖を、賃貸投資感覚に。",
    pitch:
      "水質センサーと個体認識 AI を組み合わせ、給餌・水換え・疾病検知まで自律化する養殖管理システム。",
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
      ],
    },
  },
  {
    slug: "hems",
    index: "003",
    name: "HEMS",
    nameLatin: "Home Embodied AI",
    category: "Personal Assistant",
    tagline: "家とくらしに、寄り添う AI。",
    pitch:
      "家電制御・買い物管理・チャット・知識検索・バイオメトリクスを束ね、3D VRM アバターで応対する家庭向け AI アシスタント。",
    disciplines: ["IOT", "LLM", "TTS", "3D", "NLP", "BIO", "CV", "KG"],
    highlights: [
      {
        title: "アバター常駐",
        body: "ダッシュボード上にアバターが常駐し、発話に合わせたモーションとリップシンクで応対。",
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
      "高齢者の見守り・声掛け",
      "個人ナレッジの集約と即応検索",
    ],
    status: "beta",
    statusLabel: "β / Live-in test",
  },
  {
    slug: "business-ops",
    index: "004",
    name: "Business Ops",
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
    index: "005",
    name: "Office as AI Toybox",
    nameLatin: "SOMS",
    category: "Autonomous Site Operations",
    tagline: "GPU とセンサーが、オフィスを自律運転する。",
    pitch:
      "拠点ごとに AI ノードを置き、ReAct LLM と多視点カメラ追跡でオフィス空間を監視・運営する自律ハブ。データはノード内に閉じる。",
    disciplines: ["IOT", "CV", "MTMC", "LLM", "FED", "GPU", "EDGE", "AUDIT"],
    highlights: [
      {
        title: "データは 100% ローカル",
        body: "raw データはノードを離れない。外部クラウド連携は明示オプトイン方式でデータ主権を最優先。",
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
  },
];
