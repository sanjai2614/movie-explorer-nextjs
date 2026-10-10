"use client";

import { useFavorites } from "@/context/FavoritesContext";

type Props = {
  movieId: number;
};

export default function RemoveFavoriteButton({
  movieId,
}: Props) {
  const { toggleFavorite } = useFavorites();

  function removeFavorite() {
    toggleFavorite({
      id: movieId,
      title: "",
      poster_path: null,
      release_date: "",
      vote_average: 0,
    });
  }

  return (
    <button
      type="button"
      onClick={removeFavorite}
      className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-700"
    >
      Remove Favorite
    </button>
  );
}