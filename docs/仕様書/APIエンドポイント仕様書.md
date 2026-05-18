# API エンドポイント仕様書

myfret のバックエンドは ufret.jp をスクレイピングして JSON を返す。フロントは `axios` ラッパ経由でこの JSON を受け取る。**バックエンドにキャッシュ層は無い**ため、毎リクエスト ufret.jp に再アクセスする。

## 1. 全体構成

### 1.1 ベース URL

| 環境 | URL |
| --- | --- |
| フロント | `import.meta.env.VITE_API_BASE_URL`（`.env` で設定）|
| バックエンド | `http://localhost:3001`（`backend/server.js` の `PORT` 定数） |

### 1.2 CORS

`backend/server.js` で `cors()` ミドルウェアを全エンドポイントに適用しているため、すべての Origin から呼び出し可能（開発前提）。

### 1.3 エンドポイント一覧

| パス | フロント API 関数 | スクレイパ | ufret.jp 取得元 |
| --- | --- | --- | --- |
| `GET /api/home-info` | `getHomeInfo()` | cheerio | `https://www.ufret.jp/` |
| `GET /api/artist/:name` | `getArtist(name)` | cheerio | `https://www.ufret.jp/artist.php?data={name}` |
| `GET /api/song/:id` | `getSong(id)` | **Playwright (Chromium)** | `https://www.ufret.jp/song.php?data={id}` |
| `GET /api/search/songs/:keyword` | `searchSongs(keyword)` | cheerio | `https://www.ufret.jp/search.php?key={keyword}` |
| `GET /api/search/artists/:keyword` | `searchArtists(keyword)` | cheerio | `https://www.ufret.jp/search.php?key={keyword}` |
| `GET /api/ranking/songs/` | `rankingSongs()` | cheerio | `https://www.ufret.jp/rank.php` |
| `GET /api/ranking/artists/` | `rankingArtists()` | cheerio | `https://www.ufret.jp/rank_artist.php` |

## 2. フロントエンド API クライアント

### 2.1 apiClient

`src/api/client.ts`。

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
    get: async <T>(path: string): Promise<T> => {
        const response = await axios.get<T>(`${API_BASE_URL}${path}`);
        return response.data;
    },
};
```

- HTTP メソッドは `get` のみ提供。POST/PUT/DELETE は未実装。
- エラーは axios の例外がそのまま投げられる。ハンドリングは各 hook 側の責務。

### 2.2 各 API 関数

すべて `src/api/<name>.ts` に 1 関数ずつ定義し、`src/api/index.ts` で集約。

| 関数 | 戻り値 | URL |
| --- | --- | --- |
| `getHomeInfo()` | `Promise<HomeInfoResponse>` | `/api/home-info` |
| `getArtist(keyword)` | `Promise<SongListResponse>` | `/api/artist/${encodeURIWithPlus(keyword)}` |
| `getSong(id)` | `Promise<SongResponse>` | `/api/song/${id}` |
| `searchSongs(keyword)` | `Promise<SongListResponse>` | `/api/search/songs/${encodeURIWithPlus(keyword)}` |
| `searchArtists(keyword)` | `Promise<ArtistListResponse>` | `/api/search/artists/${encodeURIWithPlus(keyword)}` |
| `rankingSongs()` | `Promise<SongListResponse>` | `/api/ranking/songs/` |
| `rankingArtists()` | `Promise<ArtistListResponse>` | `/api/ranking/artists/` |

`encodeURIWithPlus` の挙動は [共通 UI・レイアウト仕様書 §11.2](./共通UI・レイアウト仕様書.md) を参照。

### 2.3 レスポンス型

```ts
// src/types/SongListItem.ts
export interface SongListItem {
    id: string;
    name: string;
    artist: string;
    rank: number;
}

// src/types/ArtistListItem.ts
export interface ArtistListItem {
    id: string;
    name: string;
    rank: number;
}

// src/types/responses/HomeInfoResponse.ts
export interface HomeInfoResponse {
    song_ranking: SongListItem[];
    artist_ranking: ArtistListItem[];
}

// src/types/responses/SongListResponse.ts
export interface SongListResponse {
    songs: SongListItem[];
    count: number;
}

// src/types/responses/ArtistListResponse.ts
export interface ArtistListResponse {
    artists: ArtistListItem[];
    count: number;
}

