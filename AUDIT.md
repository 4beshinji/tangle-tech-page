# AUDIT — 2026-05-16

> Source: `/home/sin/code/claude/jisei-roku/codebase-patterns-and-gaps.md`

## 状況サマリ
- 初コミット: 2026-04-25 / 最終: 2026-05-01
- 直近30日 commit: 15 (中活動)
- CI: ❌ / Tests: ❌
- CLAUDE.md: ❌
- 法人サイト tangle-tech.com (架想ブランド)

## 状態判断: 架想ブランドの法人サイト、positioning 明確化が先
「Tangle Tech」は確立した企業ではなく **aspirational brand**。サイト技術より、**そもそも本ブランドを実体化するか** ([[career-decision-context]] の E ルート) の判断が先行する。

## プロジェクト固有の問題
1. **CLAUDE.md が無い** — 目的、ターゲット、ブランドメッセージ、デプロイ先が未記録
2. **CI なし、tests なし** — 法人サイトとして公開する前提なら最低限のリンクチェック / a11y は欲しい
3. **正体不明のブランド** — README にも「これは架想ブランド」「実体化未確定」が書かれているか要確認。**もし対外に既に公開済みなら誤解を生む** (実在企業に見える)
4. **登記/契約の前提が無い** — ブランド名のまま商用受注は商標問題のリスク

## 戦略レイヤの問題 (技術ではない)
1. **founding option (career E) を選ぶ場合**、本ブランドを商号として登記するか、別名で行くかの決定
2. **就活 (career B) を選ぶ場合**、本ブランドの公開状態を整理 (個人開発であることを明記する)
3. **business-ops との関係** — business-ops の brand は **NUAI** であり Tangle Tech ではない。両ブランドの関係性 (Tangle Tech = 親、NUAI = プロダクト名 の階層?) を明確化

## 推奨対応 (ROI 順)
1. ⚠️ **CLAUDE.md 作成** — 目的、ブランドの実体化状況、business-ops との関係
2. **README にブランドの実態を明記** — 既に対外公開済なら最優先で「個人開発の架想ブランド」を脚注に
3. **リンクチェック CI** — 公開サイトとしての最低限
4. ブランド戦略の意思決定 — [[career-decision-context]] の選択肢と合わせて判断

## 検証情報 (2026-05-16)
- CLAUDE.md: 不在
- Tests / CI: 不在

## メモ
本プロジェクトは **技術的 audit よりも戦略的 audit が必要**。pose-work で 830+ tests を書ける人物が、対外公開する legal な法人サイトを CLAUDE.md 無しで放置している状況は、**「これは本気の事業実体ではない」signal を本人が無意識に出している**とも読める。
