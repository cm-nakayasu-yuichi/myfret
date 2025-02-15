/** カポの値 */
export type CapoValue = 2 | 1 | 0 | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9;

/** プルダウンで使用するためのカポの選択肢 */
export const capoValueOptions: CapoValue[] = [
    2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9,
];

/**
 * カポの値として有効かどうかをチェックする
 * @param value チェックする対象
 * @returns カポの値が有効かどうか
 */
export const isValidCapoValue = (value?: number): value is CapoValue => {
    return capoValueOptions.includes(value as CapoValue);
};

/**
 * カポの表示用テキストを取得
 * @param value カポの値
 * @returns 表示用テキスト
 */
export const getCapoValueText = (value: CapoValue): string => {
    if (value === 2) return "1音下げチューニング";
    if (value === 1) return "半音下げチューニング";
    if (value === 0) return "原曲キー";
    return `カポ${Math.abs(value)}`;
};
