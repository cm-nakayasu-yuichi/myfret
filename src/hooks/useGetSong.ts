import { useState, useEffect } from "react";
import { SongResponse } from "../types";
import { getSong } from "../api";

export const useGetSong = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SongResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getSong(id);
                setResult(data);
            } catch (error) {
                setError("");
                console.log("useGetSong error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return {
        loading,
        error,
        result,
    };
};
