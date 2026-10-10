"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  function handleRetry() {
    window.location.reload();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-950 p-8 text-center">
        <div className="text-5xl">😕</div>

        <h2 className="mt-4 text-2xl font-bold">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          We couldn't load the movies. Please try again.
        </p>

        <button
          type="button"
          onClick={handleRetry}
          className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}