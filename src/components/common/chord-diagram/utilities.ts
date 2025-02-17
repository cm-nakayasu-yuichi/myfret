import { FRET_NUM, STRING_ESCESS_WIDTH, STRING_NUM } from "./constants";
import { Edge, Rect, Size } from "./dimensions";
import { getFingerboardRect } from "./rect-calculation";

/**
 * 弦間の幅を取得する
 * @param canvasSize キャンバスサイズ
 * @returns 弦間の幅
 */
export const getStringInterval = (canvasSize: Size): number => {
    const fingerboardRect = getFingerboardRect(canvasSize);
    return fingerboardRect.h / (STRING_NUM - 1);
};

/**
 * フレット間の幅を取得する
 * @param canvasSize キャンバスサイズ
 * @returns フレット間の幅
 */
export const getFretInterval = (canvasSize: Size): number => {
    const fingerboardRect = getFingerboardRect(canvasSize);
    return (fingerboardRect.w - STRING_ESCESS_WIDTH) / (FRET_NUM - 1);
};

/**
 * RectをEdgeに変換
 * @param rect Rect
 * @returns Edge
 */
export const rectToEdge = (rect: Rect): Edge => {
    return {
        l: rect.x,
        t: rect.y,
        r: rect.x + rect.w,
        b: rect.y + rect.h,
    };
};

/**
 * EdgeをRectに変換
 * @param edge Edge
 * @returns Rect
 */
export const edgeToRect = (edge: Edge): Rect => {
    return {
        x: edge.l,
        y: edge.t,
        w: edge.r - edge.l,
        h: edge.b - edge.t,
    };
};
