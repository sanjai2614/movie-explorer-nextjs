import type { MoviesResponse } from "@/lib/type";

export type GetMoviesParams = {
  search?: string;
  page?: number;
  genre?: string;
  year?: string;
  rating?: string;
  sort?: string;
  language?: string;
};

export async function getMovies(
  params: GetMoviesParams
): Promise<MoviesResponse> {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  searchParams.set("page", String(params.page || 1));

  if (params.genre) {
    searchParams.set("genre", params.genre);
  }

  if (params.year) {
    searchParams.set("year", params.year);
  }

  if (params.rating) {
    searchParams.set("rating", params.rating);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params.language) {
    searchParams.set("language", params.language);
  }

  const response = await fetch(
    `/api/movies?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}