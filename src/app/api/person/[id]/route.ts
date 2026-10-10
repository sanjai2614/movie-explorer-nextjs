import { getPerson } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const data = await getPerson(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Person API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch person details" },
      { status: 500 }
    );
  }
}