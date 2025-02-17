import {
    FRET_NUM,
    LEFT_MARK_SIZE,
    LINE_WIDTH,
    STRING_ESCESS_WIDTH,
    STRING_NUM,
} from "./constants";
import { rectToEdge, Size } from "./dimensions";
import { drawCircle, drawCross, drawLine, drawText } from "./drawing-base";
import {
    getBottomTextRect,
    getFingerboardRect,
    getLeftMarkRect,
    getPositionMarkRect,
} from "./rect-calculation";

/**
 * 指ポジションを描画する
 * @param ctx コンテキスト
 * @param canvasSize キャンバスサイズ
 * @param string 弦
 * @param fret フレット
 * @param color 色
 * @param lineWidth
 */
export const drawPosition = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    string: number,
    fret: number,
    color: string = "#000"
) => {
    const rect = getPositionMarkRect(canvasSize, string, fret);
    drawCircle(ctx, rect, rect.w, color);
};

/**
 * バレー(セーハ)を描画する
 * @param ctx コンテキスト
 * @param canvasSize キャンバスサイズ
 * @param fret フレット
 * @param startString 開始する弦
 * @param endString 終了する弦
 * @param color 色
 */
export const drawBarre = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    fret: number,
    startString: number = 1,
    endString: number = 6,
    color: string = "#000"
) => {
    const startRect = getPositionMarkRect(canvasSize, startString, fret);
    const startEdge = rectToEdge(startRect);
    const endEdge = rectToEdge(
        getPositionMarkRect(canvasSize, endString, fret)
    );
    const halfSize = startRect.w / 2;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(
        startEdge.l - halfSize,
        startEdge.t - halfSize,
        startRect.w,
        endEdge.b - startEdge.t,
        startRect.w / 2
    );
    ctx.fill();
};

/**
 * すべての弦を描画する
 * @param ctx コンテキスト
 * @param start 開始位置
 * @param end 終了位置
 * @param lineWidth 線の幅
 * @param color 色
 */
export const drawStrings = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    color: string = "#000"
) => {
    const fingerboardRect = getFingerboardRect(canvasSize);
    const fingerboardEdge = rectToEdge(fingerboardRect);
    const interval = fingerboardRect.h / (STRING_NUM - 1);

    for (let i = 0; i < STRING_NUM; i++) {
        const y = fingerboardEdge.t + i * interval;
        drawLine(
            ctx,
            { x: fingerboardEdge.l, y: y },
            { x: fingerboardEdge.r, y: y },
            color,
            LINE_WIDTH
        );
    }
};

/**
 * すべてのフレットを描画する
 * @param ctx コンテキスト
 * @param canvasSize キャンバスサイズ
 * @param isFret0 左端が0フレットか (二重線にするかどうか)
 * @param color 色
 * @param lineWidth 線の幅
 */
export const drawFrets = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    isFret0: boolean,
    color: string = "#000"
) => {
    const fingerboardRect = getFingerboardRect(canvasSize);
    const fingerboardEdge = rectToEdge(fingerboardRect);
    const interval = (fingerboardRect.w - STRING_ESCESS_WIDTH) / (FRET_NUM - 1);

    for (let i = 0; i < FRET_NUM; i++) {
        const x = fingerboardEdge.l + i * interval;
        drawLine(
            ctx,
            { x: x, y: fingerboardEdge.t },
            { x: x, y: fingerboardEdge.b },
            color,
            LINE_WIDTH
        );
    }

    if (isFret0) {
        const x = fingerboardEdge.l - 2.5;
        drawLine(
            ctx,
            { x: x, y: fingerboardEdge.t - LINE_WIDTH / 2 },
            { x: x, y: fingerboardEdge.b + LINE_WIDTH / 2 },
            color,
            LINE_WIDTH
        );
    }
};

/**
 * 開放弦マークを描画する
 * @param ctx コンテキスト
 * @param canvasSize キャンバスサイズ
 * @param index インデックス
 * @param color 色
 */
export const drawOpenStringMark = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    index: number,
    color: string = "#000"
) => {
    const leftMarkRect = getLeftMarkRect(canvasSize, index);
    drawCircle(
        ctx,
        { x: leftMarkRect.x, y: leftMarkRect.y },
        LEFT_MARK_SIZE,
        color,
        false
    );
};

/**
 * ミュートマークを描画する
 * @param ctx コンテキスト
 * @param canvasSize キャンバスサイズ
 * @param index インデックス
 * @param color 色
 */
export const drawMuteStringMark = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    index: number,
    color: string = "#000"
) => {
    const leftMarkRect = getLeftMarkRect(canvasSize, index);
    drawCross(ctx, leftMarkRect, color);
};

/**
 * フレット番号を描画する
 * @param ctx コンテキスト
 * @param canvasSize キャンバスサイズ
 * @param number フレット番号
 * @param color 色
 */
export const drawFretNumber = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    number: number,
    color: string = "#000"
) => {
    const bottomTextRect = getBottomTextRect(canvasSize, 1);
    drawText(ctx, bottomTextRect, number.toString(), color);
};
