# Tangle Tech デザイン・コンテンツ改善ロードマップ

> 対象: `/home/sin/code/agent/web/tangle-tech-page`  
> 知識源: `../grapth`、 `../SlingStone-blog`、英語圏 B2B テックサイト調査  
> 目的: 「AI くさい」デザイン言語を修正し、英語圏の信頼設計と技術ブログへの接続を含めた中長期的な改善計画を立てる。

---

## 0. 現在の診断（要約）

### 0.1 強み
- Astro + Tailwind v4 + CSS-only アニメーションという軽量な技術スタック。
- ダーク・エディトリアルな「Computational Editorial」方向性は既に `README.md` で確立されている。
- 6 つのドメイン特化型サービス（養蜂・農場・養殖・HEMS・HR/監査・自律オフィス）があり、ストーリーの種は豊富。
- `../grapth` に高品質 Web 構築の知見・定量データが蓄積されている。
- `../SlingStone-blog` に製品の「裏側」を語る深い記事の素材がすでにある（SOMS など）。

### 0.2 根本的な問題
1. **抽象語とバズワードの氾濫**: 「Autonomous Systems Studio」「Cross-domain, autonomous」「最大のリターン」「自律運転するオフィス」など、どの業界にも当てはまる表現が多い。
2. **具体性の欠如**: 顧客名、数値、導入期間、実装保証、セキュリティ/コンプライアンス表示がない。
3. **英語表現の不自然さ**: 断片的な英語ラベル、和製英語・カタカナ語の多用、日本語サイト内での過剰な英語ナビ。
4. **信頼を損なう接点**: 連絡先が `4beshinji@gmail.com` の個人アドレス。
5. **ブログとの接続不足**: 製品ページと `SlingStone-blog` の深い技術記事が相互にリンクしていない。

### 0.3 英語圏市場でのギャップ
- B2B 購買者が重視する「顧客ロゴ」「数値ベースのケーススタディ」「セキュリティバッジ」「透明な価格」「チーム/About」が不足。
- 「AI-powered」「seamless」「revolutionize」「cutting-edge」「transform」など、英語圏で陳腐化・反感を買う語句が多用されるリスク。

---

## 1. 長期的なビジョン

> **「フィールドの証拠で語る、ドメイン特化型の自律システムスタジオ」**

- **AI くささを排除**: 抽象形容詞ではなく、センサー・カメラ・LLM・エッジ GPU が「現場で何を解決するか」を具体的に語る。
- **信頼設計**: 顧客実績（仮名可）、数値、セキュリティ/プライバシー方針、チーム情報、法的ページを配置。
- **日英の使い分け**: 日本語版は日本語母語者に自然なトーンで、英語は固有名詞・技術用語に留めるか、完全な英語ローカライズ版を別途作成。
- **サイトとブログの二層構造**:
  - **tangle-tech-page**: 製品紹介・価値提案・信頼要素・CTA
  - **SlingStone-blog**: 設計思想、現場の失敗、技術深掘り、倫理/プライバシー考察

---

## 2. 改善フェーズ

### Phase 1: 信頼破壊要素の緊急修正（1〜2 週間）

目的: 法人サイトとして致命的な要素を即座に取り除く。

| # | タスク | 対象ファイル | 内容 |
|---|--------|--------------|------|
| 1.1 | 連絡先の法人化 | `src/config.ts:21` | `4beshinji@gmail.com` → `hello@tangle-tech.com` など会社ドメインのメール。取り急ぎ forward 設定が必要。 |
| 1.2 | サービスステータスの具体化 | `src/data/services/*.ts` | `β / Field trial` などのラベルに、開始時期、試行場所、提携先を追加。例: `β / Field trial since 2024 in Gunma` |
| 1.3 | ナビゲーション言語の統一 | `src/data/navigation.ts` | Practice / Works / About / Contact を日本語主体に。例: `活動 / サービス / 概要 / 連絡先` |
| 1.4 | タグラインの具体化 | `src/data/services/*.ts` | 「最大のリターン」「賃貸投資感覚」「寄り添う AI」などを、解決する課題と成果に置き換え。 |
| 1.5 | 英語表現の一次監査 | `src/pages/index.astro`、各コンポーネント | 断片的な英語ラベルを日本語にするか、完全な英語フレーズに修正。 |

### Phase 2: コンテンツ・アーキテクチャ設計（2〜4 週間）

目的: サイト側とブログ側の役割を明確にし、相互導線と記事バックログを設計する。

#### 2.1 サイト vs ブログの切り分け

| 掲載先 | 担当内容 |
|--------|----------|
| **tangle-tech-page** | 製品名・タグライン・ワンピッチ・ハイライト 3 つ・ユースケース・技術スタック・ステータス・実績・CTA |
| **SlingStone-blog** | なぜ作ったか / 現場で何が起きたか / 技術選定の理由 / コスト・ROI / プライバシー・倫理 / 採用しなかった設計案 |

