import { getPopularMovies } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getPopularMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Popular movies API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}