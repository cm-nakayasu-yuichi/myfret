import {
    drawBarre,
    drawFretNumber,
    drawFrets,
    drawMuteStringMark,
    drawOpenStringMark,
    drawPosition,
    drawStrings,
} from "./drawing-functions";

export const drawDiagram = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
) => {
    ctx.clearRect(0, 0, width, height);
    const canvasSize = { w: width, h: height };

    drawStrings(ctx, canvasSize);
    drawFrets(ctx, canvasSize, false);

    drawBarre(ctx, canvasSize, 1, 1, 5);

    drawPosition(ctx, canvasSize, 2, 3);
    drawPosition(ctx, canvasSize, 3, 2);
    drawPosition(ctx, canvasSize, 4, 3);

    drawOpenStringMark(ctx, canvasSize, 1);
    drawMuteStringMark(ctx, canvasSize, 6);

    drawFretNumber(ctx, canvasSize, 5);
};
