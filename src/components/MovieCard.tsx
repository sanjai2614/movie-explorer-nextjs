"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import type { MovieCardProps } from "../lib/type";

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, toggleFavorite } = useFavorites();

const isFavorite = favorites.some(
  (favorite) => favorite.id === movie.id
);

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition duration-300 hover:-translate-y-1 hover:border-gray-600 hover:shadow-xl">
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative overflow-hidden">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-80 items-center justify-center bg-gray-800">
              <span className="text-gray-500">No Poster</span>
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>

        <div className="p-5">
          <h3 className="truncate text-lg font-semibold text-white">
            {movie.title}
          </h3>

          <div className="mt-2 flex justify-between text-sm text-gray-400">
            <span>{movie.year}</span>
            <span>⭐ {movie.rating}</span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          type="button"
          onClick={() => toggleFavorite({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  release_date: "",
  vote_average: movie.rating,
})}
          className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            isFavorite
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {isFavorite
            ? "❤️ Remove Favorite"
            : "🤍 Add to Favorites"}
        </button>
      </div>
    </div>
  );
}