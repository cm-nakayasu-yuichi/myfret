import { useParams } from "react-router-dom";
import {
    Container,
} from "@mui/material";
import { 
    ListContainer, 
    SectionTitle,
    RankingNumber,
    NormalListItem,
    SongListText,
    PaginatedList,
} from "../../components/common";
import { usePagination } from "../../hooks/usePagination";
import { useRankingSongs } from "../../hooks/useRankingSongs";

export const RankingSongsRoute = () => {
    const { page } = useParams<{ page?: string }>();
    const { loading, error, result } = useRankingSongs();
    const {
        currentItems: currentArtists,
        currentPage,
        totalPages,
        handlePageChange,
    } = usePagination(result?.songs || [], {
        itemsPerPage: 20,
        baseUrl: "/ranking/songs/",
        currentUrlPage: page,
    });

    return (
        <Container sx={{ my: 4 }}>
            <SectionTitle>楽曲ランキング</SectionTitle>
            <ListContainer
                empty={(result?.songs.length ?? 0) <= 0}
                error={error}
                loading={loading}
            >
                <PaginatedList
                    items={currentArtists}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    baseUrl="/ranking/songs/"
                    renderItem={(song, index) => (
                        <NormalListItem
                            index={index}
                            key={song.id}
                            to={`/song/${song.id}`}
                        >
                            <RankingNumber rank={song.rank} />
                            <SongListText song={song} />
                        </NormalListItem>
                    )}
                />
            </ListContainer>
        </Container>
    );
};
