import { useQuery } from "@tanstack/react-query";
import {getMovies, type GetMoviesParams} from "../api/moviesApi";

export function useMovies(params: GetMoviesParams) {
  return useQuery({
    queryKey: [
      "movies",
      params.search,
      params.page,
      params.genre,
      params.year,
      params.rating,
      params.sort,
      params.language,
    ],
    queryFn: () => getMovies(params),
  });
}