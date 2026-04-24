# VideoClip Landing Site

VideoClip アプリのマーケティング用ランディングページ & サポートサイト。
GitHub Pages (Jekyll) でホスティング。

## 構成

- `index.html` — トップページ (ランディング)
- `support/index.md` — サポート / FAQ
- `_layouts/default.html` — 共通レイアウト
- `assets/css/style.css` — スタイル (ダーク/ライト両対応)
- `assets/images/` — スクリーンショット

## ローカル確認

```bash
bundle install
bundle exec jekyll serve
```

http://localhost:4000/videoclip-landing/ で確認。

## デプロイ

GitHub に `videoclip-landing` という名前で public リポジトリを作成し push。
Settings → Pages で `main` ブランチの root を指定すれば自動公開されます。

公開 URL: `https://dragon-jp.github.io/videoclip-landing/`

## デザイン方針

- ミニマル・タイポグラフィ重視
- 白黒＋アンバーアクセント
- 「動画を集めるのではなく、あとで考えるために残す」を中心メッセージ
- 通知・おすすめ・広告なしの姿勢を価値として提示
