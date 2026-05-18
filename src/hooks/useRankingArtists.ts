import { ArtistListResponse } from "../types";
import {
    CacheDuration,
    CacheKey,
    CacheManager,
} from "../utils/classes/CacheManager";
import { rankingArtists } from "../api";
import { useApi } from "./useApi";

const cacheManager = new CacheManager(CacheDuration.WEEK);

export const useRankingArtists = () =>
    useApi<ArtistListResponse>(rankingArtists, [], {
        cache: cacheManager,
        cacheKey: CacheKey.RANKING_ARTISTS,
        beforeFetch: () => cacheManager.remove(CacheKey.HOME_INFO),
    });
