"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function MovieFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.delete("page");

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/movies?${params.toString()}`);
  }

  function clearFilters() {
    const params = new URLSearchParams();

    const search = searchParams.get("search");

    if (search) {
      params.set("search", search);
    }

    router.push(
      params.toString()
        ? `/movies?${params.toString()}`
        : "/movies"
    );
  }

  return (
    <div className="flex flex-wrap gap-2">

      {/* Year */}
      <select
        value={searchParams.get("year") || ""}
        onChange={(e) =>
          updateFilter("year", e.target.value)
        }
        className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-sm text-gray-300 outline-none transition hover:border-gray-600 focus:border-red-500"
      >
        <option value="">Year</option>
        <option value="2026">2026</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>

      {/* Rating */}
      <select
        value={searchParams.get("rating") || ""}
        onChange={(e) =>
          updateFilter("rating", e.target.value)
        }
        className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-sm text-gray-300 outline-none transition hover:border-gray-600 focus:border-red-500"
      >
        <option value="">Rating</option>
        <option value="9">9+</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
        <option value="5">5+</option>
      </select>

      {/* Language */}
      <select
        value={searchParams.get("language") || ""}
        onChange={(e) =>
          updateFilter("language", e.target.value)
        }
        className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-sm text-gray-300 outline-none transition hover:border-gray-600 focus:border-red-500"
      >
        <option value="">Language</option>
        <option value="en">English</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="ml">Malayalam</option>
        <option value="kn">Kannada</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="mr">Marathi</option>
        <option value="ko">Korean</option>
        <option value="ja">Japanese</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
      </select>

      {/* Sort */}
      <select
        value={
          searchParams.get("sort") ||
          "popularity.desc"
        }
        onChange={(e) =>
          updateFilter("sort", e.target.value)
        }
        className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-sm text-gray-300 outline-none transition hover:border-gray-600 focus:border-red-500"
      >
        <option value="popularity.desc">
          Popular
        </option>

        <option value="vote_average.desc">
          Rating
        </option>

        <option value="primary_release_date.desc">
          Newest
        </option>

        <option value="primary_release_date.asc">
          Oldest
        </option>
      </select>

      {/* Clear */}
      <button
        type="button"
        onClick={clearFilters}
        className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-sm text-gray-400 transition hover:border-red-500 hover:text-white"
      >
        Clear
      </button>
    </div>
  );
}