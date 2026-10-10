"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  // URL-la already search irundha input-la show pannum
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearch(currentSearch);
  }, [searchParams]);

  // Debounced search URL update
  useEffect(() => {
    const value = debouncedSearch.trim();

    const currentSearch = searchParams.get("search") || "";

    // Same value-na navigation vendam
    if (value === currentSearch) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    // Search change aagumbodhu page 1
    params.delete("page");

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/movies?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  return (
    <div className="flex w-full gap-2">
      {/* Search Input */}
      <div className="relative min-w-0 flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500/30 sm:py-3"
        />

        {/* Clear */}
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition hover:text-white"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
