import { getDb } from "@/db";
import { projects } from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { validateAdmin } from "../auth";

export const runtime = "edge";

interface ProjectBody {
    id: number;
    title: string;
    description: string;
    slug: string;
    categorySlug: string | null;
    tags: string[] | null;
    href: string | null;
    hasMdx: boolean;
}

export async function POST(request: Request) {
    const denied = validateAdmin(request);
    if (denied) return denied;

    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const body = (await request.json()) as ProjectBody;

    const result = await db.insert(projects).values({
        title: body.title,
        description: body.description,
        slug: body.slug,
        categorySlug: body.categorySlug || null,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        href: body.href || null,
        hasMdx: body.hasMdx ?? false,
        createdAt: new Date().toISOString(),
    }).returning();

    return NextResponse.json(result[0]);
}

export async function PUT(request: Request) {
    const denied = validateAdmin(request);
    if (denied) return denied;

    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const body = (await request.json()) as ProjectBody;

    const result = await db.update(projects)
        .set({
            title: body.title,
            description: body.description,
            slug: body.slug,
            categorySlug: body.categorySlug || null,
            tags: body.tags ? JSON.stringify(body.tags) : null,
            href: body.href || null,
            hasMdx: body.hasMdx ?? false,
        })
        .where(eq(projects.id, body.id))
        .returning();

    return NextResponse.json(result[0]);
}

export async function DELETE(request: Request) {
    const denied = validateAdmin(request);
    if (denied) return denied;

    const { env } = getRequestContext();
    const db = getDb(env.DB);
    const { id } = (await request.json()) as { id: number };

    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ success: true });
}
