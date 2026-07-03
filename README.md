# tangle-tech.com

Tangle Tech のコーポレート / サービス紹介サイト。
Astro 5 + Tailwind 4 の静的サイトを **Cloudflare Workers (Static Assets)** で配信。

> **このドキュメントは引き継ぎ書を兼ねます。**
> デザインの思想と禁則・データモデル・メディア追加手順・デプロイ手順を一通りまとめてあります。
> 触る前に「デザインシステム」「永久禁止 (Anti-patterns)」節は最低限読んでください。

---

## 現状 (2026-04-26)

- 6 サービスのデザイン実装完了 (`auto-bee` / `auto-ja` / `auto-aqua` / `hems` / `nuai` / `office-toybox`)
- コピー文一巡 (index / config / services を 2026-04-26 に改稿)
- ビルド通過 (`astro check` 0 errors / 9 ページ)、ローカル `pnpm dev` 動作確認済み
- 動画再生確認済み (auto-aqua の YOLOv11 検出デモ動画 1 本配置)
- **未デプロイ** (Cloudflare Workers への `wrangler deploy` 未実行)
- **DNS 未統合** (お名前.com 取得済 / Cloudflare 側未設定)

---

## 技術スタック

| 役割                 | 採用                                                |
| -------------------- | --------------------------------------------------- |
| フレームワーク       | Astro 5 (`output: "static"`、SSR なし)              |
| 型                   | TypeScript strict                                   |
| CSS                  | Tailwind 4 (`@theme` ベースの CSS-first)            |
| パッケージマネージャ | pnpm 10.11.1                                        |
| ランタイム           | Node.js 22+                                         |
| ホスト               | Cloudflare Workers Static Assets (`wrangler.jsonc`) |
| ドメイン             | tangle-tech.com (お名前.com 取得)                   |

---

## デザインシステム

### 美学

