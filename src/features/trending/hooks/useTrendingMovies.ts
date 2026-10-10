import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../api/trendingApi";

export function useTrendingMovies() {
  return useQuery({
    queryKey: ["trending-movies"],
    queryFn: getTrendingMovies,
  });
}