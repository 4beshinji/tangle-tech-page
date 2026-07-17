# tangle-tech.com

Tangle Tech のコーポレート / 研究実装サイト。Astro 5 + Tailwind CSS 4 の静的サイトを Cloudflare Workers Static Assets で配信する。

## ブランドの定位

Tangle Tech は、農場や都市のように対象が薄く広く分散する環境へ、小さな知能を配置して空間そのものを知能化する。

中核システムは次の2系統。

- **Auto JA**: ほ場、作物、センサー、アクチュエータ、市場、農作業イベントを扱う。植物群落モデルと温室シミュレーションを制御の起点にする。
- **farm-ops**: HR、雇用、権限、同意、タスク割当、承認、労務、監査を扱う。Auto JA とイベント・APIで接続する。

Auto Aqua、Auto Bee、SOMS、HEMS、auto_cell は、共通する知覚・制御・監査アーキテクチャを異なる領域で検証する技術デモとして掲載する。

サイト上の実装状況は、実リポジトリを一次情報として「研究実装」「ベンチ実装」「現地検証待ち」「連携設計」に分ける。未完了の現地実証を運用実績として表現しない。

## デザインシステム

テーマは **Distributed Ecology**。研究機関の精度感と、生態系・分散制御の有機性を同居させる。

- 背景: deep green `#071813`
- 本文: mineral white `#f1f5e9`
- 主アクセント: chlorophyll `#b8f15c`
- 補助色: sensor cyan `#75d7c2`
- 見出し: Manrope + Noto Sans JP
- 本文: Noto Sans JP
- 技術ラベル: IBM Plex Mono
- 角丸カード、紫系グラデーション、抽象AI画像は使用しない
- 分散ノード、空間グリッド、状態表示を情報図として使う

デザイントークンと共通モーションは `src/styles/global.css`。ヒーローの分散配置図は編集可能なコードネイティブSVGとして `src/components/DistributedField.astro` に置く。

## コンテンツの正本

| 内容                | ファイル                          |
| ------------------- | --------------------------------- |
| 会社情報・SEO       | `src/config.ts`                   |
| ナビゲーション      | `src/data/navigation.ts`          |
| システム / 技術デモ | `src/data/services/*.ts`          |
| トップページ        | `src/pages/index.astro`           |
| 詳細ページ共通      | `src/pages/services/[slug].astro` |
| OG画像の正本        | `public/og-source.svg`            |

技術内容を更新するときは、兄弟リポジトリの README、ADR、マイルストーンを確認する。特に Auto JA と farm-ops の成熟度・責務境界を混同しない。

## ローカル開発

```bash
pnpm install
pnpm dev
pnpm build
pnpm format
```

`pnpm build` は `astro check` と静的ビルドを実行する。

## デプロイ

```bash
pnpm build
pnpm dlx wrangler deploy
```

設定は `wrangler.jsonc` と `astro.config.ts` を参照。
