import axios from "axios";
import { ArtistListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";

export const searchArtists = async (
    keyword: string,
): Promise<ArtistListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    const response = await axios.get<ArtistListResponse>(
        `http://localhost:3001/api/search/artists/${encodedKeyword}`,
    );
    return response.data;
};
