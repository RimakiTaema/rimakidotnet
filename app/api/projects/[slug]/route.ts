import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { env } = getRequestContext();
    const db = getDb(env.DB);

    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));

    if (!project) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
}
