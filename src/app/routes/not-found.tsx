import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFoundRoute = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Typography variant="h2">404</Typography>
            <Typography variant="h5">ページが見つかりません</Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
                ホームに戻る
            </Button>
        </Box>
    );
};
