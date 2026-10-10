import type { Person } from "@/lib/type";

export async function getPerson(
  id: string
): Promise<Person> {
  const response = await fetch(`/api/person/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch person details");
  }

  return response.json();
}