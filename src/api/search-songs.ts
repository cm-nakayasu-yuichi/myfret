import { SongListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";
import { apiClient } from "./client";

export const searchSongs = async (
    keyword: string
): Promise<SongListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    return await apiClient.get<SongListResponse>(
        `/api/search/songs/${encodedKeyword}`
    );
};
