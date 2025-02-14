import { Avatar } from '@mui/material';

interface RankingNumberProps {
    rank: number;
}

// 色の定義
const RANK_COLORS = {
    GOLD: '#FFD700',
    SILVER: '#C0C0C0',
    BRONZE: '#CD7F32',
    DEFAULT: '#EEEEEE'
} as const;

// ランクに応じた背景色を取得
const getBgColor = (rank: number) => {
    switch (rank) {
        case 1: return RANK_COLORS.GOLD;
        case 2: return RANK_COLORS.SILVER;
        case 3: return RANK_COLORS.BRONZE;
        default: return RANK_COLORS.DEFAULT;
    }
};

// スタイルを生成する関数
const getStyles = (rank: number) => ({
    width: 24,
    height: 24,
    mr: 2,
    bgcolor: getBgColor(rank),
    color: rank <= 3 ? 'black' : 'inherit',
    fontWeight: rank <= 3 ? 'bold' : 'normal',
    fontSize: `${24 * 0.75 / 24}rem`,
});

export const RankingNumber = ({ rank }: RankingNumberProps) => {
    return (
        <Avatar sx={getStyles(rank)}>
            {rank}
        </Avatar>
    );
};