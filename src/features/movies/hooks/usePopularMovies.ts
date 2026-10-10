import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/popularApi";

export function usePopularMovies() {
  return useQuery({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies,
  });
}