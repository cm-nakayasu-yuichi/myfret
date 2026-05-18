import { SongListResponse } from "../types";
import {
    CacheDuration,
    CacheKey,
    CacheManager,
} from "../utils/classes/CacheManager";
import { rankingSongs } from "../api";
import { useApi } from "./useApi";

const cacheManager = new CacheManager(CacheDuration.WEEK);

export const useRankingSongs = () =>
    useApi<SongListResponse>(rankingSongs, [], {
        cache: cacheManager,
        cacheKey: CacheKey.RANKING_SONGS,
        beforeFetch: () => cacheManager.remove(CacheKey.HOME_INFO),
    });
