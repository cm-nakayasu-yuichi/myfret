import { useParams } from "react-router-dom";
import { ListContainer } from "../../components/layouts/list-container";
import { NormalListItem } from "../../components/common/list-item";
import { ArtistListText } from "../../components/common/list-text";
import { PaginatedList } from "../../components/common/list";
import { SectionTitle } from "../../components/common/section-title";
import { useSearchArtists } from "../../hooks/useSearchArtists";
import { usePagination } from "../../hooks/usePagination";
import { PageContainer } from "../../components/layouts/page-container";

export const SearchArtistsPage = () => {
    const { keyword = "", page } = useParams<{
        keyword: string;
        page?: string;
    }>();
    const { loading, error, result } = useSearchArtists(keyword);
    const {
        currentItems: currentArtists,
        currentPage,
        totalPages,
        handlePageChange,
    } = usePagination(result?.artists || [], {
        itemsPerPage: 15,
        baseUrl: "/search/artists/",
        currentUrlPage: page,
        query: keyword,
    });

    return (
        <PageContainer>
            <SectionTitle total={result?.artists.length}>アーティスト名 "{keyword}" の検索結果</SectionTitle>
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
                    baseUrl="/search/artists/"
                    query={keyword}
                    renderItem={(artist, index) => (
                        <NormalListItem
                            index={index}
                            key={artist.id}
                            to={`/artist/${artist.id}`}
                        >
                            <ArtistListText artist={artist} />
                        </NormalListItem>
                    )}
                />
            </ListContainer>
        </PageContainer>
    );
};
