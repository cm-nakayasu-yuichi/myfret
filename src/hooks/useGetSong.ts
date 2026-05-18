import { SongResponse } from "../types";
import { getSong } from "../api";
import { useApi } from "./useApi";

export const useGetSong = (id: string) =>
    useApi<SongResponse>(() => getSong(id), [id]);
