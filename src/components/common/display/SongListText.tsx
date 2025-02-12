import { Box, Typography } from "@mui/material";
import { SongListItem } from "../../../types";

interface SongListTextProps {
    song: SongListItem
}

export const SongListText = ({ song }:SongListTextProps) => {
    return(
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Typography
                sx={{ fontWeight: "bold" }}
            >
                {song.name}
            </Typography>
            <Typography
                sx={{
                    color: "text.secondary",
                    mx: 1,
                    fontSize: "0.875rem",
                }}
            >
                -
            </Typography>
            <Typography
                sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                }}
            >
                {song.artist}
            </Typography>
        </Box>
    );
}