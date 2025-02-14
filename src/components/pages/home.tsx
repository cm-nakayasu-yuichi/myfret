import { useGetHomeInfo } from "../../hooks/useGetHomeInfo";
import { HomeArtistRankingSection, HomeContainer, HomeSongRankingSection } from "../features/home";
import { PageContainer } from "../layouts/page-container";

export const HomePage = () => {
    const { loading, error, result } = useGetHomeInfo();

    return (
        <PageContainer>
            <HomeContainer
                song={<HomeSongRankingSection
                    loading={loading}
                    error={error}
                    result={result}
                />}
                artist={<HomeArtistRankingSection
                    loading={loading}
                    error={error}
                    result={result}
                />}
            />
        </PageContainer >
    );
}