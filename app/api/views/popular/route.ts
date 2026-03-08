import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await sql`
      SELECT slug, count FROM view_counts
      ORDER BY count DESC
      LIMIT 5
    `;

    return NextResponse.json({
      slugs: rows.map((row) => row.slug),
      counts: Object.fromEntries(rows.map((row) => [row.slug, row.count])),
    });
  } catch {
    return NextResponse.json({ slugs: [], counts: {} });
  }
}
