import { FRET_NUMBER_SIZE } from "./constants";
import { Point, Rect } from "./dimensions";
import { rectToEdge } from "./utilities";

/**
 * 直線を描画する
 * @param ctx コンテキスト
 * @param start 開始位置
 * @param end 終了位置
 * @param color 色
 * @param lineWidth 線の幅
 */
export const drawLine = (
    ctx: CanvasRenderingContext2D,
    start: Point,
    end: Point,
    color: string = "#000",
    lineWidth: number = 1
) => {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
};

/**
 * 円を描画する
 * @param ctx コンテキスト
 * @param point 中心位置
 * @param size 円のサイズ(半径)
 * @param color 色
 * @param fill 中を塗るかどうか
 */
export const drawCircle = (
    ctx: CanvasRenderingContext2D,
    point: Point,
    size: number,
    color: string = "#000",
    fill: boolean = true
) => {
    if (fill) {
        ctx.fillStyle = color;
    } else {
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
    if (fill) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

/**
 * Xを描画する
 * @param ctx コンテキスト
 * @param rect 座標サイズ
 * @param color 色
 */
export const drawCross = (
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    color: string = "#000"
) => {
    const edge = rectToEdge(rect);
    const halfW = rect.w / 2;
    const halfH = rect.h / 2;

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(edge.l - halfW, edge.t - halfH);
    ctx.lineTo(edge.r - halfW, edge.b - halfH);
    ctx.moveTo(edge.r - halfW, edge.t - halfH);
    ctx.lineTo(edge.l - halfW, edge.b - halfH);
    ctx.stroke();
};

/**
 * 文字を描画する
 * @param ctx コンテキスト
 * @param rect 座標サイズ
 * @param text 文字
 * @param color 色
 */
export const drawText = (
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    text: string,
    color: string = "#000"
) => {
    ctx.font = `${FRET_NUMBER_SIZE}px Arial`;
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.fillText(text, rect.x, rect.y);
};
