import { SongListItem } from "../SongListItem";

export interface SongListResponse {
    songs: SongListItem[];
    count: number;
}
