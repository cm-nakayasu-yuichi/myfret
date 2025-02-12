import axios from "axios";
import { SongResponse } from "../types";

export const getSong = async (id: string): Promise<SongResponse> => {
    const response = await axios.get<SongResponse>(
        `http://localhost:3001/api/song/${id}`,
    );
    return response.data;
};
