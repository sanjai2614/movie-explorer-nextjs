import type { Movie } from "@/lib/type";

export type PopularMoviesResponse = {
  results: Movie[];
};

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
  const response = await fetch("/api/popular");

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
}