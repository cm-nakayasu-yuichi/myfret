import axios from "axios";
import { SongListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";

export const getArtist = async (keyword: string): Promise<SongListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    const response = await axios.get<SongListResponse>(
        `http://localhost:3001/api/artist/${encodedKeyword}`,
    );
    return response.data;
};
