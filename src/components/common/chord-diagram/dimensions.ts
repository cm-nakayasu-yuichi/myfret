/** 座標位置 */
export interface Point {
    /** X位置 */
    x: number;
    /** Y位置 */
    y: number;
}

/** サイズ */
export interface Size {
    /** 幅 */
    w: number;
    /** 高さ */
    h: number;
}

/** 座標サイズ */
export interface Rect {
    /** X位置 */
    x: number;
    /** Y位置 */
    y: number;
    /** 幅 */
    w: number;
    /** 高さ */
    h: number;
}

/** 四端位置 */
export interface Edge {
    /** 左端の位置 */
    l: number;
    /** 上端の位置 */
    t: number;
    /** 右端の位置 */
    r: number;
    /** 下端の位置 */
    b: number;
}
