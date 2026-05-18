import { useEffect, useState } from "react";
import { APIState } from "../types";
import { CacheManager } from "../utils/classes/CacheManager";

interface UseApiOptions {
    cache?: CacheManager;
    cacheKey?: string;
    beforeFetch?: () => void;
}

export function useApi<T>(
    fetcher: () => Promise<T>,
    deps: unknown[],
    options: UseApiOptions = {},
): APIState<T> {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<T | null>(null);

    useEffect(() => {
        const run = async () => {
            try {
                if (options.cache && options.cacheKey) {
                    const cached = options.cache.get<T>(options.cacheKey);
                    if (cached) {
                        setError(null);
                        setResult(cached);
                        setLoading(false);
                        return;
                    }
                    options.beforeFetch?.();
                }

                setLoading(true);
                setError(null);
                const data = await fetcher();
                if (options.cache && options.cacheKey) {
                    options.cache.set(options.cacheKey, data);
                }
                setResult(data);
            } catch (e) {
                setError("");
                console.log("useApi error:", e);
            } finally {
                setLoading(false);
            }
        };
        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { loading, error, result };
}
