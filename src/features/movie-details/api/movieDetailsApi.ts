import type { MovieDetails } from "@/lib/type";

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await fetch(`/api/movies/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}