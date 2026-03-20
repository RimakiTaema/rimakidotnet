import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
}
