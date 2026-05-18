# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

myfret は ufret.jp のコード譜をブラウザ向けに再描画する自作 Web アプリ。フロント (Vite + React 19 + TypeScript + MUI) と バックエンド (Express + cheerio/Playwright スクレイパー) の 2 プロジェクトを 1 リポジトリに同居させている。フロントは `http://localhost:5173`、バックエンドは `http://localhost:3001` で動かす前提で、フロントは `VITE_API_BASE_URL` (`.env`) を介してバックエンドに到達する。

## よく使うコマンド

パッケージマネージャは **pnpm** を使う (ユーザー指定)。

フロントエンド (リポジトリルート):

```sh
pnpm dev          # Vite 開発サーバー
pnpm build        # tsc -b && vite build
pnpm lint         # eslint .
pnpm test         # vitest (tests/**/*.test.ts のみ対象)
pnpm test -- tests/unit/types/chord.transposeChord.test.ts  # 単一ファイル
pnpm test -- -t "テスト名"                                  # 名前で絞る
pnpm preview      # ビルド成果物のプレビュー
```

バックエンド (`backend/`):

```sh
cd backend && pnpm dev   # nodemon server.js
```

注意:
- Vitest の対象は `tests/**/*.test.ts` のみ (`vitest.configs.ts` で `include` を絞っている)。`src/` 配下にテストを置いても拾われない。
- フロントから API を叩くには **バックエンドを別途起動しておく** 必要がある (`README.md` の通り 2 ターミナル運用)。
- バックエンドの `/api/song` は Playwright (Chromium) を使うので、初回は `pnpm exec playwright install chromium` が必要になることがある。

## アーキテクチャ

### フロントエンド (`src/`)

エントリは `src/main.tsx` → `src/app/index.tsx` → `ThemedApp` → `AppRouter`。

- `app/AppRouter.tsx` がすべてのルートを宣言。`utils/routeElement.tsx` を介して画面を `LayoutWithHeader` で包む (第2引数 `noHeader=true` でヘッダ無し。`/test` と `*` のみ)。
- `api/` は薄い axios ラッパ。`api/client.ts` の `apiClient.get<T>()` が `import.meta.env.VITE_API_BASE_URL` を前置してバックエンドへ。各エンドポイントは `api/<name>.ts` に 1 関数ずつ、`api/index.ts` で集約。
- `hooks/` は loading/error/result の三つ組を返すデータ取得フックの集まり (`useGetSong`, `useGetHomeInfo`, `useRankingSongs` 等)。一覧系には `usePagination` を組み合わせる。
- `components/` は `common/` (汎用 UI: chord-diagram, pulldown, list, transpose-badge 等) / `features/` (画面固有: home, song) / `layouts/` (header, page-container, list-container) / `pages/` (各画面のトップ) の 4 層構成。ルートは `routes/<name>.tsx` から `pages/<name>.tsx` を呼ぶ薄いラッパ。
- `contexts/theme/` で MUI テーマ (light/dark) を提供。`ThemeContext` が `localStorage` (`app.theme`) と同期する。
- `utils/classes/CacheManager.ts` は `localStorage` ベースの TTL 付きキャッシュ。`useGetHomeInfo` 等のランキング系で 1 週間キャッシュに使われている。

### コード譜 / 転調ドメイン (`src/data/chord/`)

中核は `functions.ts` と `constants.ts` (`docs/仕様書/コードに関する仕様.md` と `コード譜生成システム仕様書.md` が公式仕様)。

- `NOTE_MAPPINGS` (12 半音 × 異名同音) を `A` 始点でインデックス化している。一般的な C 始点ではない点に注意。
- `parseChord` がコードを `{keyNote, modifier, bassNote}` に分解。複数文字の音名 (`C#`, `B♭`) を取り違えないよう **長い名前から照合する**。
- `transposeChord` は `keyNote` と `bassNote` を半音シフトし、`modifier` は維持する。元の表記が `♭` を含めばフラットを継承、それ以外は `#` 系を返す。パース失敗時は元の文字列をそのまま返す (`N.C.` 等を壊さない)。
- `getChordPositions` はオープン → A フォーム派生 → E フォーム派生 → その他 の順で並べる。ただし `A_FORM_PRIORITY_NOTES` (`A#/B/C/C#/D/D#` とそのフラット表記) は A フォームを優先する。フォーム判定は「バレーが 1 つ かつ `fret === 0`」を派生元と見なす規約。
- `OPEN_POSITIONS` (`data.ts`) は modifier ごとの基本ポジション辞書。`getModifierKeyOfOpenPositionsMap` で `""→"major"` / `"m"→"minor"` / `"M7"→"maj7"` を吸収する。

### 曲ページの転調フロー (`src/components/pages/song.tsx`)

- `useGetSong` が `SongResponse` (title/artist/credit/capo/body) を取得。
- `body` を `buildSongDetailHtml` で HTML 文字列化して `dangerouslySetInnerHTML` で描画。各コード `<p>` には `onclick="window.chordClickHandler(...)"` が埋め込まれ、`SongPage` 側で `window.chordClickHandler` をマウント時に登録する (グローバル経由でコードクリック → サイドバーのダイアグラム表示を繋ぐ)。`src/types/global.d.ts` に拡張定義がある。
- カポ・曲キーの変更は **直前の値との差分 (semitones)** を `transposeChord` に渡して `result.body` を破壊的に書き換える方式。再フェッチはしない (仕様書 3.3 の通りフロント完結)。

### バックエンド (`backend/`)

- `server.js` で `/api/home-info`, `/api/artist`, `/api/song`, `/api/search/{songs,artists}`, `/api/ranking/{songs,artists}` の 7 ルートを `cors()` 経由で公開。
- `implements/*.js` がエンドポイント実装。多くは `utils/http.js` の `loadUrl()` (axios + cheerio) で ufret.jp の HTML を読んで抽出する。
- `implements/song.js` だけは Playwright (Chromium) でレンダリング後の DOM を取りに行く (コード譜の DOM 構造が要 JS 実行のため)。`page.locator('input[name="key_scrollbar"]')` から `capo` を読み、`-9 〜 +2` の範囲だけ採用。
- ホーム取得 (`implements/home-info.js`) は `ul.c-card-song` の **先頭ブロックのみ** (今週のランキング) を採り、`badge-info` (初心者バッジ) を除外する仕様。スクレイピング元の DOM 構造に強く依存するので、改修時は実 HTML を確認すること。

## テスト

`tests/unit/types/chord.*.test.ts` にドメインロジック (転調・ポジション生成・音名インデックス) のテストがある。フロント UI のテストは無い。スクレイピング側のテストも無い。

## コード規約

- Prettier: `tabWidth: 4`, `useTabs: false` (`.prettierrc.json`)。
- TypeScript は strict + `noUnusedLocals`/`noUnusedParameters` 有効 (`tsconfig.app.json`)。
- ESLint は flat config (`eslint.config.js`)、`react-hooks` と `react-refresh` を有効化。
