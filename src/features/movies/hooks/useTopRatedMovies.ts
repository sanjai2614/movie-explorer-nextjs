import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/topRatedApi";

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: getTopRatedMovies,
  });
}