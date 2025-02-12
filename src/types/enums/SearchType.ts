import { SelectOption } from "../commons/SelectOption";

type SEARCH_TYPE_KEY = "SONG" | "ARTIST";

interface SEARCH_TYPE {
    key: string;
    label: string;
    buildUrl: (keyword: string) => string;
    placeholder: string;
}

const SEARCH_TYPES: Record<SEARCH_TYPE_KEY, SEARCH_TYPE> = {
    SONG: {
        key: "song",
        label: "曲名",
        buildUrl: (keyword: string) =>
            `/search/songs/${encodeURIComponent(keyword)}`,
        placeholder: "曲名を入力",
    },
    ARTIST: {
        key: "artist",
        label: "アーティスト名",
        buildUrl: (keyword: string) =>
            `/search/artists/${encodeURIComponent(keyword)}`,
        placeholder: "アーティスト名を入力",
    },
} as const;

const getSearchType = (type: string): SEARCH_TYPE | null => {
    switch (type) {
        case SEARCH_TYPES.SONG.key:
            return SEARCH_TYPES.SONG;
        case SEARCH_TYPES.ARTIST.key:
            return SEARCH_TYPES.ARTIST;
        default:
            return null;
    }
};

/**
 * 検索タイプのプレースホルダを取得する
 * @param type 検索タイプのキー
 * @returns プレースホルダ
 */
export const getSearchTypePlaceholder = (type: string): string => {
    return getSearchType(type)?.placeholder ?? "";
};

/**
 * 検索用のURLを取得する
 * @param keyword 検索キーワード
 * @param type 検索タイプのキー
 * @returns URL文字列
 */
export const getSearchUrl = (keyword: string, type: string): string => {
    return getSearchType(type)?.buildUrl(keyword) ?? "";
};

/**
 * 検索タイプの選択オプションを配列で取得する
 * @returns 検索タイプの選択オプションを配列
 */
export const getSearchTypeOptions = (): SelectOption[] => {
    return Object.values(SEARCH_TYPES).map((type) => ({
        value: type.key,
        label: type.label,
    }));
};
