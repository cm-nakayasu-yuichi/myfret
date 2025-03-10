import { useParams } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { useRankingArtists } from "../../hooks/useRankingArtists";
import { RankingNumber } from "../../components/common/ranking-number";
import { ListContainer } from "../../components/layouts/list-container";
import { NormalListItem } from "../../components/common/list-item";
import { ArtistListText } from "../../components/common/list-text";
import { PaginatedList } from "../../components/common/list";
import { SectionTitle } from "../../components/common/section-title";
import { PageContainer } from "../../components/layouts/page-container";

export const RankingArtistsPage = () => {
    const { page } = useParams<{ page?: string }>();
    const { loading, error, result } = useRankingArtists();
    const {
        currentItems: currentArtists,
        currentPage,
        totalPages,
        handlePageChange,
    } = usePagination(result?.artists || [], {
        itemsPerPage: 20,
        baseUrl: "/ranking/artists/",
        currentUrlPage: page,
    });

    return (
        <PageContainer>
            <SectionTitle total={result?.count}>アーティストランキング</SectionTitle>
            <ListContainer
                empty={(result?.artists.length ?? 0) <= 0}
                loading={loading}
                error={error}
            >
                <PaginatedList
                    items={currentArtists}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    baseUrl="/ranking/artists/"
                    renderItem={(artist, index) => (
                        <NormalListItem
                            index={index}
                            key={artist.id}
                            to={`/artist/${artist.id}`}
                        >
                            <RankingNumber rank={artist.rank} />
                            <ArtistListText artist={artist} />
                        </NormalListItem>
                    )}
                />
            </ListContainer>
        </PageContainer>
    );
};
