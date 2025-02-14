import { useParams } from "react-router-dom";
import {
    Container,
} from "@mui/material";
import { ListContainer } from "../../components/common";
import { NormalListItem } from "../../components/common/list-item";
import { ArtistListText } from "../../components/common/list-text";
import { PaginatedList } from "../../components/common/paginated-list";
import { SectionTitle } from "../../components/common/section-title";
import { useSearchArtists } from "../../hooks/useSearchArtists";
import { usePagination } from "../../hooks/usePagination";

export const SearchArtistsRoute = () => {
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
        <Container sx={{ my: 4 }}>
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
        </Container>
    );
};
