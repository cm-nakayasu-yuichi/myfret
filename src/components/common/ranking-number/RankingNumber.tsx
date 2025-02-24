import { Avatar, useTheme } from '@mui/material';

interface RankingNumberProps {
    rank: number;
}

export const RankingNumber = ({ rank }: RankingNumberProps) => {
    const theme = useTheme();

    // ランクに応じた文字色を取得
    const getColor = (rank: number) => {
        switch (rank) {
            case 1: return theme.palette.rankingNumber.gold.text;
            case 2: return theme.palette.rankingNumber.silver.text;
            case 3: return theme.palette.rankingNumber.bronze.text;
            default: return theme.palette.rankingNumber.other.text;
        }
    };

    // ランクに応じた背景色を取得
    const getBgColor = (rank: number) => {
        switch (rank) {
            case 1: return theme.palette.rankingNumber.gold.background;
            case 2: return theme.palette.rankingNumber.silver.background;
            case 3: return theme.palette.rankingNumber.bronze.background;
            default: return theme.palette.rankingNumber.other.background;
        }
    };

    // スタイルを生成する関数
    const getStyles = (rank: number) => ({
        width: 24,
        height: 24,
        mr: 2,
        bgcolor: getBgColor(rank),
        color: getColor(rank),
        fontWeight: rank <= 3 ? 'bold' : 'normal',
        fontSize: `${24 * 0.75 / 24}rem`,
    });

    return (
        <Avatar sx={getStyles(rank)}>
            {rank}
        </Avatar>
    );
};