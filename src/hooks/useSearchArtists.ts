import { useState, useEffect } from "react";
import { ArtistListResponse } from "../types";
import { searchArtists } from "../api";

export const useSearchArtists = (keyword: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ArtistListResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await searchArtists(keyword);
                setResult(data);
            } catch (error) {
                setError("");
                console.log("useSearchArtists error:", error);
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