"use client";

import MovieHorizontalSlider from "@/components/MovieHorizontalSlider";

import { usePopularMovies } from "@/features/movies/hooks/usePopularMovies";
import { useTopRatedMovies } from "@/features/movies/hooks/useTopRatedMovies";
import { useTrendingMovies } from "@/features/trending/hooks/useTrendingMovies";

export default function HomeClient() {
  const {
    data: popularData,
    isLoading: popularLoading,
  } = usePopularMovies();

  const {
    data: trendingData,
    isLoading: trendingLoading,
  } = useTrendingMovies();

  const {
    data: topRatedData,
    isLoading: topRatedLoading,
  } = useTopRatedMovies();

  const popularMovies = popularData?.results ?? [];
  const trendingMovies = trendingData?.results ?? [];
  const topRatedMovies = topRatedData?.results ?? [];

  return (
    <main className="mx-auto w-full max-w-362 px-4 sm:px-6">

      {/* Popular
      {!popularLoading && (
        <MovieHorizontalSlider
          title="Popular Movies"
          movies={popularMovies}
        />
      )} */}

      {/* Trending */}
      {!trendingLoading && (
        <MovieHorizontalSlider
          title="Trending"
          movies={trendingMovies}
        />
      )}

      {/* Top Rated */}
      {!topRatedLoading && (
        <MovieHorizontalSlider
          title="Top Rated"
          movies={topRatedMovies}
        />
      )}

    </main>
  );
}