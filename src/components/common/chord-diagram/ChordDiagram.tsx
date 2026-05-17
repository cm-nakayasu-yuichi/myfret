import { useEffect, useRef } from 'react';
import { drawDiagram } from './drawing-main';
import { ChordPosition } from '../../../data/chord';
import { useTheme } from '@mui/material';
import { useThemeContext } from '../../../contexts/theme/ThemeContext';

interface Props {
    position: ChordPosition
}

export const ChordDiagram = ({ position }: Props) => {
    // 幅に対して減らす高さ
    const PADDING_BOTTOM = 34;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { mode } = useThemeContext();
    const theme = useTheme();

    const reloadDiagram = (position: ChordPosition) => {
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

        drawDiagram(position, ctx, width, height, theme);
    }

    useEffect(() => {
        reloadDiagram(position);
    }, [position]);

    useEffect(() => {
        reloadDiagram(position);
    }, [mode]);

    return (
        <div ref={containerRef}>
            <canvas
                ref={canvasRef}
            />
        </div>
    );
}