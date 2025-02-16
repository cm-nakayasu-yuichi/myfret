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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
        }}>
            {/* ヘッダー部分 */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                bgcolor: 'primary.light'
            }}>
                <IconButton onClick={onPrevious} size="small">
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6">
                    {chordName}
                </Typography>
                <IconButton onClick={onNext} size="small">
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* ダイアグラム部分 */}
            <Box sx={{
                flex: 1,
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
            }}>
                <ChordDiagram />
            </Box>
        </Box>
    );
}