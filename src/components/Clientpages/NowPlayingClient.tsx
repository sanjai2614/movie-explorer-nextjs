"use client";

import { useSearchParams } from "next/navigation";

import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import MovieSkeletonGrid from "../MovieSkeletonGrid";

import { useNowPlayingMovies } from "@/features/now-playing/hooks/useNowPlayingMovies";

export default function NowPlayingClient() {
  const searchParams = useSearchParams();

  // Get current page from URL
  const page = Number(searchParams.get("page")) || 1;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useNowPlayingMovies(page);

  const movies = data?.results || [];

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <section className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12">

        {/* ================= HEADER ================= */}
        <div className="mb-7 sm:mb-9 lg:mb-10">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 sm:h-2 sm:w-2" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500 sm:text-xs">
              In Theaters
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Now Playing Movies
          </h1>

          <p className="mt-1.5 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
            Discover movies currently playing in theaters and find something
            exciting to watch.
          </p>
        </div>

        {/* ================= LOADING ================= */}
        {isLoading && (
          <div className="w-full">
            <MovieSkeletonGrid />
          </div>
        )}

        {/* ================= ERROR ================= */}
        {isError && (
          <div className="flex min-h-[350px] items-center justify-center px-4 sm:min-h-[450px]">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-9 text-center backdrop-blur-xl sm:px-8 sm:py-10">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
                ⚠️
              </div>

              <h2 className="mt-5 text-lg font-semibold sm:text-xl">
                Something went wrong
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                {error instanceof Error
                  ? error.message
                  : "Failed to load now playing movies."}
              </p>
            </div>
          </div>
        )}

        {/* ================= MOVIES ================= */}
        {!isLoading && !isError && movies.length > 0 && (
          <>
            {/* Result Header */}
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <div>
                <h2 className="text-base font-semibold sm:text-lg">
                  Currently Playing
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-600 sm:text-xs">
                  Movies in theaters now
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-gray-500 sm:px-4 sm:py-2 sm:text-xs">
                {movies.length} Movies
              </span>
            </div>

            {/* Movie Grid */}
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
                    year:
                      Number(movie.release_date?.slice(0, 4)) || 0,
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
                basePath="/now-playing"
              />
            </div>
          </>
        )}

        {/* ================= NO MOVIES ================= */}
        {!isLoading && !isError && movies.length === 0 && (
          <div className="flex min-h-[350px] items-center justify-center px-4 sm:min-h-[450px]">
            <div className="w-full max-w-md text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl sm:h-20 sm:w-20 sm:text-3xl">
                🎬
              </div>

              <h2 className="mt-5 text-lg font-semibold sm:text-xl lg:text-2xl">
                No now playing movies
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                There are currently no movies available to display.
                Please check again later.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}