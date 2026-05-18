# 共通 UI・レイアウト仕様書

すべての画面で共通利用される UI / レイアウト要素の仕様。各コンポーネントの実装は `src/components/` 配下にある。

## 1. テーマ

### 1.1 仕様

- 2 モード: `'light'` / `'dark'`
- 永続化: `localStorage` キー `app.theme`（初期値は `'light'`）
- 提供場所: `src/contexts/theme/ThemeContext.tsx`
- 切替トリガ: ヘッダメニューのトグルボタン

```ts
export type THEME = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app.theme';
```

`useThemeContext()` で `{ mode, toggleTheme }` を取得できる。`toggleTheme(newTheme)` は `useState` と `localStorage` を同時に更新する。

### 1.2 拡張パレット

`palette` には MUI 標準色のほか、myfret 独自のキーが定義されている（実装は `src/contexts/theme/` のテーマ定義参照）。

| キー | 用途 |
| --- | --- |
| `accent` | セクションタイトル左の縦バー色、ローディングインジケータ等 |
| `headerIcon` | ヘッダのアイコン色 |
| `rankingNumber.{gold,silver,bronze,other}.{text,background}` | ランキング順位バッジ |
| `chordSheet.chord` / `chordSheet.lyric` | コード譜内のコード名・歌詞色 |

## 2. レイアウト

### 2.1 LayoutWithHeader

`src/utils/routeElement.tsx`。ヘッダ表示ルート全画面で使われるラッパ。

- ルート要素は `Box`、`bgcolor: theme.palette.background.default`、`minHeight: 100vh`
- 上部に `Header` を配置し、その下に画面要素を描画

ヘッダ非表示ルート（`/test`, `*`）では `LayoutWithHeader` を経由しない。

### 2.2 PageContainer

`src/components/layouts/page-container/PageContainer.tsx`。各画面のトップでコンテンツを包むコンテナ。

```tsx
<Container sx={{ my: 4 }}>{children}</Container>
```

- MUI `Container`（デフォルト幅）+ 上下マージン `my: 4`。
- ホーム・検索結果・ランキング・アーティスト曲一覧・コードブック・ヘルプの 6 画面で使用。曲ページは独自レイアウトのため未使用。

### 2.3 ListContainer

`src/components/layouts/list-container/ListContainer.tsx`。リスト系画面の状態制御コンテナ。

```ts
interface ListContainerProps {
    children: ReactNode;
    empty: boolean;
    loading: boolean;
    error: string | null;
}
```

表示は以下のいずれか:

| 状態 | 表示 |
| --- | --- |
| `loading === true` | 中央に `CircularProgress` |
| `empty === true` | テキスト「取得に失敗しました」 |
| `error` が truthy | テキスト「取得に失敗しました」 |
| 上記以外 | `Paper` でラップした `children` を表示 |

状態の優先順位: **loading → empty → error → 通常**。`empty` と `error` で同じメッセージを出すのは現状の実装挙動。

## 3. ヘッダ

実装ディレクトリ: `src/components/layouts/header/`。

### 3.1 Header

```tsx
<AppBar position="static">
    <Toolbar>
        <HeaderLogo />
        <Box sx={{ flexGrow: 1 }} />
        <HeaderSearch />
        <HeaderMenu />
    </Toolbar>
</AppBar>
```

左にロゴ、右に検索ボックスとメニューボタンを配置する。

### 3.2 HeaderLogo

クリックで `/`（ホーム）に遷移するロゴ。

### 3.3 HeaderSearch

検索ボックス。テキスト入力 + 検索タイプ切替（`HeaderSearchType`）+ 検索ボタン。

| 入力 | 振る舞い |
| --- | --- |
| 検索タイプ | `'song'`（曲名）または `'artist'`（アーティスト名） |
| プレースホルダ | 検索タイプに応じて「曲名を入力」「アーティスト名を入力」 |
| キーワード | `trim()` 後に空文字なら遷移しない |
| 検索ボタン | `getSearchUrl(keyword, type)` の URL に `navigate` |

検索 URL のビルダは `src/types/enums/SearchType.ts` で一元管理。

