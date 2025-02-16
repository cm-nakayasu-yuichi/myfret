import { Box } from "@mui/material";
import { CapoValue, getCapoBadgeText } from "../../../types";

interface Props {
    capoValue: CapoValue;
}

export const CapoBadge = ({ capoValue }: Props) => {
    const text = getCapoBadgeText(capoValue)
    if (!text) return null;

    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem',
                lineHeight: 1,
            }}
        >
            {text}
        </Box>
    );
}