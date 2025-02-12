import axios from "axios";
import { HomeInfoResponse } from "../types";

export const getHomeInfo = async (): Promise<HomeInfoResponse> => {
    const response = await axios.get<HomeInfoResponse>(
        `http://localhost:3001/api/home-info`,
    );
    return response.data;
};
