import axios from "axios";
import { SongListResponse } from "../types";

export const rankingSongs = async (): Promise<SongListResponse> => {
    const response = await axios.get<SongListResponse>(
        `http://localhost:3001/api/ranking/songs/`,
    );
    return response.data;
};
