import type { Service } from "./types";

export const autoCell: Service = {
  slug: "auto-cell",
  index: "105",
  name: "auto_cell",
  nameLatin: "Bioreactor Control Study",
  category: "Technology Demonstrator / Bioprocess",
  tagline: "生物プロセスに、安全な階層制御を適用する。",
  pitch:
    "ヒトiPS細胞の3D浮遊培養を対象に、決定的制御・ベイズ最適化・LLM判断支援を階層化した研究用制御フレームワーク。実装置接続前にデジタルツインで検証する。",
  disciplines: ["BIO", "IOT", "ML", "LLM", "CTRL", "AUDIT", "POLICY"],
  highlights: [
    {
      title: "決定的制御とAI判断支援の階層化",
      body: "L0/L1がpH・DO・温度を決定的に制御し、MLがrun間の条件を最適化。LLMは状態説明、例外処理、承認要求を担当する。",
    },
    {
      title: "文献ベースのデジタルツイン",
      body: "Monod型速度論モデルで7日間の培養状態を再現し、給餌・灌流・撹拌操作の制御ロジックを実機なしで検証する。",
    },
    {
      title: "規制を見据えた監査設計",
      body: "安全包絡線、信頼度、承認、プロンプト版、操作前後の状態を記録し、再現可能な研究基盤として構成する。",
    },
  ],
  stack: [
    "physical-ai-core / Python 3.11",
    "SciPy digital twin",
    "Ax / BoTorch Bayesian optimization",
    "MQTT / OPC-UA LADS / SiLA2 gateways",
    "ALCOA-lite audit trail",
  ],
  useCases: [
    "バイオリアクター制御ロジックの研究",
    "階層型Physical AIの安全性検証",
    "Human-in-the-loop制御の技術実証",
  ],
  status: "in-development",
  statusLabel: "R&D / Digital twin",
};
