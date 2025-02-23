import { Box, CircularProgress, List, ListItem, Paper } from "@mui/material";
import { ReactNode } from "react";

interface ListContainerProps {
    children: ReactNode;
    empty: boolean;
    loading: boolean;
    error: string | null;
}

export const ListContainer = ({ children, empty, loading, error }: ListContainerProps) => {
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }
    if (empty) {
        return (
            <List sx={{ p: 0 }}>
                <ListItem
                    sx={{
                        bgcolor: "inherit",
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    取得に失敗しました
                </ListItem>
            </List>
        );
    }
    if (error) {
        return (
            <List sx={{ p: 0 }}>
                <ListItem
                    sx={{
                        bgcolor: "inherit",
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    取得に失敗しました
                </ListItem>
            </List>
        );
    }
    return (
        <Paper sx={{ mb: 2 }}>
            {children}
        </Paper>
    );
}