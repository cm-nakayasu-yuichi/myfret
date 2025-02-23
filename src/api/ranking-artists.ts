import { ArtistListResponse } from "../types";
import { apiClient } from "./client";

export const rankingArtists = async (): Promise<ArtistListResponse> => {
    return await apiClient.get<ArtistListResponse>(`/api/ranking/artists/`);
};
