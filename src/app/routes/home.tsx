import { useGetHomeInfo } from "../../hooks/useGetHomeInfo";
import {
    Container,
    List,
    Grid,
} from "@mui/material";
import {
    MoreListItem,
    ListContainer,
    NormalListItem,
    ArtistListText,
    SongListText,
} from "../../components/common";
import { RankingNumber } from "../../components/common/ranking-number";
import { SectionTitle } from "../../components/common/section-title";

export const HomeRoute = () => {
    const { loading, error, result } = useGetHomeInfo();

    return (
        <Container sx={{ my: 4 }}>
            <Grid container spacing={4}>
                {/* 曲ランキング */}
                <Grid item xs={12} md={6}>
                    <SectionTitle>曲ランキング</SectionTitle>
                    <ListContainer
                        loading={loading}
                        empty={(result?.song_ranking.length ?? 0) <= 0}
                        error={error}
                    >
                        <List sx={{ p: 0 }}>
                            {result?.song_ranking.map((song, index) => (
                                <NormalListItem
                                    index={index}
                                    key={song.id}
                                    to={`/song/${song.id}`}
                                >
                                    <RankingNumber rank={song.rank} />
                                    <SongListText song={song} />
                                </NormalListItem>
                            ))}
                            <MoreListItem to="/ranking/songs" />
                        </List>
                    </ListContainer>
                </Grid>

                {/* アーティストランキング */}
                <Grid item xs={12} md={6}>
                    <SectionTitle>アーティストランキング</SectionTitle>
                    <ListContainer
                        loading={loading}
                        empty={(result?.artist_ranking.length ?? 0) <= 0}
                        error={error}
                    >
                        <List sx={{ p: 0 }}>
                            {result?.artist_ranking.map((artist, index) => (
                                <NormalListItem
                                    index={index}
                                    key={artist.id}
                                    to={`/artist/${artist.id}`}
                                >
                                    <RankingNumber rank={artist.rank} />
                                    <ArtistListText artist={artist} />
                                </NormalListItem>
                            ))}
                            <MoreListItem to="/ranking/artists" />
                        </List>
                    </ListContainer>
                </Grid>
            </Grid>
        </Container>
    );
};
