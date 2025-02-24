import { Theme } from "@mui/material";
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

export const drawDiagram = (
    position: ChordPosition,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    theme: Theme
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

    drawStrings(ctx, canvasSize, theme.palette.chordDiagram.main);
    drawFrets(ctx, canvasSize, fretNumber == 0, theme.palette.chordDiagram.main);

    if (fretNumber >= 1) {
        drawFretNumber(ctx, canvasSize, fretNumber, theme.palette.chordDiagram.number);
    }

    barres?.forEach((barre) => {
        if (barre.fret <= 0) {
            return;
        }
        if (barre.strings.length != 2) {
            return;
        }
        const start = barre.strings[0];
        const end = barre.strings[1];
        drawBarre(ctx, canvasSize, 1, start, end, theme.palette.chordDiagram.position);
    });

    position.frets.forEach((fret, stringIndex) => {
        const string = stringIndex + 1;
        if (fret > 0) {
            drawPosition(ctx, canvasSize, string, fret, theme.palette.chordDiagram.position);
        } else if (fret == 0) {
            drawOpenStringMark(ctx, canvasSize, string, theme.palette.chordDiagram.main);
        } else {
            drawMuteStringMark(ctx, canvasSize, string, theme.palette.chordDiagram.main);
        }
    });
};
