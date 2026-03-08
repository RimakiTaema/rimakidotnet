import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// --- Project types (main project cards) ---

export interface ProjectFrontmatter {
  readonly title: string;
  readonly description: string;
  readonly category: readonly string[];
  readonly order: number;
  readonly github?: string;
  readonly ip?: string;
  readonly website?: string;
  readonly image?: string;
  readonly logo?: string;
  readonly buttons?: readonly CustomButton[];
}

export interface CustomButton {
  readonly label: string;
  readonly url: string;
  readonly logo?: string;
}

export interface ProjectEntry {
  readonly slug: string;
  readonly frontmatter: ProjectFrontmatter;
}

export interface ProjectWithContent extends ProjectEntry {
  readonly content: string;
  readonly format: "md" | "mdx";
}

// --- Update types (changelog/update cards) ---

export interface UpdateFrontmatter {
  readonly title: string;
  readonly description: string;
  readonly project: string;
  readonly date?: string;
  readonly order: number;
}

export interface UpdateEntry {
  readonly slug: string;
  readonly frontmatter: UpdateFrontmatter;
}

export interface UpdateWithContent extends UpdateEntry {
  readonly content: string;
  readonly format: "md" | "mdx";
}

// --- Shared types ---

export interface CategoryGroup {
  readonly category: string;
  readonly projects: readonly ProjectEntry[];
}

// --- Directories ---

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const UPDATES_DIR = path.join(process.cwd(), "content", "updates");

// --- Helpers ---

function normalizeCategory(raw: unknown): readonly string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") return [raw];
  return [];
}

function getFiles(dir: string): readonly string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

function getFormat(filename: string): "md" | "mdx" {
  return filename.endsWith(".mdx") ? "mdx" : "md";
}

function getSlug(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

// --- Project functions ---

function parseProject(filename: string): ProjectWithContent {
  const filePath = path.join(PROJECTS_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: getSlug(filename),
    frontmatter: {
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      category: normalizeCategory(data.category),
      order: Number(data.order ?? 0),
      github: data.github ? String(data.github) : undefined,
      ip: data.ip ? String(data.ip) : undefined,
      website: data.website ? String(data.website) : undefined,
      image: data.image ? String(data.image) : undefined,
      logo: data.logo ? String(data.logo) : undefined,
      buttons: Array.isArray(data.buttons)
        ? data.buttons.map((b: Record<string, unknown>) => ({
            label: String(b.label ?? ""),
            url: String(b.url ?? ""),
            ...(b.logo ? { logo: String(b.logo) } : {}),
          }))
        : undefined,
    },
    content,
    format: getFormat(filename),
  };
}

export function getAllProjects(): readonly ProjectEntry[] {
  return getFiles(PROJECTS_DIR).map(parseProject);
}

export function getProjectBySlug(slug: string): ProjectWithContent | null {
  const files = getFiles(PROJECTS_DIR);
  const match = files.find((f) => getSlug(f) === slug);
  if (!match) return null;
  return parseProject(match);
}

export function getAllProjectSlugs(): readonly string[] {
  return getFiles(PROJECTS_DIR).map(getSlug);
}

export function getProjectsBySlugs(slugs: readonly string[]): readonly ProjectEntry[] {
  const allProjects = getAllProjects();
  const projectMap = new Map(allProjects.map((p) => [p.slug, p]));

  return slugs
    .map((slug) => projectMap.get(slug))
    .filter((p): p is ProjectEntry => p !== undefined);
}

export function getProjectsByCategorySlug(categorySlug: string): readonly ProjectEntry[] {
  return getAllProjects()
    .filter((p) => p.frontmatter.category.includes(categorySlug))
    .sort((a, b) => {
      const orderDiff = a.frontmatter.order - b.frontmatter.order;
      if (orderDiff !== 0) return orderDiff;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
}

// --- Update functions ---

function parseUpdate(filename: string): UpdateWithContent {
  const filePath = path.join(UPDATES_DIR, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: getSlug(filename),
    frontmatter: {
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      project: String(data.project ?? ""),
      date: data.date ? String(data.date) : undefined,
      order: Number(data.order ?? 0),
    },
    content,
    format: getFormat(filename),
  };
}

export function getAllUpdates(): readonly UpdateEntry[] {
  return getFiles(UPDATES_DIR).map(parseUpdate);
}

export function getUpdateBySlug(slug: string): UpdateWithContent | null {
  const files = getFiles(UPDATES_DIR);
  const match = files.find((f) => getSlug(f) === slug);
  if (!match) return null;
  return parseUpdate(match);
}

export function getAllUpdateSlugs(): readonly string[] {
  return getFiles(UPDATES_DIR).map(getSlug);
}

export function getUpdatesForProject(projectSlug: string): readonly UpdateEntry[] {
  return getAllUpdates()
    .filter((u) => u.frontmatter.project === projectSlug)
    .sort((a, b) => {
      const orderDiff = a.frontmatter.order - b.frontmatter.order;
      if (orderDiff !== 0) return orderDiff;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
}
