"use client";

import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import MovieDetailsSkeleton from "@/components/MovieDetailsSkeleton";

import { useMovieDetails } from "@/features/movie-details/hooks/useMovieDetails";
import { useMovieCredits } from "@/features/movie-details/hooks/useMovieCredits";
import { useMovieVideos } from "@/features/movie-details/hooks/useMovieVideos";

export default function MovieDetailsClient({ id }: { id: string }) {
  const { data: movie, isLoading, isError, error,} = useMovieDetails(id);

  const { data: credits, isLoading: creditsLoading, isError: creditsError,} = useMovieCredits(id);

  const { data: videos, isLoading: videosLoading, isError: videosError,} = useMovieVideos(id);

  if (isLoading) return <MovieDetailsSkeleton />;

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center text-red-400">
        {error instanceof Error
          ? error.message
          : "Failed to load movie details"}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Movie not found
      </div>
    );
  }

  const director = credits?.crew.find(
    (member) => member.job === "Director"
  );

  const trailer =
    videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) ||
    videos?.results?.find(
      (video) => video.site === "YouTube"
    );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ================= BACKDROP ================= */}
      {movie.backdrop_path && (
        <div className="relative h-70 w-full overflow-hidden sm:h-87.5 md:h-112.5">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/20" />
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 pb-16 sm:-mt-28 md:-mt-32">
        {/* ================= MOVIE HEADER ================= */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Poster */}
          <div className="mx-auto w-48 shrink-0 sm:w-56 md:mx-0 md:w-64">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="flex aspect-2/3 items-center justify-center rounded-2xl bg-gray-900 text-gray-500">
                No Poster
              </div>
            )}
          </div>

          {/* Main Details */}
          <div className="flex-1 pt-2 md:pt-10">
            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {movie.title}
            </h1>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              {movie.release_date && (
                <span>{movie.release_date.slice(0, 4)}</span>
              )}

              {movie.runtime > 0 && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>{movie.runtime} min</span>
                </>
              )}

              <span className="text-gray-600">•</span>

              <span className="rounded-md bg-yellow-500 px-2 py-1 font-semibold text-black">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span className="text-gray-600">•</span>

              <span className="uppercase">
                {movie.original_language}
              </span>
            </div>

            {/* Genres */}
            {movie.genres.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-gray-700 px-3 py-1 text-sm text-gray-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mt-7">
              <h2 className="text-xl font-semibold">
                Overview
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-gray-400">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Favorite */}
            <div className="mt-6">
              <FavoriteButton
                movie={{
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
                }}
              />
            </div>
          </div>
        </div>

        {/* ================= ADDITIONAL INFO ================= */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Director */}
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <h2 className="text-xl font-semibold">
              Director
            </h2>

            {creditsLoading ? (
              <div className="mt-3 h-5 w-32 animate-pulse rounded bg-gray-800" />
            ) : creditsError ? (
              <p className="mt-3 text-sm text-gray-500">
                Director information unavailable.
              </p>
            ) : director ? (
              <Link
                href={`/person/${director.id}`}
                className="mt-3 inline-block text-gray-300 transition hover:text-white hover:underline"
              >
                {director.name}
              </Link>
            ) : (
              <p className="mt-3 text-gray-500">
                Not available
              </p>
            )}
          </div>

          {/* Production Companies */}
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <h2 className="text-xl font-semibold">
              Production Companies
            </h2>

            {movie.production_companies.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.production_companies.map((company) => (
                  <span
                    key={company.id}
                    className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300"
                  >
                    {company.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-500">
                No production company information.
              </p>
            )}
          </div>
        </div>

        {/* ================= MORE INFORMATION ================= */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            More Information
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p className="mt-2 text-sm text-gray-200">
                {movie.status || "N/A"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
              <p className="text-sm text-gray-500">
                Budget
              </p>

              <p className="mt-2 text-sm text-gray-200">
                {movie.budget > 0
                  ? `$${movie.budget.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <p className="mt-2 text-sm text-gray-200">
                {movie.revenue > 0
                  ? `$${movie.revenue.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-950 p-4">
              <p className="text-sm text-gray-500">
                Language
              </p>

              <p className="mt-2 text-sm uppercase text-gray-200">
                {movie.original_language || "N/A"}
              </p>
            </div>
          </div>
        </section>

        {/* ================= CAST ================= */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Cast
            </h2>

            {credits?.cast && credits.cast.length > 12 && (
              <span className="text-sm text-gray-500">
                {credits.cast.length} actors
              </span>
            )}
          </div>

          {creditsLoading && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-xl bg-gray-900"
                >
                  <div className="aspect-2/3 bg-gray-800" />
                  <div className="space-y-2 p-3">
                    <div className="h-4 w-3/4 rounded bg-gray-800" />
                    <div className="h-3 w-1/2 rounded bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {creditsError && (
            <p className="mt-5 text-gray-500">
              Cast information unavailable.
            </p>
          )}

          {credits?.cast && credits.cast.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {credits.cast.slice(0, 12).map((actor) => (
                <Link
                  key={actor.id}
                  href={`/person/${actor.id}`}
                  className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-950 transition hover:border-gray-600"
                >
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="aspect-2/3 w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-2/3 items-center justify-center bg-gray-900 text-sm text-gray-500">
                      No Image
                    </div>
                  )}

                  <div className="p-3">
                    <p className="truncate font-medium text-gray-200">
                      {actor.name}
                    </p>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {actor.character || "Unknown role"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!creditsLoading &&
            !creditsError &&
            (!credits?.cast || credits.cast.length === 0) && (
              <p className="mt-5 text-gray-500">
                No cast information available.
              </p>
            )}
        </section>

        {/* ================= TRAILER ================= */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Trailer
          </h2>

          {videosLoading && (
            <div className="mt-5 aspect-video w-full animate-pulse rounded-2xl bg-gray-900" />
          )}

          {videosError && (
            <p className="mt-5 text-gray-500">
              Trailer information unavailable.
            </p>
          )}

          {!videosLoading && !videosError && trailer && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4">
                <p className="font-medium text-gray-200">
                  {trailer.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {trailer.type}
                </p>
              </div>
            </div>
          )}

          {!videosLoading &&
            !videosError &&
            !trailer && (
              <p className="mt-5 text-gray-500">
                Trailer not available.
              </p>
            )}
        </section>
      </main>
    </div>
  );
}