"use client";

import Link from "next/link";
import RemoveFavoriteButton from "@/components/RemoveFavoriteButton";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-3xl font-bold">
          My Favorites ❤️
        </h2>

        {favorites.length === 0 ? (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-10 text-center">
            <p className="text-gray-400">
              No favorite movies yet.
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-red-600 px-5 py-3 hover:bg-red-700"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition hover:-translate-y-1 hover:border-gray-600"
              >
                <Link
                  href={`/movie/${movie.id}`}
                  className="block"
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="h-80 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-80 items-center justify-center bg-gray-800">
                      No Poster
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="font-semibold">
                      {movie.title}
                    </h3>

                    <div className="mt-2 flex justify-between text-sm text-gray-400">
                      <span>
                        {movie.release_date?.slice(0, 4)}
                      </span>

                      <span>
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="px-5 pb-5">
                  <RemoveFavoriteButton
                    movieId={movie.id}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}