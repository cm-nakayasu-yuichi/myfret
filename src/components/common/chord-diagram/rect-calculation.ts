import {
    END_X,
    END_Y,
    FRET_NUM,
    FRET_NUMBER_INTERVAL,
    FRET_NUMBER_SIZE,
    LEFT_MARK_INTERVAL,
    LEFT_MARK_SIZE,
    POSITION_MARK_RATIO,
    START_X,
    START_Y,
    STRING_ESCESS_WIDTH,
    STRING_NUM,
} from "./constants";
import { Rect, Size, rectToEdge } from "./dimensions";

/**
 * 指板の座標サイズを取得する
 * @param canvasSize キャンバスサイズ
 * @returns 指板の座標サイズ
 */
export const getFingerboardRect = (canvasSize: Size): Rect => {
    return {
        x: START_X,
        y: START_Y,
        w: canvasSize.w - START_X - END_X,
        h: canvasSize.h - START_Y - END_Y,
    };
};

/**
 * 指ポジションの座標サイズを取得する
 * @param canvasSize キャンバスサイズ
 * @param string 弦
 * @param fret フレット
 * @returns 指ポジションの座標サイズ
 */
export const getPositionMarkRect = (
    canvasSize: Size,
    string: number,
    fret: number
): Rect => {
    const fingerboardRect = getFingerboardRect(canvasSize);
    const fingerboardEdge = rectToEdge(fingerboardRect);
    const stringInterval = fingerboardRect.h / (STRING_NUM - 1);
    const fretInterval =
        (fingerboardRect.w - STRING_ESCESS_WIDTH) / (FRET_NUM - 1);
    const markWidth = fretInterval * POSITION_MARK_RATIO;
    const markOffsetX = fretInterval / 2; // フレット間における中央の位置を計算

    const x = fingerboardEdge.l + markOffsetX + (fret - 1) * fretInterval;
    const y = fingerboardEdge.t + (string - 1) * stringInterval;

    return {
        x: x,
        y: y,
        w: markWidth,
        h: markWidth,
    };
};

/**
 * 指板の左側のマークの座標サイズを取得する
 * @param canvasSize キャンバスサイズ
 * @param string 弦
 * @returns 指板の左側のマークの座標サイズ
 */
export const getLeftMarkRect = (canvasSize: Size, string: number): Rect => {
    const fingerboardRect = getFingerboardRect(canvasSize);
    const fingerboardEdge = rectToEdge(fingerboardRect);
    const stringInterval = fingerboardRect.h / (STRING_NUM - 1);
    return {
        x: fingerboardEdge.l - LEFT_MARK_SIZE - LEFT_MARK_INTERVAL,
        y: fingerboardEdge.t + (string - 1) * stringInterval,
        w: LEFT_MARK_SIZE,
        h: LEFT_MARK_SIZE,
    };
};

/**
 * 指板の下部に表示するテキストの座標サイズを取得する
 * @param canvasSize キャンバスサイズ
 * @param fret フレット
 * @returns 指板の下部に表示するテキストの座標サイズ
 */
export const getBottomTextRect = (canvasSize: Size, fret: number): Rect => {
    const fingerboardRect = getFingerboardRect(canvasSize);
    const fingerboardEdge = rectToEdge(fingerboardRect);
    const fretInterval =
        (fingerboardRect.w - STRING_ESCESS_WIDTH) / (FRET_NUM - 1);
    const markOffsetX = fretInterval / 2; // フレット間における中央の位置を計算
    return {
        x: fingerboardEdge.l + markOffsetX + (fret - 1) * fretInterval,
        y: fingerboardEdge.b + FRET_NUMBER_SIZE / 2 + FRET_NUMBER_INTERVAL,
        w: FRET_NUMBER_SIZE,
        h: FRET_NUMBER_SIZE,
    };
};