#### 2.2 各サービスとブログ記事の紐付け

| tangle-tech サービス | ブログ記事テーマ（優先） |
|----------------------|--------------------------|
| Office as AI Toybox | オフィスを自律運転したら、人間がアクチュエーターになった話 |
| Auto Aqua | エビ水槽に YOLOv11 を入れたら、養殖がゲームになった |
| Auto Bee | 蜜蜂は GPS より先に気づく：蜜源 GIS と分蜂リスク |
| Auto JA | 水耕・養蜂・養殖を同じ画面に置く狂気 |
| HEMS | 家にアバターを常駐させたら、プライバシーが逆に守られた |
| NUAI | VRChat 会社のための、監査つき HR システム設計 |

#### 2.3 ブログ記事バックログ（優先 10 本）

1. オフィスを自律運転したら、人間がアクチュエーターになった話
2. エビ水槽に YOLOv11 を入れたら、養殖がゲームになった
3. 蜜蜂は GPS より先に気づく：蜜源 GIS と分蜂リスク
4. 水耕・養蜂・養殖を同じ画面に置く狂気
5. 家にアバターを常駐させたら、プライバシーが逆に守られた
6. VRChat 会社のための、監査つき HR システム設計
7. 合成データで攻撃したら、匿名化の限界が見えた
8. ESP32 Swarm を「枯れ葉」と「生枝」で運用する
9. ローカル LLM を現場に置くという選択：コスト、品質、主権
10. 画像認識で人を追いかけたら、プライバシー設計が 9 割になった

#### 2.4 相互導線設計

- **tangle-tech-page 側**:
  - `Header.astro` または `Footer.astro` に `Log` / `SlingStoneLOG` / `Engineering Log` を追加。
  - 各サービスページの `highlights` 下部に「この機能の開発ログを読む →」を配置。
- **SlingStone-blog 側**:
  - 記事の冒頭または末尾に `関連プロダクト: [Office as AI Toybox](https://tangle-tech.com/services/office-toybox/)` を追加。
  - `Header.astro` に `Tangle Tech` へのリンクを追加。
- **URL**: ブログは独立ドメインのため絶対 URL `https://slingstonelog.pages.dev/posts/<slug>/` を使用。

### Phase 3: ビジュアル言語の再設計（4〜8 週間）

目的: 「AI くさい」パターンを排除し、grapth の知見と英語圏信頼設計を反映する。

#### 3.1 排除すべき AI テンプレートパターン

- 中央寄せヒーロー + 大げさな英語キャッチ
- グラデーション背景・ボタン・pill バッジ
- `rounded-2xl` カードグリッド
- 浮遊する脳・ロボット・スパークルアイコン
- 抽象 3D 神経ネットワーク・幾何学模様
- Sense / Decide / Act 風の 3 列マニフェスト
- 点滅カーソル・過剰なロード時アニメーション
- 紫色・オレンジ系の「AI デフォルト」カラー

#### 3.2 推奨ビジュアル方向性

- **カラー**: 現行のダーク・ウォーム地面 `#2a2622` + オフホワイト `#ede9dd` は維持。アクセント `#ff6a48` は控えめに。OKLCH/Radix Colors で再定義を検討。
- **タイポグラフィ**: 欧文は Space Grotesk / IBM Plex Mono、日本語は IBM Plex Sans JP / BIZ UD ゴシックを優先。フォント読み込みは 4 種から 2〜3 種に削減。
- **レイアウト**: 12 カラム非対称グリッド + モノスペース索引は維持。ただし情報密度を下げ、余白を増やす。
- **信頼要素の視覚化**:
  - 顧客ロゴウォール（仮名可、業界別グループ化）
  - 数値ハイライト（「群馬県内 X  hive の試行」「水質異常検出 Y 件」）
  - セキュリティ/プライバシーバッジ
  - チーム/About 写真

#### 3.3 コピー書き換えガイドライン

| 避ける表現 | 推奨する表現 |
|------------|--------------|
| AI-powered | model-assisted / runs on-device models / uses local LLMs |
| Seamless integration | connects sensors, documents, and market data in one view |
| Cutting-edge AI | on-site computer vision and local language models |
| Revolutionize | replace multi-expert handoffs with one operational layer |
| Unlock the power of data | turn sensor readings and field notes into decisions |
| Next-generation autonomous systems | self-monitoring systems that keep humans in the loop |
| Disruptive | practical automation for operations teams |
| End-to-end optimization | from field sensing to harvest timing in one dashboard |
| Intelligent | rule-checked / context-aware |
| Streamline | cut manual coordination / reduce back-and-forth |
| Scalable | add sites without re-architecting |
| Empower | give operators clear next steps |
| Unprecedented | first to combine local LLM with multi-camera tracking on edge GPUs |
| Transform your business | reduce overhead in X and Y |
| Future-proof | built to add new domains via plugins |

