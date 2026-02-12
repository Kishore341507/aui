import { searchGuildMembers } from "@/lib/discord";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchGuildMembers(
    query,
    limit ? parseInt(limit) : undefined
  );

  return NextResponse.json({ results });
}
