import { Suspense } from "react";
import NowPlayingClient from "@/components/Clientpages/NowPlayingClient";

export default function NowPlayingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white" aria-busy="true">
          <div className="mx-auto w-full max-w-375 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12">
            <p className="text-sm text-gray-500">Loading movies...</p>
          </div>
        </main>
      }
    >
      <NowPlayingClient />
    </Suspense>
  );
}
