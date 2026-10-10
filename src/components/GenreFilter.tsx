"use client";

import { useRouter, useSearchParams } from "next/navigation";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 18, name: "Drama" },
];

export default function GenreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get("genre");

  function selectGenre(genreId?: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (genreId) {
      params.set("genre", genreId.toString());
    } else {
      params.delete("genre");
    }

    router.push(`/movies?${params.toString()}`);
  }

  return (
    <div className="hide-scrollbar flex w-full gap-2 overflow-x-auto">
      {/* All */}
      <button
        type="button"
        onClick={() => selectGenre()}
        className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
          !currentGenre
            ? "border-red-600 bg-red-600 text-white"
            : "border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700 hover:bg-gray-800 hover:text-white"
        }`}
      >
        All
      </button>

      {genres.map((genre) => {
        const isActive =
          currentGenre === genre.id.toString();

        return (
          <button
            key={genre.id}
            type="button"
            onClick={() => selectGenre(genre.id)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
              isActive
                ? "border-red-600 bg-red-600 text-white"
                : "border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
}