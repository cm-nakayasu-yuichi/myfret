import { HomeInfoResponse } from "../types";
import {
    CacheDuration,
    CacheKey,
    CacheManager,
} from "../utils/classes/CacheManager";
import { getHomeInfo } from "../api/";
import { useApi } from "./useApi";

const cacheManager = new CacheManager(CacheDuration.WEEK);

export const useGetHomeInfo = () =>
    useApi<HomeInfoResponse>(getHomeInfo, [], {
        cache: cacheManager,
        cacheKey: CacheKey.HOME_INFO,
    });
