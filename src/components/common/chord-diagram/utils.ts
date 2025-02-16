// 指板の左端の位置
const START_X = 40;
// 指板の上端の位置
const START_Y = 40;
// 指板の右端の位置
const END_X = 20;
// 指板の下端の位置
const END_Y = 50;
// 線の太さ
const LINE_WIDTH = 2;
// 弦の数
const STRING_NUM = 6;
// 弦を右に余らせる長さ
const STRING_ESCESS_WIDTH = 10;
// フレットの数
const FRET_NUM = 5;
// 左側マーク(開放弦・ミュート)の指板左端からの距離
const LEFT_MARK_INTERVAL = 6;
// 左側マーク(開放弦・ミュート)のサイズ
const LEFT_MARK_SIZE = 10;
// ポジションマークのサイズのフレット幅に対する割合
const POSITION_MARK_RATIO = 0.42;
// フレット番号の指板左端からの距離
const FRET_NUMBER_INTERVAL = 16;
// フレット番号のテキストサイズ(px)
const FRET_NUMBER_SIZE = 18;

interface Point {
    x: number;
    y: number;
}

interface Size {
    w: number;
    h: number;
}

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Edge {
    l: number;
    t: number;
    r: number;
    b: number;
}

/**
 * 指ポジションを描画する
 * @param ctx
 * @param canvasSize
 * @param string
 * @param fret
 * @param color
 * @param lineWidth
 */
export const drawPosition = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    string: number,
    fret: number,
    color: string = "#000"
) => {
    const rect = positionMarkRect(canvasSize, string, fret);
    drawCircle(ctx, rect, rect.w, color);
};

export const drawBarre = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    fret: number,
    startString: number = 1,
    endString: number = 6,
    color: string = "#000"
) => {
    const startRect = positionMarkRect(canvasSize, startString, fret);
    const startEdge = rectToEdge(startRect);
    const endEdge = rectToEdge(positionMarkRect(canvasSize, endString, fret));
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
 * @param ctx
 * @param start
 * @param end
 * @param lineWidth
 * @param color
 */
export const drawStrings = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    color: string = "#000"
) => {
    const rect = drawingRect(canvasSize);
    const edge = rectToEdge(rect);
    const interval = rect.h / (STRING_NUM - 1);

    for (let i = 0; i < STRING_NUM; i++) {
        const y = edge.t + i * interval;
        drawLine(
            ctx,
            { x: edge.l, y: y },
            { x: edge.r, y: y },
            color,
            LINE_WIDTH
        );
    }
};

/**
 * すべてのフレットを描画する
 * @param ctx
 * @param canvasSize
 * @param isFret0
 * @param color
 * @param lineWidth
 */
export const drawFrets = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    isFret0: boolean,
    color: string = "#000"
) => {
    // 描画範囲の計算
    const rect = drawingRect(canvasSize);
    const edge = rectToEdge(rect);
    const interval = (rect.w - STRING_ESCESS_WIDTH) / (FRET_NUM - 1);

    for (let i = 0; i < FRET_NUM; i++) {
        const x = edge.l + i * interval;
        drawLine(
            ctx,
            { x: x, y: edge.t },
            { x: x, y: edge.b },
            color,
            LINE_WIDTH
        );
    }

    if (isFret0) {
        const x = edge.l - 2.5;
        drawLine(
            ctx,
            { x: x, y: edge.t - LINE_WIDTH / 2 },
            { x: x, y: edge.b + LINE_WIDTH / 2 },
            color,
            LINE_WIDTH
        );
    }
};

/**
 * 開放弦マークを描画する
 * @param ctx
 * @param canvasSize
 * @param index
 * @param color
 */
export const drawOpenStringMark = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    index: number,
    color: string = "#000"
) => {
    const rect = leftMarkRect(canvasSize, index);
    drawCircle(ctx, { x: rect.x, y: rect.y }, LEFT_MARK_SIZE, color, false);
};

/**
 * ミュートマークを描画する
 * @param ctx
 * @param canvasSize
 * @param index
 * @param color
 */
export const drawMuteStringMark = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    index: number,
    color: string = "#000"
) => {
    const rect = leftMarkRect(canvasSize, index);
    drawCross(ctx, rect, color);
};

export const drawFretNumber = (
    ctx: CanvasRenderingContext2D,
    canvasSize: Size,
    number: number,
    color: string = "#000"
) => {
    const rect = bottomTextRect(canvasSize, 1);
    drawText(ctx, rect, number.toString(), color);
};

const drawLine = (
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

const drawCircle = (
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

const rectToEdge = (rect: Rect): Edge => {
    return {
        l: rect.x,
        t: rect.y,
        r: rect.x + rect.w,
        b: rect.y + rect.h,
    };
};

const drawingRect = (canvasSize: Size): Rect => {
    return {
        x: START_X,
        y: START_Y,
        w: canvasSize.w - START_X - END_X,
        h: canvasSize.h - START_Y - END_Y,
    };
};

const leftMarkRect = (canvasSize: Size, index: number): Rect => {
    const rect = drawingRect(canvasSize);
    const edge = rectToEdge(rect);
    const interval = rect.h / (STRING_NUM - 1);
    return {
        x: edge.l - LEFT_MARK_SIZE - LEFT_MARK_INTERVAL,
        y: edge.t + index * interval,
        w: LEFT_MARK_SIZE,
        h: LEFT_MARK_SIZE,
    };
};

const positionMarkRect = (
    canvasSize: Size,
    string: number,
    fret: number
): Rect => {
    const rect = drawingRect(canvasSize);
    const edge = rectToEdge(rect);
    const stringInterval = rect.h / (STRING_NUM - 1);
    const fretInterval = (rect.w - STRING_ESCESS_WIDTH) / (FRET_NUM - 1);
    const markWidth = fretInterval * POSITION_MARK_RATIO;
    const markOffsetX = fretInterval / 2; // フレット間における中央の位置を計算

    const x = edge.l + markOffsetX + (fret - 1) * fretInterval;
    const y = edge.t + (string - 1) * stringInterval;

    return {
        x: x,
        y: y,
        w: markWidth,
        h: markWidth,
    };
};

const bottomTextRect = (canvasSize: Size, fret: number): Rect => {
    const rect = drawingRect(canvasSize);
    const edge = rectToEdge(rect);
    const fretInterval = (rect.w - STRING_ESCESS_WIDTH) / (FRET_NUM - 1);
    const markOffsetX = fretInterval / 2; // フレット間における中央の位置を計算
    return {
        x: edge.l + markOffsetX + (fret - 1) * fretInterval,
        y: edge.b + FRET_NUMBER_SIZE / 2 + FRET_NUMBER_INTERVAL,
        w: FRET_NUMBER_SIZE,
        h: FRET_NUMBER_SIZE,
    };
};
