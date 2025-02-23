/**
 * コード情報
 */
export interface ChordParts {
    keyNote: string; // キー音
    modifier: string; // コード修飾
    bassNote: string; // ベース音（オプション）
}

/**
 * ギターコードのポジション
 */
export interface ChordPosition {
    /**
     * 押さえる弦のフレット番号
     *
     * - [1弦, 2弦, 3弦, 4弦, 5弦, 6弦]
     * - 0は開放弦を表す
     * - -1はミュート弦を表す
     */
    frets: number[];
    /** バレー(セーハ) */
    barres?: Array<{
        /** セーハのフレット番号 */
        fret: number;
        /**
         * セーハする弦
         *
         * - 配列の要素数は2
         * - 0: 開始弦
         * - 1: 終了弦
         */
        strings: number[];
    }>;
}

/**
 * ギターコードとポジションのパターン
 */
export interface ChordPattern {
    /** コード名 */
    name: string;
    /** 複数の押さえ方パターン */
    positions: ChordPosition[];
}
