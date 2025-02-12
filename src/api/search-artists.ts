import { ArtistListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";
import { apiClient } from "./client";

export const searchArtists = async (
    keyword: string
): Promise<ArtistListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    return await apiClient.get<ArtistListResponse>(
        `/api/search/artists/${encodedKeyword}`
    );
};
