"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/lib/type";

type MovieHorizontalSliderProps = {
  title: string;
  movies: Movie[];
};

export default function MovieHorizontalSlider({
  title,
  movies,
}: MovieHorizontalSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slide = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  if (!movies.length) {
    return null;
  }

  return (
    <section className="mb-10 w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>

        {/* Desktop Arrows */}
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => slide("left")}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => slide("right")}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
            aria-label={`Next ${title}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Movie Slider */}
      <div
        ref={sliderRef}
        className="hide-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-60 shrink-0 sm:w-70">
            <MovieCard
              movie={{
                id: movie.id,
                title: movie.title,
                year: Number(movie.release_date?.slice(0, 4)) || 0,
                rating: Number(movie.vote_average.toFixed(1)),
                poster_path: movie.poster_path,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
