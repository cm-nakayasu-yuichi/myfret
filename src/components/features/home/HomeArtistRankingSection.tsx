import { APIState, HomeInfoResponse } from "../../../types";
import { SectionTitle } from "../../common/section-title";
import { ListContainer } from "../../layouts/list-container";
import { NormalList } from "../../common/list";
import { MoreListItem, NormalListItem } from "../../common/list-item";
import { RankingNumber } from "../../common/ranking-number";
import { ArtistListText } from "../../common/list-text";

interface HomeArtistRankingSectionProps {
    state: APIState<HomeInfoResponse>;
}

export const HomeArtistRankingSection = ({ state }: HomeArtistRankingSectionProps) => {
    return (
        <>
            <SectionTitle>アーティストランキング</SectionTitle>
            <ListContainer
                loading={state.loading}
                empty={(state.result?.artist_ranking.length ?? 0) <= 0}
                error={state.error}
            >
                <NormalList>
                    {state.result?.artist_ranking.map((artist, index) => (
                        <NormalListItem
                            index={index}
                            key={artist.id}
                            to={`/artist/${artist.id}`}
                        >
                            <RankingNumber rank={artist.rank} />
                            <ArtistListText artist={artist} />
                        </NormalListItem>
                    ))}
                    <MoreListItem to="/ranking/artists" />
                </NormalList>
            </ListContainer>
        </>
    );
}