### Phase 4: 英語圏対応と法的・信頼ページ整備（並行して 4〜8 週間）

目的: 日本語版を完成させた上で、英語圏 B2B 購買者が信頼できる情報設計にする。

| # | タスク | 内容 |
|---|--------|------|
| 4.1 | Privacy Policy 作成 | データ収集、ローカル処理、クラウド連携、GDPR 対応 |
| 4.2 | Terms of Service 作成 | サービス範囲、免責、知的財産 |
| 4.3 | Security ページ | ローカル LLM、エッジ処理、データ主権、SOC 2 / ISO 27001 への準拠計画 |
| 4.4 | About / Team ページ | 創業者経歴、チーム専門性、群馬大学「投石学部」活動との関係 |
| 4.5 | 英語版ローカライズ | 完全な英語版を別途構築（i18n ではなく、日本語版の英語再構成） |
| 4.6 | CTA 強化 | メールのみ → 「Book a 30-min discovery call」「Request a pilot proposal」 + Calendly |

### Phase 5: 検証・計測・運用化（継続）

| # | タスク | 指標 |
|---|--------|------|
| 5.1 | Lighthouse / CWV | LCP < 2.5s、CLS < 0.1、INP < 200ms |
| 5.2 | アクセシビリティ | axe-core / WAVE で主要ページをチェック |
| 5.3 | コピーテスト | 英語圏ネイティブや B2B マーケターにレビュー依頼 |
| 5.4 | ヒートマップ / 行動分析 | 導線クリック率、ブログからの流入、CTA コンバージョン |
| 5.5 | デザインシステム化 | コンポーネント、トークン、パターンを文書化し、今後の追加サービスに再利用 |

---

## 3. 即座に着手すべき最小限のタスク（Next Actions）

1. **連絡先の法人化**: `src/config.ts` の `email` を変更し、メール forward を設定。
2. **SOMS 記事の本公開化**: `../SlingStone-blog/src/data/blog/SOMS/AI_chang.md` を整理し、`Office as AI Toybox` ページと双方向リンク。
3. **ナビの日本語化**: `src/data/navigation.ts` を日本語主体に書き換え。
4. **サービスタグラインの一次書き換え**: `src/data/services/*.ts` の `tagline` を、解決する課題 + 成果の形に変更。
5. **Header/Footer にブログ導線追加**: `Log` または `Engineering Log` リンクを追加。
6. **「AI くさい」表現禁止リストの運用開始**: コピー作成時に本ロードマップの表を参照。

---

## 4. リスクと注意点

- **過剰な英語化のリスク**: 日本語母語ユーザーにとって英語ラベルは負荷。日本語版では日本語を主体とし、英語は技術用語・固有名詞に留める。
- **虚偽の社会的証明**: 顧客ロゴや数値は、ないものを掲載すると信頼を完全に失う。仮名可、小規模な実績から始める。
- **ブログトーンの不一致**: SlingStone-blog はカジュアル・毒舌。Tangle Tech 側のクールなトーンと衝突しないよう、CTA 文言や紹介文を調整。
- **スコープクリープ**: グラフィックの全面リニューアルより、コピー・信頼要素・ブログ接続を先に完成させる。

---

## 5. 参考リソース

### 英語圏調査情報源
- [SaaS Hero – Landing Page Trust Signals](https://www.saashero.net/design/landing-page-design-trust-signals/)
- [Proofmap – B2B Case Studies 2025](https://proofmap.com/insights/b2b-case-studies-examples-from-the-top-58-growing-saas-companies-in-2025)
- [Steel Croissant – 2024 B2B Buyer Trends](https://www.steelcroissant.com/blog/2024-b2b-buyer-trends-bold-predictions-for-2025)
- [SMEStreet – Overused Startup Buzzwords 2025](https://smestreet.in/sectors/overused-startup-buzzwords-2025-expert-warns-these-clich%C3%A9s-are-hurting-new-brands-10886677)
- [Intent Amplify – B2B Copywriting in 2025](https://intentamplify.com/blog/b2b-copywriting-in-2025-writing-for-todays-busy-buyers/)
- [Toimi – Best SaaS Website Designs 2026](https://toimi.pro/blog/best-saas-website-designs/)

### 社内知識源
- `../grapth/research/frontend_knowledge_dim13.md` — AI 感の少ないデザイン資産集
- `../grapth/research/frontend_knowledge_dim13_application.md` — 適用ガイド
- `../grapth/sections/frontend_knowledge_graph_sec00.md` — エグゼクティブサマリー
- `../SlingStone-blog/WRITING_GUIDE.md` — ブログ記事ルール
- `../SlingStone-blog/src/data/blog/SOMS/AI_chang.md` — Office as AI Toybox の深掘り記事

---

*最終更新: 2026-07-03*  
*次回レビュー: Phase 1 完了時*
