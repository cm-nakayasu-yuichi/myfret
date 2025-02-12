import axios from "axios";
import { SongListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";

export const searchSongs = async (
    keyword: string,
): Promise<SongListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    const response = await axios.get<SongListResponse>(
        `http://localhost:3001/api/search/songs/${encodedKeyword}`,
    );
    return response.data;
};
