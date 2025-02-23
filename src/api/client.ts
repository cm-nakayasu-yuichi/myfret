import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
    get: async <T>(path: string): Promise<T> => {
        const response = await axios.get<T>(`${API_BASE_URL}${path}`);
        return response.data;
    },
};
