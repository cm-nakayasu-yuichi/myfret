import { useState, useEffect } from "react";
import { HomeInfoResponse } from "../types";
import {
    CacheDuration,
    CacheKey,
    CacheManager,
} from "../utils/classes/CacheManager";
import { getHomeInfo } from "../api/";

const cacheManager = new CacheManager(CacheDuration.WEEK);

export const useGetHomeInfo = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<HomeInfoResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // キャッシュをチェック
                const cachedData = cacheManager.get<HomeInfoResponse>(
                    CacheKey.HOME_INFO
                );
                if (cachedData) {
                    setError(null);
                    setResult(cachedData);
                    setLoading(false);
                    return;
                }

                setLoading(true);

                // キャッシュがない場合やキャッシュが古い場合は新しいデータを取得
                const response = await getHomeInfo();
                // データをキャッシュ
                cacheManager.set(CacheKey.HOME_INFO, response);

                setError(null);
                setResult(response);
            } catch (error) {
                setError("");
                console.log("useGetHomeInfo error:", error);
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
