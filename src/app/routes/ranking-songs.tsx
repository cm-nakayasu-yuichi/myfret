import { useParams } from "react-router-dom";
import { ListContainer } from "../../components/layouts/list-container";
import { NormalListItem } from "../../components/common/list-item";
import { SongListText } from "../../components/common/list-text";
import { RankingNumber } from "../../components/common/ranking-number";
import { PaginatedList } from "../../components/common/list";
import { SectionTitle } from "../../components/common/section-title";
import { usePagination } from "../../hooks/usePagination";
import { useRankingSongs } from "../../hooks/useRankingSongs";
import { PageContainer } from "../../components/layouts/page-container";

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
        <PageContainer>
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
        </PageContainer>
    );
};
