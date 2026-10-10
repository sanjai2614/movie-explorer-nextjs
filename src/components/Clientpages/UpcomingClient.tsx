"use client";

import MovieCard from "@/components/MovieCard";
import { useUpcomingMovies } from "@/features/upcoming/hooks/useUpcomingMovies";
import MovieSkeletonGrid from "../MovieSkeletonGrid";

export default function UpcomingClient() {
  const { data, isLoading, isError, error } = useUpcomingMovies();

  const movies = data?.results || [];

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">🎬 Upcoming Movies</h1>

          <p className="mt-2 text-gray-400">Movies coming soon</p>
        </div>

        {/* Loading */}
        {isLoading && <MovieSkeletonGrid />}
        {/* Error */}
        {isError && (
          <div className="flex min-h-87.5 flex-col items-center justify-center text-center">
            <div className="text-6xl">⚠️</div>

            <h2 className="mt-5 text-2xl font-semibold">
              Something went wrong
            </h2>

            <p className="mt-2 text-gray-400">
              {error instanceof Error
                ? error.message
                : "Failed to load upcoming movies."}
            </p>
          </div>
        )}

        {/* Movies */}
        {!isLoading && !isError && movies.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        )}

        {/* No Movies */}
        {!isLoading && !isError && movies.length === 0 && (
          <div className="flex min-h-87.5 flex-col items-center justify-center text-center">
            <div className="text-6xl">🎬</div>

            <h2 className="mt-5 text-2xl font-semibold">
              No upcoming movies found
            </h2>

            <p className="mt-2 text-gray-400">Please try again later.</p>
          </div>
        )}
      </section>
    </main>
  );
}
