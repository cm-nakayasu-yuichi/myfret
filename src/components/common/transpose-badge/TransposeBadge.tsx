import { Box, Theme, SxProps } from "@mui/material";
import { StandardCSSProperties } from "@mui/system";

interface Props<T extends number> {
    bgcolor: StandardCSSProperties['backgroundColor'];
    value: T;
    getText: (value: T) => string | null;
    sx?: SxProps<Theme>;
}

export const TransposeBadge = <T extends number>({
    bgcolor,
    value,
    getText,
    sx
}: Props<T>) => {
    const text = getText(value)
    if (!text) return null;

    return (
        <Box
            sx={{
                bgcolor: bgcolor,
                color: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem',
                lineHeight: 1,
                ...sx
            }}
        >
            {text}
        </Box>
    );
}