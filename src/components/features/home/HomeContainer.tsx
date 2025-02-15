import { Grid } from "@mui/material";

interface HomeContainerProps {
    song: React.ReactNode;
    artist: React.ReactNode;
}

export const HomeContainer = ({ song, artist }: HomeContainerProps) => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                {song}
            </Grid>
            <Grid item xs={12} md={6}>
                {artist}
            </Grid>
        </Grid>
    );
}