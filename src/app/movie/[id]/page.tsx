import MovieDetailsClient from "@/components/Clientpages/MovieDetailsClient";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MovieDetailsClient id={id} />;
}