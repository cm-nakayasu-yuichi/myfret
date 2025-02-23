import { HomeInfoResponse } from "../types";
import { apiClient } from "./client";

export const getHomeInfo = async (): Promise<HomeInfoResponse> => {
    return await apiClient.get<HomeInfoResponse>(`/api/home-info`);
};
