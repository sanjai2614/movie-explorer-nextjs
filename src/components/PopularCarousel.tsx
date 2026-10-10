"use client";

import {
  ChevronLeft,
  ChevronRight,
  Play,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import TrailerModal from "@/components/TrailerModal";
import FavoriteButton from "@/components/FavoriteButton";
import { usePopularMovies } from "@/features/movies/hooks/usePopularMovies";
import { useMovieVideos } from "@/features/movie-details/hooks/useMovieVideos";
import type { MovieVideo } from "@/lib/type";

export default function PopularCarousel() {
  const { data, isLoading, isError } = usePopularMovies();

  const movies = data?.results ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const movie = movies[currentIndex];

  const { data: videosData } = useMovieVideos(
    movie ? String(movie.id) : ""
  );

  // Find YouTube Trailer
  const trailer: MovieVideo | undefined =
    videosData?.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  const youtubeVideo: MovieVideo | undefined =
    videosData?.results.find(
      (video) => video.site === "YouTube"
    );

  const trailerVideo: MovieVideo | undefined =
    trailer || youtubeVideo;

  // Auto slide
  useEffect(() => {
    if (movies.length <= 1 || trailerOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === movies.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [movies.length, currentIndex, trailerOpen]);

  // Previous slide
  const previousSlide = () => {
    setTrailerOpen(false);

    setCurrentIndex((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );
  };

  // Next slide
  const nextSlide = () => {
    setTrailerOpen(false);

    setCurrentIndex((prev) =>
      prev === movies.length - 1 ? 0 : prev + 1
    );
  };

  // Loading
  if (isLoading) {
    return (
      <section className="mb-10">
        <div className="h-[430px] w-full animate-pulse rounded-2xl bg-gray-900 sm:h-[500px] md:h-[560px]" />
      </section>
    );
  }

  // Error
  if (isError) {
    return (
      <section className="mb-10">
        <div className="flex h-[300px] items-center justify-center rounded-2xl bg-gray-900">
          <p className="text-red-500">
            Failed to load popular movies.
          </p>
        </div>
      </section>
    );
  }

  // No movies
  if (!movie) {
    return null;
  }

  return (
    <>
      {/* Hero Carousel */}
      <section className="relative mb-10 overflow-hidden rounded-sm">
        <div className="relative h-[430px] sm:h-[500px] md:h-[560px]">

          {/* Background */}
          {movie.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-all duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900" />
          )}

          {/* Left Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          {/* Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          {/* Favorite */}
          <div className="absolute right-3 top-3 z-20 sm:right-6 sm:top-6">
            <FavoriteButton movie={movie} />
          </div>

          {/* Movie Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-2xl px-12 sm:px-20 md:px-24">

              {/* Badge */}
              <span className="mb-3 inline-block rounded-full bg-red-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white sm:mb-4 sm:text-xs">
                Popular
              </span>

              {/* Title */}
              <h1 className="max-w-[75%] text-2xl font-bold leading-tight text-white sm:max-w-full sm:text-5xl md:text-6xl">
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-300 sm:mt-4 sm:gap-3 sm:text-sm">

                <span className="font-semibold text-yellow-400">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                {movie.release_date && (
                  <span>
                    {movie.release_date.slice(0, 4)}
                  </span>
                )}

                <span>Movie</span>
              </div>

              {/* Description - Hidden on mobile */}
              {movie.overview && (
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300 sm:block sm:text-base">
                  {movie.overview}
                </p>
              )}

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">

                {/* View Details */}
                <Link
                  href={`/movie/${movie.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2.5 text-xs font-semibold text-black transition hover:bg-gray-200 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <Info size={16} />
                  View Details
                </Link>

                {/* Watch Trailer */}
                <button
                  type="button"
                  onClick={() => {
                    if (trailerVideo) {
                      setTrailerOpen(true);
                    }
                  }}
                  disabled={!videosData || !trailerVideo}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <Play
                    size={16}
                    fill="currentColor"
                  />

                  {!videosData
                    ? "Loading..."
                    : trailerVideo
                      ? "Watch Trailer"
                      : "Trailer Unavailable"}
                </button>
              </div>
            </div>
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous movie"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/70 sm:left-5 sm:p-3"
          >
            <ChevronLeft size={20} className="sm:h-[22px] sm:w-[22px]" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next movie"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-5 sm:p-3"
          >
            <ChevronRight size={20} className="sm:h-[22px] sm:w-[22px]" />
          </button>

          {/* Dots */}
          {/* Desktop Movie Thumbnails */}
<div className="absolute bottom-5 right-6 z-10 hidden items-center gap-2 md:flex">
  {movies.map((item, index) => (
    <button
      key={item.id}
      type="button"
      onClick={() => {
        setTrailerOpen(false);
        setCurrentIndex(index);
      }}
      aria-label={`Go to ${item.title}`}
      className={`group relative overflow-hidden rounded-md border-2 transition-all duration-300 ${
        currentIndex === index
          ? "h-16 w-28 border-white opacity-100"
          : "h-12 w-20 border-white/30 opacity-60 hover:border-white hover:opacity-100"
      }`}
    >
      {item.backdrop_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
          alt={item.title}
          fill
          sizes="120px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800" />
      )}

      {/* Active overlay */}
      {currentIndex === index && (
        <div className="absolute inset-0 bg-black/20" />
      )}
    </button>
  ))}
</div>

{/* Mobile Dots */}
<div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:hidden">
  {movies.map((_, index) => (
    <button
      key={index}
      type="button"
      onClick={() => {
        setTrailerOpen(false);
        setCurrentIndex(index);
      }}
      aria-label={`Go to slide ${index + 1}`}
      className={`h-1.5 rounded-full transition-all ${
        currentIndex === index
          ? "w-5 bg-white"
          : "w-1.5 bg-white/40 hover:bg-white/70"
      }`}
    />
  ))}
</div>
        </div>
      </section>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        videoKey={trailerVideo?.key ?? ""}
        title={movie.title}
      />
    </>
  );
}