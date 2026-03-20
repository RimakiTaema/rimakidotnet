import { getDb } from "@/db";
import { categories } from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const allCategories = await db.select().from(categories);
    return NextResponse.json(allCategories);
}
