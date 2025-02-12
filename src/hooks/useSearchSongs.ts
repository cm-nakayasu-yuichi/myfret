import { useState, useEffect } from "react";
import { SongListResponse } from "../types";
import { searchSongs } from "../api";

export const useSearchSongs = (keyword: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SongListResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await searchSongs(keyword);
                setResult(data);
            } catch (error) {
                setError("");
                console.log("useSearchSongs error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [keyword]);

    return {
        loading,
        error,
        result,
    };
};
