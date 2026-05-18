import { SongListResponse } from "../types";
import { getArtist } from "../api";
import { useApi } from "./useApi";

export const useGetSongsOfArtist = (name: string) =>
    useApi<SongListResponse>(() => getArtist(name), [name]);