| 検索タイプ | 遷移先 |
| --- | --- |
| `'song'` | `/search/songs/{encodeURIComponent(keyword)}` |
| `'artist'` | `/search/artists/{encodeURIComponent(keyword)}` |

### 3.4 HeaderMenu

メニューアイコンクリックで開くドロップダウン。固定幅 250px。

| 項目 | 振る舞い |
| --- | --- |
| テーマ | `ToggleButtonGroup`（「ライト」「ダーク」）。`toggleTheme` を呼び、メニューを閉じる。 |
| コードブック | `navigate('/codebook')` |
| ヘルプ | `navigate('/help')` |

## 4. リスト系コンポーネント

### 4.1 NormalList

`src/components/common/list/NormalList.tsx`。MUI の `List` を `p: 0` で薄くラップしただけ。

### 4.2 PaginatedList

`src/components/common/list/PaginatedList.tsx`。リスト + ページネーション UI。

```ts
interface PaginatedListProps<T> {
    items: T[];
    currentPage: number;
    totalPages: number;
    onPageChange: (event, page) => void;
    baseUrl: string;
    query?: string;
    renderItem: (item: T, index: number) => React.ReactNode;
}
```

- 上部に `Pagination`（`size="small"`）。リスト本体は下部の `List`。
- 各ページ番号は React Router の `Link` で構成され、`buildPaginationUrl(baseUrl, query, page)` のパスに遷移する。
- 表示する `items` は呼び出し側（`usePagination`）が事前にスライス済みの配列。

### 4.3 NormalListItem

`src/components/common/list-item/NormalListItem.tsx`。リンクとして振る舞う 1 行。

| 仕様 | 値 |
| --- | --- |
| 構造 | `ListItem` を `RouterLink` 化、`divider` あり |
| 偶数行背景 | `(index + 1) % 2 === 0` の行のみ `rgba(0, 0, 0, 0.02)` |
| ホバー | `rgba(0, 0, 0, 0.1)` |
| テキスト | `textDecoration: "none"`, `color: "inherit"` |

### 4.4 MoreListItem

「もっと見る」リンク行。中央寄せ・パディング `py: 2`・ホバー時 `rgba(0, 0, 0, 0.1)`。ホーム画面のランキングセクション末尾で使用。

### 4.5 ListText / SongListText / ArtistListText

`src/components/common/list-text/`。リスト行内のテキスト要素。

| コンポーネント | 表示 |
| --- | --- |
| `ListText` | 単一文字列を太字で表示 |
| `SongListText` | 曲名（太字）+ `-` + アーティスト名（`text.secondary` 0.875rem） |
| `ArtistListText` | アーティスト名（太字） |

## 5. RankingNumber

`src/components/common/ranking-number/RankingNumber.tsx`。ランキング順位を表示するアバター。

| rank | text / background |
| --- | --- |
| 1 | `palette.rankingNumber.gold.text` / `.background` |
| 2 | `palette.rankingNumber.silver.text` / `.background` |
| 3 | `palette.rankingNumber.bronze.text` / `.background` |
| 4 以降 | `palette.rankingNumber.other.text` / `.background` |

- サイズ 24×24、右マージン 16px。
- `rank <= 3` のときフォントウェイト bold、それ以外は normal。

## 6. SectionTitle

`src/components/common/section-title/SectionTitle.tsx`。各画面の見出し。

```ts
interface SectionTitleProps {
    children: ReactNode;
    total?: number;
}
```

- `Typography variant="h5"`、左に `palette.accent` 色の縦バー（`borderLeft: 4`）+ `pl: 2`。
- `total` が指定されたとき、右側に「全 N 件」を `text.secondary` で並べる（横並び）。
- `total` が無いときは下マージンつきの単独タイトル。

## 7. TransposeBadge

`src/components/common/transpose-badge/TransposeBadge.tsx`。曲ページで使うカポ・曲キーのバッジ。

```ts
interface Props<T extends number> {
    bgcolor: string;
    value: T;
    getText: (value: T) => string | null;
    sx?: SxProps<Theme>;
}
```

