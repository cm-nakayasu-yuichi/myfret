import { useGetHomeInfo } from "../../hooks/useGetHomeInfo";
import { HomeArtistRankingSection, HomeContainer, HomeSongRankingSection } from "../features/home";
import { PageContainer } from "../layouts/page-container";

export const HomePage = () => {
    const state = useGetHomeInfo();

    return (
        <PageContainer>
            <HomeContainer
                song={<HomeSongRankingSection state={state} />}
                artist={<HomeArtistRankingSection state={state} />}
            />
        </PageContainer>
    );
}