import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextResponse } from "next/server";

export function validateAdmin(request: Request): NextResponse | null {
    const authHeader = request.headers.get("x-admin-key");
    const { env } = getRequestContext();
    const adminKey = env.ADMIN_KEY;

    if (!adminKey || authHeader !== adminKey) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return null;
}
