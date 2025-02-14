import { HomeInfoResponse } from "../../../types";
import { SectionTitle } from "../../common/section-title";
import { ListContainer } from "../../layouts/list-container";
import { NormalList } from "../../common/list";
import { MoreListItem, NormalListItem } from "../../common/list-item";
import { RankingNumber } from "../../common/ranking-number";
import { SongListText } from "../../common/list-text";

interface HomeSongRankingSectionProps {
    loading: boolean
    error: string | null;
    result: HomeInfoResponse | null;
}

export const HomeSongRankingSection = ({ loading, error, result }: HomeSongRankingSectionProps) => {
    return (
        <>
            <SectionTitle>楽曲ランキング</SectionTitle>
            <ListContainer
                loading={loading}
                empty={(result?.song_ranking.length ?? 0) <= 0}
                error={error}
            >
                <NormalList>
                    {result?.song_ranking.map((song, index) => (
                        <NormalListItem
                            index={index}
                            key={song.id}
                            to={`/song/${song.id}`}
                        >
                            <RankingNumber rank={song.rank} />
                            <SongListText song={song} />
                        </NormalListItem>
                    ))}
                    <MoreListItem to="/ranking/songs" />
                </NormalList>
            </ListContainer>
        </>
    );
}