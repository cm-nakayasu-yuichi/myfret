import { Box, Paper, Typography } from "@mui/material";
import { ChordDiagramViewer } from "../../components/common/chord-diagram";

export const TestRoute = () => {

    return (
        <Paper
            sx={{
                width: 240,
                p: 2,
                borderRadius: 0,
                borderLeft: 1,
                borderColor: "divider",
                bgcolor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box
                    sx={{
                        width: "100%",
                        paddingBottom: "100%",
                        position: "relative",
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        mb: 1,
                    }}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}>
                        <ChordDiagramViewer
                            chordName='Am'
                            onNext={() => { }}
                            onPrevious={() => { }}
                        />
                    </Box>
                </Box>
                <Typography variant="caption" sx={{ textAlign: "center" }}>
                    コードをクリックすると、ここに押さえ方が表示されます
                </Typography>
            </Box>
        </Paper>
    );
};
