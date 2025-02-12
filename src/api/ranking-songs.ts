import axios from "axios";
import { SongListResponse } from "../types";

export const rankingSongs = async (): Promise<SongListResponse> => {
    const response = await axios.get<SongListResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/api/ranking/songs/`
    );
    return response.data;
};
