/** 曲キーの値 */
export type SongKeyValue = 5 | 4 | 3 | 2 | 1 | 0 | -1 | -2 | -3 | -4 | -5 | -6;

/** プルダウンで使用するための曲キーの選択肢 */
export const songKeyValueOptions: SongKeyValue[] = [
    5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6,
];

/**
 * 曲キーの値として有効かどうかをチェックする
 * @param value チェックする対象
 * @returns 曲キーの値が有効かどうか
 */
export const isValidSongKeyValue = (value?: number): value is SongKeyValue => {
    return songKeyValueOptions.includes(value as SongKeyValue);
};

/**
 * 曲キーの表示用テキストを取得
 * @param value 曲キーの値
 * @returns 表示用テキスト
 */
export const getSongKeyValueText = (value: SongKeyValue): string => {
    if (value === 0) return "原曲キー";
    if (value > 0) return `+${value}`;
    return `${value}`;
};

/**
 * 曲キーの表示用テキストを取得
 * @param value 曲キーの値
 * @returns 表示用テキスト
 */
export const getSongKeyBadgeText = (value: SongKeyValue): string | null => {
    if (value === 0) return null;
    if (value > 0) return `#${Math.abs(value)}`;
    return `♭${Math.abs(value)}`;
};
