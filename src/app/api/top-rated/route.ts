import { getTopRatedMovies } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getTopRatedMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Top rated movies API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch top rated movies" },
      { status: 500 }
    );
  }
}