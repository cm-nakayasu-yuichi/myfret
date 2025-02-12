interface CacheItem<T> {
    data: T;
    timestamp: number;
}

export const CacheKey = {
    HOME_INFO: "home_info_cache",
    RANKING_SONGS: "ranking_songs_cache",
    RANKING_ARTISTS: "ranking_artists_cache",
} as const;

export const CacheDuration = {
    WEEK: 7 * 24 * 60 * 60 * 1000, // 1週間
    DAY: 24 * 60 * 60 * 1000, // 1日
    HOUR: 60 * 60 * 1000, // 1時間
} as const;

export class CacheManager {
    private duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }

    get<T>(key: string): T | null {
        const cachedData = localStorage.getItem(key);
        if (!cachedData) return null;

        const { data, timestamp }: CacheItem<T> = JSON.parse(cachedData);

        // キャッシュが有効期限内かチェック
        if (Date.now() - timestamp < this.duration) {
            return data;
        }

        // 期限切れの場合はキャッシュを削除
        localStorage.removeItem(key);
        return null;
    }

    set<T>(key: string, data: T): void {
        const cacheData: CacheItem<T> = {
            data,
            timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
