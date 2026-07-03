import type { Service } from "./types";

export const nuai: Service = {
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
};
