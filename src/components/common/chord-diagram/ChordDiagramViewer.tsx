import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { ChordDiagram } from "./ChordDiagram";

interface Props {
    chordName: string | null;
}

export const ChordDiagramViewer = ({ chordName }: Props) => {
    const prevHandler = () => {
        if (index - 1 < 0) {
            setIndex(positions.length - 1);
        } else {
            setIndex(index - 1);
        }
    };

    const nextHandler = () => {
        if (index + 1 >= positions.length) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

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
            }}>
                <IconButton onClick={prevHandler} size="small">
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6">
                    {chordName}
                </Typography>
                <IconButton onClick={nextHandler} size="small">
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