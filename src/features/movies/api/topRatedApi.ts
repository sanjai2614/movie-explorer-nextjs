import type { Movie } from "@/lib/type";

export type TopRatedMoviesResponse = {
  results: Movie[];
};

export async function getTopRatedMovies(): Promise<TopRatedMoviesResponse> {
  const response = await fetch("/api/top-rated");

  if (!response.ok) {
    throw new Error("Failed to fetch top rated movies");
  }

  return response.json();
}