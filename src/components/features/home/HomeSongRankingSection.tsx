import { APIState, HomeInfoResponse } from "../../../types";
import { SectionTitle } from "../../common/section-title";
import { ListContainer } from "../../layouts/list-container";
import { NormalList } from "../../common/list";
import { MoreListItem, NormalListItem } from "../../common/list-item";
import { RankingNumber } from "../../common/ranking-number";
import { SongListText } from "../../common/list-text";

interface HomeSongRankingSectionProps {
    state: APIState<HomeInfoResponse>;
}

export const HomeSongRankingSection = ({ state }: HomeSongRankingSectionProps) => {
    return (
        <>
            <SectionTitle>楽曲ランキング</SectionTitle>
            <ListContainer
                loading={state.loading}
                empty={(state.result?.song_ranking.length ?? 0) <= 0}
                error={state.error}
            >
                <NormalList>
                    {state.result?.song_ranking.map((song, index) => (
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