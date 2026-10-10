import { getUpcomingMovies } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getUpcomingMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Upcoming API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch upcoming movies" },
      { status: 500 }
    );
  }
}