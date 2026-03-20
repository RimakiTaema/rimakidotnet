import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    slug: text("slug").notNull().unique(),
});

export const projects = sqliteTable("projects", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    slug: text("slug").notNull().unique(),
    categorySlug: text("category_slug").references(() => categories.slug),
    tags: text("tags"),         // JSON string array e.g. '["Next.js","TypeScript"]'
    href: text("href"),         // external link (github, demo, etc.)
    hasMdx: integer("has_mdx", { mode: "boolean" }).default(false),
    createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});
