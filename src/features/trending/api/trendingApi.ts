import type { Movie } from "@/lib/type";

export type TrendingResponse = {
  results: Movie[];
};

export async function getTrendingMovies(): Promise<TrendingResponse> {
  const response = await fetch("/api/trending");

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return response.json();
}