import { ChordPosition } from "../../../data/chord";
import {
    drawBarre,
    drawFretNumber,
    drawFrets,
    drawMuteStringMark,
    drawOpenStringMark,
    drawPosition,
    drawStrings,
} from "./drawing-functions";

export const drawDiagram_ = (
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

export const drawDiagram = (
    position: ChordPosition,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
) => {
    ctx.clearRect(0, 0, width, height);
    if (!position) {
        return;
    }

    const canvasSize = { w: width, h: height };

    let fretNumber = 0;
    const barres = position.barres;
    if (barres && barres.length >= 1) {
        fretNumber = barres[0].fret;
    }

    drawStrings(ctx, canvasSize);
    drawFrets(ctx, canvasSize, fretNumber == 0);

    if (fretNumber >= 1) {
        drawFretNumber(ctx, canvasSize, fretNumber);
    }

    barres?.forEach((barre) => {
        if (barre.fret <= 0) {
            return;
        }
        if (barre.strings.length != 2) {
            return;
        }
        const fret = barre.fret;
        const start = barre.strings[0];
        const end = barre.strings[1];
        drawBarre(ctx, canvasSize, 1, start, end);
    });

    position.frets.forEach((fret, stringIndex) => {
        const string = stringIndex + 1;
        if (fret > 0) {
            drawPosition(ctx, canvasSize, string, fret);
        } else if (fret == 0) {
            drawOpenStringMark(ctx, canvasSize, string);
        } else {
            drawMuteStringMark(ctx, canvasSize, string);
        }
    });
};
