import { useParams } from "react-router-dom";
import { ListContainer } from "../../components/layouts/list-container";
import { ListText } from "../../components/common/list-text";
import { NormalListItem } from "../../components/common/list-item";
import { PaginatedList } from "../../components/common/list";
import { SectionTitle } from "../../components/common/section-title";
import { usePagination } from "../../hooks/usePagination";
import { useGetSongsOfArtsist } from "../../hooks/useGetSongsOfArtsist";
import { PageContainer } from "../../components/layouts/page-container";

export const ArtistPage = () => {
    const { name = "", page } = useParams<{ name: string; page?: string }>();
    const { loading, error, result } = useGetSongsOfArtsist(name);
    const {
        currentItems: currentSongs,
        currentPage,
        totalPages,
        handlePageChange,
    } = usePagination(result?.songs || [], {
        itemsPerPage: 15,
        baseUrl: "/artist/",
        currentUrlPage: page,
        query: name,
    });

    return (
        <PageContainer>
            <SectionTitle total={result?.count}>{name}</SectionTitle>
            <ListContainer
                error={error}
                empty={(result?.songs.length ?? 0) <= 0}
                loading={loading}
            >
                <PaginatedList
                    items={currentSongs}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    baseUrl="/artist/"
                    query={name}
                    renderItem={(song, index) => (
                        <NormalListItem
                            index={index}
                            key={song.id}
                            to={`/song/${song.id}`}
                        >
                            <ListText text={song.name} />
                        </NormalListItem>
                    )}
                />
            </ListContainer>
        </PageContainer>
    );
};
