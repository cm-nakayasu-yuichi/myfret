import axios from "axios";
import { ArtistListResponse } from "../types";
import { encodeURIWithPlus } from "../utils/encodeURIWithPlus";

export const searchArtists = async (
    keyword: string
): Promise<ArtistListResponse> => {
    const encodedKeyword = encodeURIWithPlus(keyword);
    const response = await axios.get<ArtistListResponse>(
        `${
            import.meta.env.VITE_API_BASE_URL
        }/api/search/artists/${encodedKeyword}`
    );
    return response.data;
};
