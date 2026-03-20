import { getDb } from "@/db";
import { categories } from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { validateAdmin } from "../auth";

export const runtime = "edge";

interface CategoryBody {
    id: number;
    title: string;
    description: string;
    slug: string;
}

export async function POST(request: Request) {
    const denied = validateAdmin(request);
    if (denied) return denied;

    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const body = (await request.json()) as CategoryBody;

    const result = await db.insert(categories).values({
        title: body.title,
        description: body.description,
        slug: body.slug,
    }).returning();

    return NextResponse.json(result[0]);
}

export async function PUT(request: Request) {
    const denied = validateAdmin(request);
    if (denied) return denied;

    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const body = (await request.json()) as CategoryBody;

    const result = await db.update(categories)
        .set({
            title: body.title,
            description: body.description,
            slug: body.slug,
        })
        .where(eq(categories.id, body.id))
        .returning();

    return NextResponse.json(result[0]);
}

export async function DELETE(request: Request) {
    const denied = validateAdmin(request);
    if (denied) return denied;

    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const { id } = (await request.json()) as { id: number };

    await db.delete(categories).where(eq(categories.id, id));
    return NextResponse.json({ success: true });
}
