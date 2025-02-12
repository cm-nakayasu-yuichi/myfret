import { useState, useEffect } from "react";
import { SongListResponse } from "../types";
import { getArtist } from "../api";

export const useGetSongsOfArtsist = (name: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SongListResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getArtist(name);
                setResult(data);
            } catch (error) {
                setError("");
                console.log("useGetSongsOfArtsist error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [name]);

    return {
        loading,
        error,
        result,
    };
};