**Computational Editorial** — 現代グロテスク + モノスペース索引 + 抑制色 + 巨大タイポ。装飾ゼロ、構造で語る。
リファレンスは [blockstudio.tw](https://blockstudio.tw/) / [iro-inc.jp](https://iro-inc.jp/) / [alpha.plaid.co.jp](https://alpha.plaid.co.jp/) / [creativewebmanual.com](https://www.creativewebmanual.com/) 系。

### タイポグラフィ

| 用途               | フォント                           | クラス                              |
| ------------------ | ---------------------------------- | ----------------------------------- |
| 見出し (display)   | Hubot Sans Variable / wght 800-900 | `.display`                          |
| 本文 (JP/EN)       | IBM Plex Sans JP                   | デフォルト body                     |
| Mono ラベル / 索引 | JetBrains Mono                     | `.mono` `.mono-sm`                  |
| Editorial italic   | Instrument Serif Italic            | `.serif-italic` (1ページ1〜2回まで) |

`.display` には `text-wrap: balance` が効いており、大見出しは自動で均等な行幅に折れます。手で `<br>` を入れる前にこの挙動を確認してください。

### 色 (単一アクセント方式)

```
--color-paper:     #2a2622   dark warm ground
--color-ink:       #ede9dd   warm off-white (text + light band ground)
--color-ink-mid:   #a09c91   muted text
--color-ink-faint: #615d56   labels, faint marks
--color-rule:      ink @ 16% hairlines
--color-rule-strong: ink @ 40% stronger hairlines
--color-accent:    #ff6a48   electric vermillion
```

**運用ルール:**

- グラデ禁止、面塗り (アクセント色) 禁止
- アクセントは 1 ページ最大 5 回まで (下線・ホバー・カレント・§・1 単語強調)
- 現在はダークテーマをデフォルトとし、`prefers-color-scheme` による自動切替は未対応

### 構造シグネチャ — Discipline Lattice

すべてのサービス見出し直下に常設の専用ライン。装飾ではなく**情報構造** (= このサービスが束ねる分野数) を一目で示す Tangle Tech の意匠的署名。

```
001   AUTO BEE   ──   AGR · BIO · IOT · CV · ML · LLM · GIS · ECON
```

略号は仮置き、用語表は今後整理予定 (TODO 参照)。

### モーション

- ロード: clip-path stagger reveal — `.lift` クラス + `.delay-1` 〜 `.delay-6`
- ホバー: サービス行で hairline accent が左→右に伸びる + テキスト 8px シフト
- すべて CSS only。JS ライブラリなし

### 永久禁止 (Anti-patterns)

過去の検討で却下、再導入禁止:

- 中央寄せヒーロー
- グラデ背景・ボタン・pill バッジ
- dotted accent (小さい丸い点)
- `rounded-2xl` のカード grid (Tailwind Dashboard クリシェ)
- 中央 CTA 箱
- Sense / Decide / Act 風の 3 列ベント
- Mincho 系フォント (一度試したが本コンセプトと無関係と判断、破棄)

---

## コンテンツ編集

### 場所

| 場所                              | 中身                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `src/config.ts`                   | 会社名・タグライン・mission・連絡先                                                                                 |
| `src/data/services.ts`            | **6 サービスの全文言** (name / tagline / pitch / disciplines / highlights / stack / useCases / statusLabel / media) |
| `src/pages/index.astro`           | トップ静的文言 — ヒーロー / Practice (3 信条 inline 配列) / Works イントロ / About / Contact                        |
| `src/pages/services/[slug].astro` | 詳細ページの共通ラベル (A/B/C... 索引、CTA)                                                                         |
| `src/pages/gallery/[slug].astro`  | ギャラリー専用ページ (動的、`gallery.length > 4` のサービスのみ生成)                                                |
| `src/components/Header.astro`     | グローバルナビ (`Practice` / `Works` / `About` / `Contact` + 索引 `01-04`)                                          |
| `src/components/Footer.astro`     | フッター・build スタンプ                                                                                            |
| `src/styles/global.css`           | 配色トークン・フォント・ユーティリティクラス                                                                        |

### 改行制御 (日本語向け)

- 強制改行: `<br />`
- ヒーロー大見出しは `<span class="block">…</span>` で 1 行ずつ区切り、`.lift` アニメーションを当てている (`src/pages/index.astro` の `<h1>` 内)
- 改行禁止: `word-break: keep-all`
- 自動バランス: 大見出しは `.display` に `text-wrap: balance` 既に適用済み

---

## メディア追加

### 画像 (Astro 最適化対象)

1. `src/assets/services/<slug>/` に `.jpg/.png/.webp` を配置
2. `src/data/services.ts` 上部で import:
   ```ts
   import autoBeeHero from "@/assets/services/auto-bee/hero.jpg";
   ```
3. 該当 service の `media` フィールドに渡す:
   ```ts
   media: {
     hero: { src: autoBeeHero, alt: "...", caption: "...", context: "..." },
     gallery: [
       { src: autoBeeShot1, alt: "...", caption: "..." },
       // ...
     ],
   }
   ```

### 動画 (静的配信)

動画は `public/videos/services/<slug>/` に直接配置 (Astro は動画を最適化しないため `src/assets/` ではなく `public/`)。

#### 1. 再エンコード (Safari 互換 + faststart)

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -pix_fmt yuv420p -preset slow -crf 24 \
  -movflags +faststart -an \
  public/videos/services/<slug>/<name>.mp4
```

既に H.264 圧縮済みなら、コンテナ書き直しのみで faststart 化:

```bash
ffmpeg -i input.mp4 -c copy -movflags +faststart -an \
  public/videos/services/<slug>/<name>.mp4
```

#### 2. ポスター画像抽出 (中央付近のフレーム)

```bash
ffmpeg -ss <SECONDS> -i input.mp4 -frames:v 1 -q:v 3 \
  public/videos/services/<slug>/<name>-poster.jpg
```

#### 3. データに追加

```ts
gallery: [
  {
    kind: "video",
    src: "/videos/services/auto-aqua/foo.mp4",
    poster: "/videos/services/auto-aqua/foo-poster.jpg",
    alt: "アクセシビリティ用説明",
    caption: "FIG. キャプション ─ 撮影日付 / コンテキスト",
    loop: true,
    autoplay: true,
    controls: false,
  },
],
```

### ギャラリー描画ルール

- `gallery.length === 0`: メディアセクションは丸ごと非表示
- `gallery.length <= 4`: 詳細ページの ink 帯セクション内に全枚数表示
- `gallery.length > 4`: 詳細ページに 4 枚インライン + `View all N plates →` リンク → `/gallery/<slug>/` 自動生成、全枚数を ink 全面で展示

### 25 MB / asset 制限について

Cloudflare Workers Static Assets は **1 ファイル 25 MB 上限**。

- 現状 auto-aqua 動画 8.8 MB → 余裕
- 総量が 50 MB を超えてきたら R2 / Cloudflare Stream へ動画だけ移行検討

---

## ローカル開発

```bash
pnpm install        # 初回
pnpm dev            # http://localhost:4321
pnpm build          # astro check + astro build → ./dist
pnpm preview        # ビルド成果物をローカル確認
pnpm format         # prettier 整形
pnpm format:check   # 整形チェック
```

---

## デプロイ (Cloudflare Workers)

### 初回セットアップ

```bash
pnpm dlx wrangler login   # ブラウザで Cloudflare 認証
```

### デプロイ

```bash
pnpm build
pnpm dlx wrangler deploy
```

成功後の URL: `https://tangle-tech-page.<account>.workers.dev/`

### お名前.com → Cloudflare ドメイン移行手順

1. Cloudflare Dashboard → "Add a site" → `tangle-tech.com` 入力 → Free プラン
2. 表示される 2 つの CF ネームサーバー (例: `xxx.ns.cloudflare.com`) をメモ
3. お名前.com Navi → ドメイン機能一覧 → ネームサーバー変更 → CF のものに置換
4. 反映待ち (数分 〜 最大 24h)。確認: `dig NS tangle-tech.com`
5. CF Dashboard → Workers & Pages → `tangle-tech-page` → Settings → Triggers
6. **Add Custom Domain** → `tangle-tech.com` と `www.tangle-tech.com` を追加
   (CF が proxied DNS + SSL を自動発行)
7. **Always Use HTTPS** / **Automatic HTTPS Rewrites** を有効化推奨

---

## ファイル構成

```
.
├── src/
│   ├── assets/services/<slug>/     # 画像 (Astro 最適化対象)
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── data/services.ts            # 6 サービスの全データ + 型
│   ├── layouts/Base.astro          # フォント・OG・縦書き索引
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services/[slug].astro   # 動的・6 ページ生成
│   │   └── gallery/[slug].astro    # 動的・gallery > 4 のときのみ
│   ├── styles/global.css           # @theme トークン + ユーティリティ
│   └── config.ts                   # サイト・会社情報
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── videos/services/<slug>/     # 動画 + ポスター (Astro 非最適化)
├── astro.config.ts
├── tsconfig.json
├── wrangler.jsonc                  # Cloudflare Workers 配信設定
├── .prettierrc.mjs
├── package.json
└── pnpm-lock.yaml
```

---

## 開発上の注意

- `getStaticPaths` は frontmatter のトップレベル定数を参照できない (Astro が関数をホイストする)。閾値などは関数内で再定義
- Tailwind 4 の `@theme` は CSS-first。クラス名は `bg-(--color-paper)` のように **`(変数名)` 構文** で参照
- ダークモード変数は `@media (prefers-color-scheme: dark) { @theme { ... } }` で上書き
- 動画は `public/` 直下のみ。`src/assets/` に置くと Astro が最適化を試みて失敗する
- ヒーローのアニメーションは `.lift` + `.delay-N` で個別に遅延制御。順序を変える場合は `.delay-N` も合わせる

---

## 残タスク

### 高優先

- [x] コピー文の一巡編集 (2026-04-26 — index.astro / config.ts / services.ts)
- [ ] **ビジュアル素材投入** — 各サービスの hero / gallery 画像・動画 (現状 auto-aqua の 1 本のみ)
- [ ] `wrangler deploy` で本番公開
- [ ] お名前.com → Cloudflare DNS 移行 → Custom Domain 紐付け

### 中優先

- [ ] OG 画像 (`public/og.png`) の用意 — 現状参照のみで未配置
- [ ] Discipline 略号の用語表 — `/about` セクションへの追記か、別ページとして用意するか検討
- [ ] CI (GitHub Actions) で `pnpm build` 検証 (デプロイは手動運用が前提)

### 検討事項

- 動画増加時の R2 / Cloudflare Stream 移行戦略
- 多言語対応 (英語版需要があるか)
- `/case-studies` (実証事例) ページの追加要否

---

## 引き継ぎチェックリスト

新しい開発者がこのリポジトリを引き取る際:

1. このドキュメントを通読 (特に「永久禁止」「Discipline Lattice」「メディア追加」)
2. `pnpm install && pnpm dev` で起動確認
3. `src/data/services.ts` の `Service` 型と既存 6 サービスのエントリを確認
4. `src/styles/global.css` の `@theme` トークンを確認
5. Cloudflare アカウント (デプロイ権限) の引き継ぎ
6. お名前.com アカウント (DNS 切替権限) の引き継ぎ
