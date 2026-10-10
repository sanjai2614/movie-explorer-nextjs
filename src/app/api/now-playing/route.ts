import { getNowPlayingMovies } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;

    const data = await getNowPlayingMovies(page);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Now playing API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch now playing movies" },
      { status: 500 }
    );
  }
}