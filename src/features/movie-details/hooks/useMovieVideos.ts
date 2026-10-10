import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../api/movieVideosApi";

export function useMovieVideos(id: string) {
  return useQuery({
    queryKey: ["movie-videos", id],
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
  });
}