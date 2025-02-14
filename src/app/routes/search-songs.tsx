// src/app/routes/SearchSongsRoute.tsx
import { useParams } from "react-router-dom";
import {
    List,
} from "@mui/material";
import { useSearchSongs } from "../../hooks/useSearchSongs";
import { ListContainer } from "../../components/layouts/list-container";
import { NormalListItem } from "../../components/common/list-item";
import { SongListText } from "../../components/common/list-text";
import { SectionTitle } from "../../components/common/section-title";
import { PageContainer } from "../../components/layouts/page-container";

export const SearchSongsRoute = () => {
    const { keyword = "" } = useParams<{ keyword: string }>();
    const { loading, error, result } = useSearchSongs(keyword);

    return (
        <PageContainer>
            <SectionTitle total={result?.count}>楽曲ランキング</SectionTitle>
            <ListContainer
                empty={(result?.songs.length ?? 0) <= 0}
                error={error}
                loading={loading}
            >
                <List sx={{ p: 0 }}>
                    {result?.songs.map((song, index) => (
                        <NormalListItem
                            index={index}
                            key={song.id}
                            to={`/song/${song.id}`}
                        >
                            <SongListText song={song} />
                        </NormalListItem>
                    ))}
                </List>
            </ListContainer>
        </PageContainer>
    );
};
