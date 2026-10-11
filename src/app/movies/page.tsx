import { Suspense } from "react";
import MoviesClient from "@/components/Clientpages/MoviesClient";

export default function MoviesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white" aria-busy="true">
          <div className="mx-auto w-full max-w-375 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <p className="text-sm text-gray-500">Loading movies...</p>
          </div>
        </main>
      }
    >
      <MoviesClient />
    </Suspense>
  );
}
