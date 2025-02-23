// src/app/routes/SearchSongsRoute.tsx
import { useParams } from "react-router-dom";
import { useSearchSongs } from "../../hooks/useSearchSongs";
import { ListContainer } from "../../components/layouts/list-container";
import { NormalListItem } from "../../components/common/list-item";
import { SongListText } from "../../components/common/list-text";
import { SectionTitle } from "../../components/common/section-title";
import { PageContainer } from "../../components/layouts/page-container";
import { NormalList } from "../../components/common/list";

export const SearchSongsPage = () => {
    const { keyword = "" } = useParams<{ keyword: string }>();
    const { loading, error, result } = useSearchSongs(keyword);

    return (
        <PageContainer>
            <SectionTitle total={result?.count}>楽曲名 "{keyword}" の検索結果</SectionTitle>
            <ListContainer
                empty={(result?.songs.length ?? 0) <= 0}
                error={error}
                loading={loading}
            >
                <NormalList>
                    {result?.songs.map((song, index) => (
                        <NormalListItem
                            index={index}
                            key={song.id}
                            to={`/song/${song.id}`}
                        >
                            <SongListText song={song} />
                        </NormalListItem>
                    ))}
                </NormalList>
            </ListContainer>
        </PageContainer>
    );
};
