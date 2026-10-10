const PersonSkeleton = () => {
  return (
  <div className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-800" />

          <div className="mt-10 flex flex-col gap-10 md:flex-row">
            <div className="mx-auto h-[420px] w-full max-w-[300px] animate-pulse rounded-3xl bg-gray-900 md:mx-0" />

            <div className="flex-1 space-y-5">
              <div className="h-12 w-2/3 animate-pulse rounded bg-gray-900" />
              <div className="h-5 w-40 animate-pulse rounded bg-gray-900" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="h-20 animate-pulse rounded-2xl bg-gray-900" />
                <div className="h-20 animate-pulse rounded-2xl bg-gray-900" />
              </div>

              <div className="space-y-3 pt-5">
                <div className="h-5 w-32 animate-pulse rounded bg-gray-900" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-900" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-900" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PersonSkeleton