// src/types/responses/SongResponse.ts
interface Chord {
    chordName: string | null;
    cols: string[];
    lyric: string;
}
interface ChordRow {
    chords: Chord[];
}
export interface SongResponse {
    title: string;
    artist: string;
    credit: string;
    capo: number;
    body: ChordRow[];
}
```

`rank` フィールドは「ランキングではないリスト（検索結果・アーティスト曲一覧）」では `0` 固定。

## 3. バックエンド共通仕様

### 3.1 HTTP ローダ

`backend/utils/http.js` の `loadUrl(url)` が cheerio 取得の共通入口。

```js
exports.loadUrl = async (url) => {
    const response = await axios.get(url);
    return cheerio.load(response.data);
};
```

- ufret.jp に `axios.get` で素の HTML を取得し、cheerio でパースしたインスタンス (`$`) を返す。
- 例外は呼び出し側に再 throw する。

### 3.2 共通エラーレスポンス

cheerio 系の全エンドポイントは `try/catch` で例外を握り、500 ステータスで以下を返す:

```json
{
  "error": "スクレイピングに失敗しました",
  "details": "<例外メッセージ>"
}
```

Playwright を使う `/api/song/:id` も同じ構造のレスポンスを返す。

### 3.3 ID と URL パラメータ

ufret.jp の各種ページは `?data=` クエリでリソースを識別する。スクレイパは `href` から `data=([^&]+)` を取り出してフロントの `id` に渡す:

```js
const songId = href.match(/data=([^&]+)/)?.[1];
```

ufret.jp 内のリンクの `data=` 値は myfret 上の楽曲 ID・アーティスト ID として使われ、フロントは `/song/:songId`・`/artist/:name` のパスパラメータに直接埋め込む。

## 4. 各エンドポイント詳細

### 4.1 GET /api/home-info

実装: `backend/implements/home-info.js`。`https://www.ufret.jp/` からホーム情報を抽出。

#### 抽出元 DOM

- 曲ランキング: `ul.c-card-song` の **最初のブロックのみ**（ufret.jp ホームには複数の `c-card-song` セクションがあるが、最初の 1 つを「今週のランキング」と判定）の `li.c-card-song__item`
- アーティストランキング: `ul.c-card-artist` の `li.c-card-artist__item`

#### 抽出ルール（曲）

各 `li.c-card-song__item` から:

- `a[href*="song.php"]` の `href` から `data=` の値を取り出して `id` に
- `a` 配下の `p.c-card-song__title` のテキストを `name`
- `a` 配下の `p.c-card-song__artist` のテキストを `artist`
- 順位 `rank` はループのインクリメントで採番

**除外条件**:
- `a` 配下に `div.c-card-song__badge span.badge-info` が存在する項目（初心者バッジ付き）。
- `id` / `name` / `artist` のいずれかが空の項目。

#### 抽出ルール（アーティスト）

- `a[href*="artist.php"]` の `href` から `data=` の値を `id` に
- `p.c-card-artist__artist` のテキストを `name`
- 順位はインクリメント

**除外条件**: `id` / `name` のいずれかが空。

#### レスポンス

`HomeInfoResponse`。

### 4.2 GET /api/artist/:name

実装: `backend/implements/artist.js`。`https://www.ufret.jp/artist.php?data={name}` からアーティストの曲一覧を抽出。

#### 抽出元 DOM

- `ul.c-list li.c-list__item`

#### 抽出ルール

- `li` が `normal-chord` クラスを持つもののみ採用（初心者ver・動画プラスを除外）。
- `a.c-list__link` の `href` に `song.php` を含むもののみ。
- `href` の `data=` を `id` に。
- `p.c-list__title` のテキスト（**子要素を除外したテキストのみ**）を `name`。`clone().children().remove().end().text().trim()` で `<span>` 子要素を取り除く。
- `rank` は常に `0`。

#### レスポンス

`SongListResponse`（`artist` フィールドは含まれない…と思いきや、型は `SongListItem` で `artist` フィールドは必須なので注意。バックエンドは `artist` を含めずに返している点が現状の実装挙動。フロント側で `ListText`（曲名のみ）を使うため問題は顕在化しない。）

### 4.3 GET /api/song/:id

実装: `backend/implements/song.js`。**唯一 Playwright (Chromium) を使うエンドポイント**。ufret.jp のコード譜ページは JavaScript 実行後の DOM を見ないとコード行を取れないため。

#### 取得手順

1. Chromium を起動して `https://www.ufret.jp/song.php?data={id}` を開く
2. `waitUntil: 'domcontentloaded'`、タイムアウト 10 秒
3. 追加で `waitForTimeout(1000)`（1 秒スリープ）
4. `page.evaluate` で DOM から各種情報を取り出す
5. 終了時に `browser.close()`

#### 抽出ルール

| フィールド | 取得元 |
| --- | --- |
| `title` | `h1.p-detail-head__ttl` のテキスト |
| `artist` | `a.p-detail-head__artist` のテキスト |
| `credit` | `p.p-detail-head__lyrics` のテキスト |
| `body` | `#my-chord-data > div.row` を順に走査し、各 `p.chord` から下記の Chord を構築 |
| `capo` | `input[name="key_scrollbar"]` の value（整数） |

