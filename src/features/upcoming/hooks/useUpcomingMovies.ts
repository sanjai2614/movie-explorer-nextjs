import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/upcomingApi";

export function useUpcomingMovies() {
  return useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: getUpcomingMovies,
  });
}