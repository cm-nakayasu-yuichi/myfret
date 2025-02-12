import { useState, useEffect } from "react";
import { ArtistListResponse } from "../types";
import {
    CacheDuration,
    CacheKey,
    CacheManager,
} from "../utils/classes/CacheManager";
import { rankingArtists } from "../api";

const cacheManager = new CacheManager(CacheDuration.WEEK);

export const useRankingArtists = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ArtistListResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // キャッシュをチェック
                const cachedData = cacheManager.get<ArtistListResponse>(
                    CacheKey.RANKING_ARTISTS,
                );
                if (cachedData) {
                    setError(null);
                    setResult(cachedData);
                    setLoading(false);
                    return;
                }

                cacheManager.remove(CacheKey.HOME_INFO);
                setLoading(true);

                // キャッシュがない場合やキャッシュが古い場合は新しいデータを取得
                const response = await rankingArtists();
                // データをキャッシュ
                cacheManager.set(CacheKey.RANKING_ARTISTS, response);

                setError(null);
                setResult(response);
            } catch (error) {
                setError("");
                console.log("useRankingArtists error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return {
        loading,
        error,
        result,
    };
};
