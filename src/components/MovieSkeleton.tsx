export default function MovieSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-900 animate-pulse">
      {/* Poster */}
      <div className="aspect-3/4 w-full bg-gray-800" />

      {/* Content */}
      <div className="space-y-3 p-4">
        <div className="h-4.5 w-3/4 rounded bg-gray-800" />

        <div className="flex justify-between">
          <div className="h-4 w-12 rounded bg-gray-800" />
          <div className="h-4 w-14 rounded bg-gray-800" />
        </div>
      </div>
    </div>
  );
}