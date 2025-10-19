# MASA Org JP GitHub Pages

このリポジトリは MASA Org JP の公開ページを Vite + React + Tailwind CSS で構築しています。開発と GitHub Pages へのデプロイは npm スクリプトで管理されています。

## プロジェクト構成

```text
masa-org-jp.github.io/
├── public/              # 静的アセット（favicon など）
├── src/                 # メインエントリと共通コンポーネント
│   ├── App.tsx          # トップページのルート
│   ├── ItemList.tsx     # アイテム一覧ページの UI ロジック
│   ├── index.css        # Tailwind CSS エントリーポイント
│   └── main.tsx         # Vite のエントリーファイル
├── itemlist/            # `https://…/itemlist` 用の追加エントリーポイント
│   ├── index.html       # サブエントリ用 HTML
│   └── main.tsx         # アイテム一覧をマウントするブートストラップコード
├── dist/                # `npm run build` 後の出力（デプロイ対象）
├── tailwind.config.js   # Tailwind CSS の設定
├── vite.config.ts       # Vite とマルチエントリーレイアウト設定
└── package.json         # npm スクリプトと依存関係の定義
```

## 事前準備

- Node.js 18 以上を利用してください。
- 依存関係は初回のみ `npm install` でインストールします。

## ローカル開発

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開くと、トップページと `itemlist/` ルートを確認できます。

## ビルド

```bash
npm run build
```

`dist/` に GitHub Pages に配置する静的ファイルが出力されます。

## デプロイ

```bash
npm run deploy
```

`deploy` スクリプトは以下の手順を自動化しています。

- `predeploy` で `npm run build` を実行し最新の成果物を生成
- `gh-pages -d dist -t` で `dist/` を `gh-pages` ブランチに公開

### `-t` オプションを付けている理由

`gh-pages` コマンドの `-t` (`--dotfiles`) はドットファイルをコミット対象に含めます。GitHub Pages ではルートに配置した `.nojekyll` や `.well-known/` 配下などのドットファイルが必要な場合があり、これらが除外されると配信が失敗します。そのため、確実に必要なドットファイルをアップロードするために `-t` を明示的に指定しています。
