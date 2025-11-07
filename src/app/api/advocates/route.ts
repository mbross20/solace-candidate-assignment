import { sql, or, ilike, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get("page") ?? "1";
  const search = searchParams.get("search") ?? "";
  const page = parseInt(pageParam, 10);
  const offset = (page - 1) * PAGE_SIZE;

  if (!process.env.DATABASE_URL) {
    const { advocateData } = await import("../../../db/seed/advocates");
    return Response.json({ data: advocateData });
  }

  const pattern = `%${search}%`;
  const data = await (db as any)
    .select()
    .from(advocates)
    .orderBy(asc(advocates.lastName))
    .limit(PAGE_SIZE + 1)
    .offset(offset)
    .where(
      search
        ? or(
            ilike(advocates.firstName, pattern),
            ilike(advocates.lastName, pattern),
            ilike(advocates.city, pattern),
            ilike(advocates.degree, pattern),
            sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${pattern}`,
            sql`${advocates.specialties}::text ILIKE ${pattern}`
          )
        : undefined
    );

  const hasMore = data.length > PAGE_SIZE;

  // Only return the first PAGE_SIZE results
  const results = data.slice(0, PAGE_SIZE);

  return NextResponse.json({
    data: results,
    hasMore,
  });
}
