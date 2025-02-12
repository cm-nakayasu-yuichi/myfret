import { Typography } from "@mui/material";
import { ArtistListItem } from "../../../types";

interface ArtistListTextProps {
    artist: ArtistListItem
}

export const ArtistListText = ({ artist }: ArtistListTextProps) => {
    return(
        <Typography sx={{ fontWeight: "bold" }}>{artist.name}</Typography>
    );
}