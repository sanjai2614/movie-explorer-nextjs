import { getMovieCredits } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const data = await getMovieCredits(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Movie credits API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch movie credits" },
      { status: 500 }
    );
  }
}