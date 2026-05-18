import { SongListResponse } from "../types";
import { searchSongs } from "../api";
import { useApi } from "./useApi";

export const useSearchSongs = (keyword: string) =>
    useApi<SongListResponse>(() => searchSongs(keyword), [keyword]);
