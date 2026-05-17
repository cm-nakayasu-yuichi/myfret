import { Box, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface SectionTitleProps {
    children: ReactNode;
    total?: number;
}

export const SectionTitle = ({ children, total }: SectionTitleProps) => {
    const theme = useTheme();

    if (total) {
        // 件数がある場合
        return(
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 4,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        borderLeft: 4,
                        borderColor: theme.palette.accent,
                        pl: 2,
                    }}
                >
                    {children}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        fontWeight: "light",
                    }}
                >
                    全 {total} 件
                </Typography>
            </Box>
        )
    } else {
        // 件数がない場合
        return(
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    borderLeft: 4,
                    borderColor: theme.palette.accent,
                    pl: 2,
                    mb: 3,
                }}
            >
                {children}
            </Typography>
        );
    }
}