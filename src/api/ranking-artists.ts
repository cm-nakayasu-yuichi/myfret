import axios from "axios";
import { ArtistListResponse } from "../types";

export const rankingArtists = async (): Promise<ArtistListResponse> => {
    const response = await axios.get<ArtistListResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/api/ranking/artists/`
    );
    return response.data;
};
