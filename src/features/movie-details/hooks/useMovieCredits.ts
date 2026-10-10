import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/movieCreditsApi";

export function useMovieCredits(id: string) {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
}