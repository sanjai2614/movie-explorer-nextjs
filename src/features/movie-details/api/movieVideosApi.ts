import type { MovieVideo } from "@/lib/type";

export type MovieVideosResponse = {
  results: MovieVideo[];
};

export async function getMovieVideos( id: string): Promise<MovieVideosResponse> {
  const response = await fetch(`/api/movies/${id}/videos`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos");
  }

  return response.json();
}