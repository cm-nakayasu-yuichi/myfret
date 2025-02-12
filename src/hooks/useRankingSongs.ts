import { useState, useEffect } from "react";
import { SongListResponse } from "../types";
import {
    CacheDuration,
    CacheKey,
    CacheManager,
} from "../utils/classes/CacheManager";
import { rankingSongs } from "../api";

const cacheManager = new CacheManager(CacheDuration.WEEK);

export const useRankingSongs = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SongListResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // キャッシュをチェック
                const cachedData = cacheManager.get<SongListResponse>(
                    CacheKey.RANKING_SONGS,
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
                const response = await rankingSongs();
                // データをキャッシュ
                cacheManager.set(CacheKey.RANKING_SONGS, response);

                setError(null);
                setResult(response);
            } catch (error) {
                setError("");
                console.log("useRankingSongs error:", error);
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
