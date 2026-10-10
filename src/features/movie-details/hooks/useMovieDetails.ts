import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movieDetailsApi";

export function useMovieDetails(id: string) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });
}