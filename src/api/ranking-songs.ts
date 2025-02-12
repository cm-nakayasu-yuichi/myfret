import { SongListResponse } from "../types";
import { apiClient } from "./client";

export const rankingSongs = async (): Promise<SongListResponse> => {
    return await apiClient.get<SongListResponse>(`/api/ranking/songs/`);
};
