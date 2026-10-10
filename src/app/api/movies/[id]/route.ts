import { getMovie } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const data = await getMovie(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Movie details API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}