import type { Movie } from "@/lib/type";

export type NowPlayingMoviesResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

export async function getNowPlayingMovies(
  page: number = 1
): Promise<NowPlayingMoviesResponse> {
  const response = await fetch(`/api/now-playing?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch now playing movies");
  }

  return response.json();
}