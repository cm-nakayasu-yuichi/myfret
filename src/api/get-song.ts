import { SongResponse } from "../types";
import { apiClient } from "./client";

export const getSong = async (id: string): Promise<SongResponse> => {
    return await apiClient.get<SongResponse>(`/api/song/${id}`);
};
