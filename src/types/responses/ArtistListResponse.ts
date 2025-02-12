import { ArtistListItem } from "../ArtistListItem";

export interface ArtistListResponse {
    artists: ArtistListItem[];
    count: number;
}
