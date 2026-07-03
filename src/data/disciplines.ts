/** Discipline lattice に表示する分野略号 */
export type DisciplineCode =
  | "AGR"
  | "AQUA"
  | "BIO"
  | "IOT"
  | "CV"
  | "ML"
  | "VLM"
  | "LLM"
  | "GIS"
  | "ECON"
  | "EMB"
  | "CTRL"
  | "TTS"
  | "3D"
  | "NLP"
  | "KG"
  | "HR"
  | "GOV"
  | "AUDIT"
  | "RBAC"
  | "UX"
  | "MTNT"
  | "MTMC"
  | "POLICY"
  | "FED"
  | "GPU"
  | "EDGE";

/** Discipline lattice に表示する分野略号とその正式名称 */
export const DISCIPLINE_LABELS: Record<DisciplineCode, string> = {
  AGR: "Agriculture — 農業",
  AQUA: "Aquaculture — 陸上養殖",
  BIO: "Biology — 生物学",
  IOT: "Internet of Things — モノのインターネット",
  CV: "Computer Vision — 画像認識",
  ML: "Machine Learning — 機械学習",
  VLM: "Vision Language Model — 視覚言語モデル",
  LLM: "Large Language Model — 大規模言語モデル",
  GIS: "Geographic Information System — 地理情報システム",
  ECON: "Economics — 経済学",
  EMB: "Embedded Systems — 組み込みシステム",
  CTRL: "Control Systems — 制御システム",
  TTS: "Text-to-Speech — 音声合成",
  "3D": "3D Graphics — 3D グラフィックス",
  NLP: "Natural Language Processing — 自然言語処理",
  KG: "Knowledge Graph — 知識グラフ",
  HR: "Human Resources — 人事",
  GOV: "Governance — ガバナンス",
  AUDIT: "Auditing — 監査",
  RBAC: "Role-Based Access Control — ロールベースアクセス制御",
  UX: "User Experience — ユーザー体験",
  MTNT: "Multi-tenancy — マルチテナント",
  MTMC: "Multi-target Multi-camera Tracking — マルチカメラ追跡",
  POLICY: "Policy — ポリシー",
  FED: "Federation — フェデレーション",
  GPU: "GPU Computing — GPU 計算",
  EDGE: "Edge Computing — エッジコンピューティング",
};
