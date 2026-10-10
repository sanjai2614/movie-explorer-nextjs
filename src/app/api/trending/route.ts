import { getTrendingMovies } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getTrendingMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Trending API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch trending movies" },
      { status: 500 }
    );
  }
}