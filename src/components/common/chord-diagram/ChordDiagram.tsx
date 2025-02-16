import { useEffect, useRef } from 'react';
import { drawBarre, drawFretNumber, drawFrets, drawMuteStringMark, drawOpenStringMark, drawPosition, drawStrings } from './utils';

interface Props {

}

export const ChordDiagram = ({ }: Props) => {
    // 幅に対して減らす高さ
    const PADDING_BOTTOM = 34;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const drawDiagram = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);
        const canvasSize = { w: width, h: height };

        drawStrings(ctx, canvasSize);
        drawFrets(ctx, canvasSize, false);

        drawBarre(ctx, canvasSize, 1, 1, 5);

        drawPosition(ctx, canvasSize, 2, 3);
        drawPosition(ctx, canvasSize, 3, 2);
        drawPosition(ctx, canvasSize, 4, 3);

        drawOpenStringMark(ctx, canvasSize, 0);
        drawMuteStringMark(ctx, canvasSize, 5);

        drawFretNumber(ctx, canvasSize, 5);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current
        if (!canvas || !container) return;

        // サイズを取得
        const width = container.clientWidth;
        const height = width - PADDING_BOTTOM;
        // コンテキスト作成
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvasの解像度調整
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        drawDiagram(ctx, width, height);
    }, []);

    return (
        <div ref={containerRef}>
            <canvas
                ref={canvasRef}
                style={{
                    // backgroundColor: 'rgb(200,200,200)'
                }}
            />
        </div>
    );
}