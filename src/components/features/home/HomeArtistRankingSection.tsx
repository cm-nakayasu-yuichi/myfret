import { HomeInfoResponse } from "../../../types";
import { SectionTitle } from "../../common/section-title";
import { ListContainer } from "../../layouts/list-container";
import { NormalList } from "../../common/list";
import { MoreListItem, NormalListItem } from "../../common/list-item";
import { RankingNumber } from "../../common/ranking-number";
import { ArtistListText } from "../../common/list-text";

interface HomeArtistRankingSectionProps {
    loading: boolean
    error: string | null;
    result: HomeInfoResponse | null;
}

export const HomeArtistRankingSection = ({ loading, error, result }: HomeArtistRankingSectionProps) => {
    return (
        <>
            <SectionTitle>アーティストランキング</SectionTitle>
            <ListContainer
                loading={loading}
                empty={(result?.artist_ranking.length ?? 0) <= 0}
                error={error}
            >
                <NormalList>
                    {result?.artist_ranking.map((artist, index) => (
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