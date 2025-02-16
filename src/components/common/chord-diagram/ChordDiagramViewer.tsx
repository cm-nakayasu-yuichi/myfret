import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { ChordDiagram } from "./ChordDiagram";

interface Props {
    chordName: string | null;
    onPrevious: () => void;
    onNext: () => void;
}

export const ChordDiagramViewer = ({
    chordName,
    onPrevious,
    onNext,
}: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {/* ヘッダー部分 */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2
            }}>
                <IconButton onClick={onPrevious}>
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6" component="div">
                    {chordName}
                </Typography>
                <IconButton onClick={onNext}>
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* ダイアグラム部分 */}
            <Box sx={{ flex: 1, position: 'relative', p: 2 }}>
                <ChordDiagram />
            </Box>
        </Box>
    );
}