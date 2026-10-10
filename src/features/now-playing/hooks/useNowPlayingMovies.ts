import { useQuery } from "@tanstack/react-query";
import {
  getNowPlayingMovies,
  type NowPlayingMoviesResponse,
} from "../api/nowPlayingApi";

export function useNowPlayingMovies(page: number) {
  return useQuery<NowPlayingMoviesResponse>({
    queryKey: ["now-playing-movies", page],
    queryFn: () => getNowPlayingMovies(page),
  });
}