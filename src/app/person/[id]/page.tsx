import PersonClient from "@/components/Clientpages/PersonClient";

export default async function PersonPage({ params,}: { params: Promise<{ id: string }>;}) {
  const { id } = await params;

  return <PersonClient id={id} />;
}