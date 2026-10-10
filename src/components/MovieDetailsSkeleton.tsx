export default function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-black text-white">
      {/* Backdrop */}
      <div className="h-70 w-full bg-gray-900 sm:h-87.5 md:h-112.5" />

      <main className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 pb-16 sm:-mt-28 md:-mt-32">
        {/* ================= MOVIE HEADER ================= */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Poster */}
          <div className="mx-auto w-48 shrink-0 sm:w-56 md:mx-0 md:w-64">
            <div className="aspect-2/3 w-full rounded-2xl bg-gray-900" />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-5 pt-2 md:pt-10">
            {/* Title */}
            <div className="h-10 w-3/4 rounded bg-gray-900 sm:h-12" />

            {/* Meta */}
            <div className="flex gap-3">
              <div className="h-5 w-16 rounded bg-gray-900" />
              <div className="h-5 w-20 rounded bg-gray-900" />
              <div className="h-6 w-16 rounded bg-gray-900" />
              <div className="h-5 w-12 rounded bg-gray-900" />
            </div>

            {/* Genres */}
            <div className="flex gap-2">
              <div className="h-7 w-20 rounded-full bg-gray-900" />
              <div className="h-7 w-24 rounded-full bg-gray-900" />
              <div className="h-7 w-20 rounded-full bg-gray-900" />
            </div>

            {/* Overview */}
            <div className="space-y-3 pt-3">
              <div className="h-6 w-28 rounded bg-gray-900" />
              <div className="h-4 w-full max-w-3xl rounded bg-gray-900" />
              <div className="h-4 w-5/6 max-w-3xl rounded bg-gray-900" />
              <div className="h-4 w-2/3 max-w-3xl rounded bg-gray-900" />
            </div>

            {/* Favorite */}
            <div className="h-10 w-32 rounded-lg bg-gray-900" />
          </div>
        </div>

        {/* ================= DIRECTOR + COMPANIES ================= */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Director */}
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <div className="h-6 w-24 rounded bg-gray-900" />
            <div className="mt-4 h-5 w-32 rounded bg-gray-900" />
          </div>

          {/* Production Companies */}
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <div className="h-6 w-48 rounded bg-gray-900" />

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="h-9 w-28 rounded-lg bg-gray-900" />
              <div className="h-9 w-36 rounded-lg bg-gray-900" />
              <div className="h-9 w-24 rounded-lg bg-gray-900" />
            </div>
          </div>
        </div>

        {/* ================= MORE INFORMATION ================= */}
        <section className="mt-10">
          <div className="h-7 w-48 rounded bg-gray-900" />

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-800 bg-gray-950 p-4"
              >
                <div className="h-4 w-16 rounded bg-gray-900" />
                <div className="mt-3 h-5 w-24 rounded bg-gray-900" />
              </div>
            ))}
          </div>
        </section>

        {/* ================= CAST ================= */}
        <section className="mt-12">
          <div className="h-7 w-20 rounded bg-gray-900" />

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950"
              >
                <div className="aspect-2/3 bg-gray-900" />

                <div className="space-y-2 p-3">
                  <div className="h-4 w-3/4 rounded bg-gray-900" />
                  <div className="h-3 w-1/2 rounded bg-gray-900" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TRAILER ================= */}
        <section className="mt-12">
          <div className="h-7 w-24 rounded bg-gray-900" />

          <div className="mt-5 aspect-video w-full overflow-hidden rounded-2xl bg-gray-900" />
        </section>
      </main>
    </div>
  );
}