"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import type { FavoriteMovie } from "../lib/type";

export default function FavoriteButton({
  movie,
}: {
  movie: FavoriteMovie;
}) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(movie)}
      aria-label={
        isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"
      }
      title={
        isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"
      }
      className={`rounded-lg font-medium transition ${
        isFavorite
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      {/* Mobile - Icon only */}
      <span className="flex h-10 w-10 items-center justify-center sm:hidden">
        <Heart
          size={20}
          className={isFavorite ? "fill-current" : ""}
        />
      </span>

      {/* Desktop - Text + Icon */}
      <span className="hidden items-center gap-2 px-5 py-3 sm:flex">
        <Heart
          size={18}
          className={isFavorite ? "fill-current" : ""}
        />

        {isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </span>
    </button>
  );
}