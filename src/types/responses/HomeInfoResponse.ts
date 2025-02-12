import { SongListItem } from "../SongListItem";
import { ArtistListItem } from "../ArtistListItem";

export interface HomeInfoResponse {
    song_ranking: SongListItem[];
    artist_ranking: ArtistListItem[];
}
