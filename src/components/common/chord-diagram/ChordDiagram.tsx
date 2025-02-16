import { useEffect, useRef } from 'react';

interface Props {
    width?: number;
    height?: number;
}

export const ChordDiagram = ({ width = 200, height = 250 }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawDiagram = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, width, height);

        // 線の太さと色の設定
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';

        // 描画開始位置の設定
        const startX = 40;
        const startY = 40;
        const fretWidth = 30;
        const stringSpacing = 20;

        // フレット線（縦線）を描画
        for (let i = 0; i <= 5; i++) {
            const x = startX + (i * fretWidth);
            ctx.beginPath();
            // 最初のフレットは二重線
            if (i === 0) {
                ctx.moveTo(x - 3, startY);
                ctx.lineTo(x - 3, startY + stringSpacing * 5);
            }
            ctx.moveTo(x, startY);
            ctx.lineTo(x, startY + stringSpacing * 5);
            ctx.stroke();
        }

        // 弦（横線）を描画
        for (let i = 0; i < 6; i++) {
            const y = startY + (i * stringSpacing);
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(startX + fretWidth * 5, y);
            ctx.stroke();
        }

        // 開放弦のマーク（○）を描画
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(startX - 15, startY + (i * stringSpacing), 5, 0, Math.PI * 2);
            ctx.strokeStyle = '#000';
            ctx.stroke();
        }

        // ポジション（黒丸）を描画
        const positions = [
            { string: 0, fret: 2 },  // 1弦3フレット
            { string: 3, fret: 1 },  // 4弦2フレット
            { string: 4, fret: 2 },  // 5弦3フレット
        ];

        positions.forEach(pos => {
            ctx.beginPath();
            ctx.arc(
                startX + (pos.fret - 0.5) * fretWidth,
                startY + pos.string * stringSpacing,
                8,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = '#000';
            ctx.fill();
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvasの解像度調整
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        drawDiagram(ctx);
    }, [width, height]);

    return <canvas ref={canvasRef} style={{ width, height }} />;
}