- `getText(value)` が `null` を返したらバッジ自体を描画しない（例: `getCapoBadgeText(0)` → `null`、原曲キーのときも `null`）。
- 文字色は常に `white`、背景色は呼び出し側指定（曲ページでは `info.*` と `success.*` を使い分け）。

## 8. Pulldown / PulldownContainer

`src/components/common/pulldown/`。曲ページのカポ・曲キー選択で使用。

```ts
interface PulldownProps<T extends number> {
    label: string;
    value: T;
    options: T[];
    text: (value: T) => string;
    onChange: (value: T) => void;
}
```

- `PulldownContainer` は `FormControl` + `InputLabel` でラベル付きの選択ボックスに仕立てる。`fullWidth`、`mb: 3`。
- `Pulldown` 単体は `Select` + `MenuItem` のみ。
- 値の型は `number` のみを想定（`T extends number`）。曲ページでは `CapoValue` / `SongKeyValue` を渡す。

## 9. ChordDiagram / ChordDiagramViewer

`src/components/common/chord-diagram/`。コード押さえ方の図を Canvas で描画する。

### 9.1 ChordDiagram

```ts
interface Props {
    position: ChordPosition;
}
```

- `<canvas>` を `containerRef` の幅に合わせて描画する（高さは幅 - 34px）。
- `window.devicePixelRatio` で解像度補正。
- 描画ロジックは `drawing-main.ts` の `drawDiagram(position, ctx, width, height, theme)` に委譲。
- `position` が変わったとき、およびテーマ `mode` が変わったときに再描画する。

### 9.2 ChordDiagramViewer

```ts
interface Props {
    chordName: string | null;
}
```

- `chordName` から `getChordPositions(chordName)`（ドメイン関数）でポジションの配列を取得し、左右ボタンで切り替える。
- ヘッダに「← / コード名 / →」を配置。リング状に循環（先頭で `prev` を押すと末尾へ、末尾で `next` を押すと先頭へ）。
- `chordName` が変わると `index` を 0 にリセット。
- `chordName` が `null` のときはポジションを空にして何も描画しない。

ポジション生成のドメインロジックは [コード譜生成システム仕様書](./コード譜生成システム仕様書.md) を参照。

## 10. ChordSheetBox

`src/styles/ChordSheetBox.tsx`。曲ページの中央エリアにレンダリングされるコード譜 HTML 用のスタイル付き `Box`。

- 子要素は `dangerouslySetInnerHTML` で渡される HTML 文字列（`buildSongDetailHtml`）。
- `.chord-name ruby rt` の色は `palette.chordSheet.chord`、`.col` の色は `palette.chordSheet.lyric`。
- コード文字（`.chord-name`）はクリックを受けないよう `pointer-events: none`。クリック対象は親の `<p class="chord">`。

## 11. ユーティリティ

### 11.1 buildPaginationUrl

`src/utils/buildPaginationUrl.ts`。

```ts
buildPaginationUrl(baseUrl: string, query?: string, page: number | null = null): string;
```

| 入力 | 出力 |
| --- | --- |
| `('/search/', 'keyword', 1)` | `'/search/keyword'` |
| `('/search/', 'keyword', 2)` | `'/search/keyword/2'` |
| `('/items/', undefined, 1)` | `'/items/'` |
| `('/items/', undefined, 2)` | `'/items/2'` |

ページ番号 1 のときはページパラメータを URL に付けない。

### 11.2 encodeURIWithPlus

`src/utils/encodeURIWithPlus.ts`。検索キーワード・アーティスト名の URL エンコード。

- `encodeURIComponent` した結果に対し以下の置換を追加で行う:
  - `%20` → `+`
  - `%2B` → `+`
  - `%28` → `(`
  - `%29` → `)`
- 空白を `+` にする ufret.jp の URL 形式に合わせるための変換。

### 11.3 buildSongDetailHtml

`src/utils/buildSongDetailHtml.ts`。`SongResponse` から曲ページ中央に流し込む HTML 文字列を生成する。詳細は [曲（コード譜）画面仕様書](./画面_曲.md) を参照。