#### Chord の構造

各 `p.chord` から:

- `chordName`: `span > ruby > rt` のテキスト（無ければ `null`）
- `cols`: `span > span.col` を順に走査したテキスト配列
- `lyric`: `cols` を連結（空文字の `col` はスペースに置換して連結）

`chords` が空の `row` は `body` に含めない。

#### capo の採用範囲

`input[name="key_scrollbar"]` の value を整数化し、**`-9 <= value <= 2` の範囲のみ採用**。範囲外・パース失敗時は `0`。

これは myfret フロント側のカポ選択肢（`-9 ～ 2`）と合わせるため。

#### レスポンス

`SongResponse`。

### 4.4 GET /api/search/songs/:keyword

実装: `backend/implements/search-songs.js`。`https://www.ufret.jp/search.php?key={keyword}` から曲の検索結果を抽出。

#### 抽出元・ルール

`/api/artist/:name` と同じ DOM 構造（`ul.c-list li.c-list__item`）。差分は以下:

- アーティスト名 (`p.c-list__artist`) も抽出して `artist` フィールドに格納
- `id` / `name` / `artist` のいずれかが空のら除外

`rank` は常に `0`。

#### レスポンス

`SongListResponse`。

### 4.5 GET /api/search/artists/:keyword

実装: `backend/implements/search-artists.js`。`https://www.ufret.jp/search.php?key={keyword}` からアーティストの検索結果を抽出。

#### 抽出元 DOM

- `ul.c-card-artist li.c-card-artist__item`

#### 抽出ルール

- `a[href*="artist.php"]` の `href` から `data=` を `id` に
- `p.c-card-artist__artist` のテキストを `name`
- `rank` は常に `0`

`id` / `name` が空なら除外。

#### レスポンス

`ArtistListResponse`。

### 4.6 GET /api/ranking/songs/

実装: `backend/implements/ranking-songs.js`。`https://www.ufret.jp/rank.php` から曲ランキングを抽出。

#### アクティブタブの判定

ufret.jp のランキングページは複数の `div.js-tab-cont` を持ち、表示中のタブ以外は `style="display: none"` で隠されている。スクレイパは:

```js
$('div.js-tab-cont').filter((_, el) => {
    const style = $(el).attr('style') || '';
    return !style.includes('display: none') && !style.includes('display:none');
}).first();
```

で **最初に表示されている (`display: none` でない) タブ** を採用する。これが「週間ランキング」。

#### 抽出元 DOM

アクティブタブ内の `li.c-list__item`。

#### 抽出ルール

- `li` が `beginner-chord` クラスを持つものは除外（初心者ver）。
- `a.c-list__link` の `href` に `song.php` を含むもののみ。
- `href` の `data=` を `id` に。
- `p.c-list__title` のテキスト（**子要素を除外**）を `name`。
- `p.c-list__artist` のテキストを `artist`。
- `rank` はループでインクリメント（除外しなかった行のみ採番ではなく、`rank++` を行った後に空フィールドチェックで除外するため、**順位に欠番が出る可能性がある**点に注意）。

#### レスポンス

`SongListResponse`。

### 4.7 GET /api/ranking/artists/

実装: `backend/implements/ranking-artists.js`。`https://www.ufret.jp/rank_artist.php` からアーティストランキングを抽出。

#### 抽出元 DOM

`ul.c-list--rank li.c-list__item`。

#### 抽出ルール

- `a.c-list__link` の `href` に `artist.php` を含むもののみ。
- `href` の `data=` を `id` に。
- `p.c-list__title` のテキストを `name`。
- `rank` はループでインクリメント（4.6 と同じ理由で欠番の可能性あり）。

#### レスポンス

`ArtistListResponse`。

## 5. 実装上の注意

### 5.1 スクレイピングの脆弱性

各エンドポイントは ufret.jp の HTML 構造（クラス名・DOM 階層）に強く依存する。ufret.jp 側のマークアップが変わるとサイレントに空配列が返る可能性があるため、改修時は必ず実 HTML を確認する。

### 5.2 Playwright の初回セットアップ

`/api/song/:id` は Chromium が必要。バックエンドの初回起動時は:

```sh
cd backend && pnpm exec playwright install chromium
```

を実行する必要がある場合がある。

### 5.3 タイムアウト

- `/api/song/:id`: ページ遷移 10 秒タイムアウト + 1 秒スリープ。明示的なタイムアウト処理はそれ以上では無し。
- それ以外: `axios.get` のデフォルト挙動（明示的タイムアウトなし）。
