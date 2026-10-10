import { getMovieVideos } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const data = await getMovieVideos(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Movie videos API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch movie videos" },
      { status: 500 }
    );
  }
}