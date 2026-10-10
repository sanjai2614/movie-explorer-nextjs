import type {Actor, CrewMember, Movie, MovieDetails, MovieVideo, Person, SimilarMovie} from "./type";

const API_KEY = process.env.TMDB_API_KEY;

console.log("TMDB KEY EXISTS:", !!API_KEY);

const BASE_URL = process.env.BASE_URL;

async function fetchTMDB<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Connection: "close",
    },
  });

  if (!response.ok) {
    throw new Error(
      `TMDB API error: ${response.status}`
    );
  }

  return response.json();
}

export async function getMovies(
  search?: string,
  page = 1,
  genre?: string,
  year?: string,
  rating?: string,
  sort?: string,
  language?: string
): Promise<{
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}> {
  let endpoint = "";

  if (search) {
    const match = search.match(/^(.+?)\s+(\d{4})$/);

    const movieName = match ? match[1].trim() : search;
    const searchYear = match ? match[2] : year || "";

    endpoint =
      `${BASE_URL}/search/movie` +
      `?api_key=${API_KEY}` +
      `&query=${encodeURIComponent(movieName)}` +
      `&language=en-US` +
      `&page=${page}`;

    if (searchYear) {
      endpoint += `&primary_release_year=${searchYear}`;
    }
  } else {
    endpoint =
      `${BASE_URL}/discover/movie` +
      `?api_key=${API_KEY}` +
      `&language=en-US` +
      `&sort_by=${sort || "popularity.desc"}` +
      `&page=${page}`;

    if (genre) {
      endpoint += `&with_genres=${genre}`;
    }

    if (year) {
      endpoint += `&primary_release_year=${year}`;
    }

    if (rating) {
      endpoint += `&vote_average.gte=${rating}`;
    }

    if (language) {
      endpoint += `&with_original_language=${language}`;
    }
  }

  return fetchTMDB<{
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
  }>(endpoint);
}

export async function getMovie( id: string): Promise<MovieDetails> {
  const endpoint =
    `${BASE_URL}/movie/${id}` +
    `?api_key=${API_KEY}` +
    `&language=en-US`;

  return fetchTMDB<MovieDetails>(endpoint);
}

export async function getMovieCredits( id: string): Promise<{cast: Actor[];crew: CrewMember[];}> {
  const endpoint =
    `${BASE_URL}/movie/${id}/credits` +
    `?api_key=${API_KEY}` +
    `&language=en-US`;

  return fetchTMDB<{
    cast: Actor[];
    crew: CrewMember[];
  }>(endpoint);
}

export async function getMovieVideos( id: string): Promise<{ results: MovieVideo[];}> {
  const endpoint =
    `${BASE_URL}/movie/${id}/videos` +
    `?api_key=${API_KEY}` +
    `&language=en-US`;

  return fetchTMDB<{
    results: MovieVideo[];
  }>(endpoint);
}

export async function getSimilarMovies( id: string): Promise<{ results: SimilarMovie[];}> {
  const endpoint =
    `${BASE_URL}/movie/${id}/similar` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=1`;

  return fetchTMDB<{
    results: SimilarMovie[];
  }>(endpoint);
}

export async function getTrendingMovies(): Promise<{ results: Movie[];}> {
  const endpoint =
    `${BASE_URL}/trending/movie/week` +
    `?api_key=${API_KEY}`;

  return fetchTMDB<{
    results: Movie[];
  }>(endpoint);
}

export async function getUpcomingMovies(): Promise<{ results: Movie[];}> {
  const endpoint =
    `${BASE_URL}/movie/upcoming` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=1`;

  return fetchTMDB<{
    results: Movie[];
  }>(endpoint);
}

export async function getNowPlayingMovies(page: number = 1) {
  const endpoint =
    `${BASE_URL}/movie/now_playing` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=${page}`;

  return fetchTMDB<{
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }>(endpoint);
}

export async function getPerson( id: string): Promise<Person> {
  const endpoint =
    `${BASE_URL}/person/${id}` +
    `?api_key=${API_KEY}` +
    `&language=en-US`;

  return fetchTMDB<Person>(endpoint);
}

export async function getPopularMovies(): Promise<{results: Movie[];}> {
  const endpoint =
    `${BASE_URL}/movie/popular` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=1`;

  const data = await fetchTMDB<{
    results: Movie[];
  }>(endpoint);

  return {
    results: data.results.slice(0, 10),
  };
}

export async function getTopRatedMovies(): Promise<{results: Movie[];}> {
  const endpoint =
    `${BASE_URL}/movie/top_rated` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=1`;

  const data = await fetchTMDB<{
    results: Movie[];
  }>(endpoint);

  return {
    results: data.results.slice(0, 10),
  };
}