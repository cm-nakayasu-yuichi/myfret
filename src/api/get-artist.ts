import axios from "axios";
import { SongListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";

export const getArtist = async (keyword: string): Promise<SongListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    const response = await axios.get<SongListResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/api/artist/${encodedKeyword}`
    );
    return response.data;
};
