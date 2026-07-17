import type { Service } from "./types";

export const farmOps: Service = {
  slug: "farm-ops",
  index: "002",
  name: "farm-ops",
  nameLatin: "Human Operations for Farms",
  category: "Core / HR & Operations",
  tagline: "農場で働く人と、ほ場で起きることをつなぐ。",
  pitch:
    "農場法人向けのHR・労務・タスク・承認・同意・監査基盤。auto_JAの農作業イベントと連動し、誰が、いつ、どのほ場で、何を行うかを安全に管理する。",
  disciplines: ["HR", "GOV", "LLM", "AUDIT", "RBAC", "IOT", "MTNT", "POLICY"],
  highlights: [
    {
      title: "人とほ場の責務を接続",
      body: "auto_JAが管理するFarmingEventを、担当者・スキル・稼働率・期限を持つTaskへ変換。完了した労務実績とコストはほ場側へ還流する。",
    },
    {
      title: "提案してから、動く",
      body: "重大な設備操作や人事アクションは、AIが候補と根拠を提示し、人が承認してから実行。期限切れやエスカレーションまで一つのワークフローで追跡する。",
    },
    {
      title: "同意と監査を最初から",
      body: "カメラ・姿勢・音声・クラウド推論を利用者ごとの同意でゲート。判断、承認、実行をappend-onlyの監査ログへ残す。",
    },
  ],
  stack: [
    "Python 3.11 / FastAPI / React 19",
    "PostgreSQL 16 + RLS / pgvector",
    "Redis + Arq / MQTT",
    "Local LLM via llama.cpp",
    "20 service domains / audit-first architecture",
  ],
  useCases: [
    "複数ほ場を運営する農場法人の人員・権限管理",
    "農作業の自動割当とHITL承認",
    "同意を伴う作業観測と労務監査",
  ],
  status: "in-development",
  statusLabel: "Core / Integration build",
};
