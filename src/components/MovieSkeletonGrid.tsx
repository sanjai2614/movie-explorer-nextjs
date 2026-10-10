import MovieSkeleton from "./MovieSkeleton";

export default function MovieSkeletonGrid() {
  return (
    <div className=" grid
                grid-cols-1
                gap-x-3
                gap-y-7
                sm:grid-cols-2
                sm:gap-x-4
                sm:gap-y-8
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <MovieSkeleton key={index} />
      ))}
    </div>
  );
}