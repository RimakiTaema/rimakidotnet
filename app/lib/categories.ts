import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface CategoryEntry {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly featured: boolean;
  readonly logo?: string;
}

const CATEGORIES_DIR = path.join(process.cwd(), "content", "categories");

export function getAllCategories(): readonly CategoryEntry[] {
  if (!fs.existsSync(CATEGORIES_DIR)) return [];

  const files = fs.readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const filePath = path.join(CATEGORIES_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        order: Number(data.order ?? 0),
        featured: Boolean(data.featured ?? false),
        ...(data.logo ? { logo: String(data.logo) } : {}),
      };
    })
    .sort((a, b) => {
      const orderDiff = a.order - b.order;
      if (orderDiff !== 0) return orderDiff;
      return a.title.localeCompare(b.title);
    });
}

export function getCategoryBySlug(slug: string): CategoryEntry | null {
  const categories = getAllCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}
