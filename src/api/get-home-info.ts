import axios from "axios";
import { HomeInfoResponse } from "../types";

export const getHomeInfo = async (): Promise<HomeInfoResponse> => {
    const response = await axios.get<HomeInfoResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/api/home-info`
    );
    return response.data;
};
