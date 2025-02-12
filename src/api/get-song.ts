import axios from "axios";
import { SongResponse } from "../types";

export const getSong = async (id: string): Promise<SongResponse> => {
    const response = await axios.get<SongResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/api/song/${id}`
    );
    return response.data;
};
