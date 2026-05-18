import { ArtistListResponse } from "../types";
import { searchArtists } from "../api";
import { useApi } from "./useApi";

export const useSearchArtists = (keyword: string) =>
    useApi<ArtistListResponse>(() => searchArtists(keyword), [keyword]);
