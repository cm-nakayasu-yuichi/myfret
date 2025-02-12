import axios from "axios";
import { ArtistListResponse } from "../types";

export const rankingArtists = async (): Promise<ArtistListResponse> => {
    const response = await axios.get<ArtistListResponse>(
        `http://localhost:3001/api/ranking/artists/`,
    );
    return response.data;
};
