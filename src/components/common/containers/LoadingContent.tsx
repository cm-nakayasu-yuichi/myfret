import { Box, CircularProgress } from "@mui/material";

export const LoadingContent = () => {
    return(
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
        </Box>
    );
}