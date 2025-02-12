/**
 * コード情報
 */
interface Chord {
    /** コード名 */
    chordName: string | null;
    /** 文字の配列 */
    cols: string[];
    /** 歌詞文字列 */
    lyric: string;
}

/**
 * コード譜の1行
 */
interface ChordRow {
    /** コードの配列 */
    chords: Chord[];
}

/**
 * 曲の詳細情報
 */
export interface SongResponse {
    /** 曲名 */
    title: string;
    /** アーティスト名 */
    artist: string;
    /** クレジット情報 */
    credit: string;
    /** コード譜本体 */
    body: ChordRow[];
}
