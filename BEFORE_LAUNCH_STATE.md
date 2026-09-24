# 修正前の状態 — 2026-09-24

VideoClip は **2026-09-15 に App Store で公開済み**（公開ストアの `releaseDate` で実測）。
このページは公開から9日間、未公開のままだった。その記録。

## 何が書いてあったか

| 箇所 | 修正前 |
|---|---|
| `hero.eyebrow` (ja) | 「iOS App · 審査中 · 数日以内に配信」 |
| `hero.eyebrow` (en) | "iOS App · Launching this spring" |
| `hero.eyebrow` (ko) | 「iOS App · 곧 출시」 |
| `hero.eyebrow` (zh) | 「iOS App · 即將上架」 |
| `hero.eyebrow` (es) | "iOS App · Próximamente" |
| `hero.cta_primary` / `nav.cta` / `cta.button` (ja) | 「リリース通知を受け取る」 |
| `hero.meta` (ja) | 「広告なし · 追跡なし · 配信日にメール1通だけ」 |
| `cta.sub` (ja) | 「メールは配信日に1通だけ。配信以外には使いません。」 |

## リンクはどうなっていたか

`_includes/home.html` の CTA ボタン:

```html
<a href="mailto:alaofficial.jp@gmail.com?subject=VideoClip%20Launch%20Notify" class="btn btn-primary">
```

ヘッダーとフッターの導線は `#download` へのアンカーで、その `#download` セクションの
ボタンが上の mailto だった。

**ページ全体のリンク30本を列挙して確認した結果、App Store へのリンクは1本も無かった。**
（言語切替・プライバシーポリシー・EULA・mailto のみ）

## 影響

App Store 掲載の「マーケティングURL」がこのページ。
**来た人はアプリを入手できず、「もうすぐ出ます」と案内されていた。**
ストア側の「開発元Webサイト」(`sellerUrl`) は未設定のままなので、
掲載側からこのページへ来る経路は限られるが、X などから送れば必ずここに着く。

## 直していないもの

- ストアページが「言語: 英語」と表示する件（アプリのビルドに `CFBundleLocalizations`
  が無いため。ビルドと提出が要る。このリポジトリでは直せない）
- `sellerUrl` の設定（App Store Connect 側。オーナーの手番）

---

# 修正後 — 2026-09-24

## 何を何に変えたか

App Store の URL は `_config.yml` に1か所だけ置いた:

```yaml
app_store_url: https://apps.apple.com/app/id6758618610
```

**国コードを入れていない。** Apple が閲覧者のストアに振り分ける
（実測: 301 → `/us/` に飛び、追跡後 200。日本からは `/jp/` に行く）。
5言語のページが1つの URL を共有できる。

### リンク（3本）

| 場所 | 修正前 | 修正後 |
|---|---|---|
| ヘッダーの CTA (`_layouts/default.html`) | `#download` へのアンカー | `{{ site.app_store_url }}` |
| ヒーローの主 CTA (`_includes/home.html`) | `#download` へのアンカー | `{{ site.app_store_url }}` |
| `#download` セクションのボタン (`_includes/home.html`) | **mailto:** | `{{ site.app_store_url }}` |

フッターの「Download」は `#download` アンカーのまま。飛んだ先のボタンが
App Store に変わったので、経路としては通る。

### 文言（5言語 × 6箇所 = 30件）

| キー | ja |
|---|---|
| `nav.cta` | 「App Store で入手」 |
| `hero.eyebrow` | 「iOS App · App Store で配信中」 |
| `hero.cta_primary` | 「App Store で入手」 |
| `hero.meta` | 「無料 · 広告なし · 追跡なし」 |
| `cta.sub` | 「無料でダウンロードできます。Premium は必要になってから選べば大丈夫。」 |
| `cta.button` | 「App Store で入手」 |

en / ko / zh / es も同じ6キーを同じ意味で差し替えた。
`hero.eyebrow` は言語ごとに未公開を示す表現が違っていた
（"Launching this spring" / 「곧 출시」/「即將上架」/ "Próximamente"）ので、全部に手を入れた。

## 検証

- 5言語の YAML と `_config.yml` が構文として読めることを確認
- 未公開を示唆する文言が残っていないことを全文検索で確認
  （残ったのは韓国語の「알림도 …」＝「通知も無い」で、宣言文の一部。別物）
- App Store の URL が 200 で開くことを確認

⚠ **ローカルでのビルド検証はしていない。** この端末に Jekyll が入っていない。
変更は文字列表と `href` 3本なので危険は小さいが、**実際の見た目は未確認。**

## やっていないこと

- **push・公開・デプロイ**。GitHub Pages に出るのはオーナーが push したとき
- デザインの変更、レイアウトの作り直し、Apple 公式バッジ画像の使用
  （バッジは Apple の配布物を取ってくる必要があり、商標の扱いも伴うので手を出していない。
  いまはテキストのボタン）
- `mailto:` そのものはフッターの問い合わせ先として残してある。消したのは CTA の1本だけ
