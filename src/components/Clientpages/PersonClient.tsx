"use client";

import Link from "next/link";
import { usePerson } from "@/features/person/hooks/usePerson";
import { useRouter } from "next/navigation";
import PersonSkeleton from "../PersonSkeleton";

export default function PersonClient({ id }: { id: string }) {
    

    const router =useRouter()
  const {
    data: person,
    isLoading,
    isError,
    error,
  } = usePerson(id);

  if (isLoading) {
    return <PersonSkeleton/>
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-center">
        <div>
          <p className="text-red-400">
            {error instanceof Error
              ? error.message
              : "Failed to load person details"}
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Person not found
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-125 w-175 -translate-x-1/2 rounded-full bg-purple-900/10 blur-[140px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button onClick={()=>router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-gray-300 transition hover:border-gray-600 hover:text-white"
        >
          <span aria-hidden="true" className="text-base leading-none">←</span>
          Back
        </button>

        {/* ================= PROFILE ================= */}
        <section className="mt-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            {/* Profile Image */}
            <div className="relative mx-auto w-full max-w-75 shrink-0 md:mx-0">
              {/* Glow */}
              <div className="absolute -inset-2 rounded-[30px] bg-purple-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950 shadow-2xl">
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt={person.name}
                    className="aspect-2/3 w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-2/3 items-center justify-center bg-gray-900 text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Person Information */}
            <div className="flex-1 pt-2 md:pt-6">
              {/* Department */}
              {person.known_for_department && (
                <span className="inline-flex rounded-full border border-gray-800 bg-gray-950 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-400">
                  {person.known_for_department}
                </span>
              )}

              {/* Name */}
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {person.name}
              </h1>

              {/* Information Cards */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Birthday */}
                {person.birthday && (
                  <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 transition hover:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gray-900 p-3">
                        <span aria-hidden="true" className="text-lg text-gray-300">📅</span>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          Birthday
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-200">
                         {person.birthday
                          ? person.birthday.split("-").reverse().join("-")
                          : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Birthplace */}
                {person.place_of_birth && (
                  <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 transition hover:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-gray-900 p-3">
                        <span aria-hidden="true" className="text-lg text-gray-300">📍</span>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          Place of Birth
                        </p>

                        <p className="mt-1 text-sm font-medium leading-5 text-gray-200">
                          {person.place_of_birth}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Biography */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold">
                  Biography
                </h2>

                <div className="mt-4 max-w-3xl">
                  {person.biography ? (
                    <p className="whitespace-pre-line text-[15px] leading-8 text-gray-400">
                      {person.biography}
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      No biography available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Divider */}
        <div className="mt-16 border-t border-gray-900 pt-8">
          <p className="text-center text-xs text-gray-600">
            Movie Explorer
          </p>
        </div>
      </main>
    </div>
  );
}