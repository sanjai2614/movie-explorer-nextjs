import type { Actor, CrewMember} from "@/lib/type"

export type MovieCreditsResponse = {
  cast: Actor[];
  crew: CrewMember[];
};

export async function getMovieCredits( id: string): Promise<MovieCreditsResponse> {
  const response = await fetch(`/api/movies/${id}/credits`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }

  return response.json();
}