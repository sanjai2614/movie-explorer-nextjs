export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
};

export type MovieCardMovie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  poster_path: string | null;
};

export type MovieCardProps = {
  movie: MovieCardMovie;
};

export type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};

export type MovieVideo = {
  key: string;
  site: string;
  type: string;
  name: string;
};

export type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export type Person = {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
};

export type FavoriteMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export type MoviesResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  status: string;
  original_language: string;
  budget: number;
  revenue: number;

  genres: {
    id: number;
    name: string;
  }[];

  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
};