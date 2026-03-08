import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  try {
    await sql`
      INSERT INTO view_counts (slug, count, updated_at)
      VALUES (${slug}, 1, now())
      ON CONFLICT (slug)
      DO UPDATE SET count = view_counts.count + 1, updated_at = now()
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;

  try {
    const rows = await sql`
      SELECT count FROM view_counts WHERE slug = ${slug}
    `;
    return NextResponse.json({ count: rows[0]?.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
