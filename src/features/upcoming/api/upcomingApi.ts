import type { Movie } from "@/lib/type";

export type UpcomingResponse = {
  results: Movie[];
};

export async function getUpcomingMovies(): Promise<UpcomingResponse> {
  const response = await fetch("/api/upcoming");

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }

  return response.json();
}