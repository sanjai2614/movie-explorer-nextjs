"use client";

import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/Searchbar";
import GenreFilter from "@/components/GenreFilter";
import MovieFilters from "@/components/MovieFilters";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

import { useMovies } from "@/features/movies/hooks/useMovies";
import MovieSkeletonGrid from "../MovieSkeletonGrid";

export default function MoviesClient() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const genre = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";
  const rating = searchParams.get("rating") || "";
  const sort = searchParams.get("sort") || "popularity.desc";
  const language = searchParams.get("language") || "";

  const { data, isLoading, isError } = useMovies({
    search,
    page,
    genre,
    year,
    rating,
    sort,
    language,
  });

  const movies = data?.results ?? [];
  console.log(movies);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-375 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ================= TOP HEADER ================= */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-red-500">
              Movie Explorer
            </p>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Discover Movies
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Explore movies, genres and ratings.
            </p>
          </div>

          {/* Small Search */}
          <div className="w-full sm:w-75 lg:w-85">
            <SearchBar />
          </div>
        </div>

        {/* ================= FILTER / GENRE BAR ================= */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#0b0b0b] p-3 sm:p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* GENRES - LEFT */}
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2 px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Genres
                </span>
              </div>

              <GenreFilter />
            </div>

            {/* FILTERS - RIGHT */}
            <div className="shrink-0 lg:border-l lg:border-white/10 lg:pl-4">
              <MovieFilters />
            </div>
          </div>
        </div>

        {/* ================= RESULT INFO ================= */}
        {!isLoading && !isError && movies.length > 0 && (
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">Movies</h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Showing results from page {page}
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-gray-500">
              {movies.length} results
            </div>
          </div>
        )}

        {/* ================= LOADING ================= */}
        {isLoading && <MovieSkeletonGrid />}

        {/* ================= ERROR ================= */}
        {isError && (
          <div className="flex min-h-100 items-center justify-center">
            <div className="max-w-sm rounded-2xl border border-red-500/20 bg-red-500/5 px-8 py-10 text-center">
              <div className="mb-4 text-3xl">⚠️</div>

              <h2 className="text-lg font-semibold">Unable to load movies</h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Something went wrong while loading the movies. Please try again.
              </p>
            </div>
          </div>
        )}

        {/* ================= NO RESULTS ================= */}
        {!isLoading && !isError && movies.length === 0 && (
          <div className="flex min-h-100 items-center justify-center">
            <div className="max-w-sm text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/4 text-2xl">
                🎬
              </div>

              <h2 className="text-xl font-semibold">No movies found</h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Try searching for another movie or change your filters to
                discover something new.
              </p>
            </div>
          </div>
        )}

        {/* ================= MOVIES ================= */}
        {!isLoading && !isError && movies.length > 0 && (
          <>
            <div
              className="
                grid
                grid-cols-1
                gap-x-3
                gap-y-7
                sm:grid-cols-2
                sm:gap-x-4
                sm:gap-y-8
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
              "
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    year: Number(movie.release_date?.slice(0, 4)) || 0,
                    rating: Number(movie.vote_average.toFixed(1)),
                    poster_path: movie.poster_path,
                  }}
                />
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <Pagination
                page={page}
                search={search}
                genre={genre}
                year={year}
                rating={rating}
                sort={sort}
                language={language}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
