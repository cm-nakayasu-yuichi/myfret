import { useGetHomeInfo } from "../../hooks/useGetHomeInfo";
import { HomeArtistRankingSection, HomeContainer, HomeSongRankingSection } from "../features/home";
import { PageContainer } from "../layouts/page-container";

export const HomePage = () => {
    const { loading, error, result } = useGetHomeInfo();

    return (
        <PageContainer>
            <HomeContainer
                song={<HomeSongRankingSection state={{ loading, error, result }} />}
                artist={<HomeArtistRankingSection state={{ loading, error, result }} />}
            />
        </PageContainer >
    );
}