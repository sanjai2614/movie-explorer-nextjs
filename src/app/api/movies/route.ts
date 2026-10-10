import { getMovies } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const genre = searchParams.get("genre") || undefined;
  const year = searchParams.get("year") || undefined;
  const rating = searchParams.get("rating") || undefined;
  const sort = searchParams.get("sort") || undefined;
  const language = searchParams.get("language") || undefined;

  try {
    const data = await getMovies(
      search,
      page,
      genre,
      year,
      rating,
      sort,
      language
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Movies API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}