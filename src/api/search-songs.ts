import axios from "axios";
import { SongListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";

export const searchSongs = async (
    keyword: string
): Promise<SongListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    const response = await axios.get<SongListResponse>(
        `${
            import.meta.env.VITE_API_BASE_URL
        }/api/search/songs/${encodedKeyword}`
    );
    return response.data;
};
