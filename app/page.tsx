import ScrollSection from "./components/scroll-section";
import ProjectCard from "./components/project-card";
import CategoryCard from "./components/category-card";
import { getProjectsBySlugs, getProjectsByCategorySlug } from "./lib/projects";
import { getAllCategories } from "./lib/categories";
import { sql } from "./lib/db";

export const dynamic = "force-dynamic";

async function getPopularSlugs(): Promise<string[]> {
  try {
    const rows = await sql`
      SELECT slug FROM view_counts ORDER BY count DESC LIMIT 5
    `;
    return rows.map((row) => row.slug as string);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [popularSlugs, categories] = await Promise.all([
    getPopularSlugs(),
    Promise.resolve(getAllCategories()),
  ]);

  const popularProjects = getProjectsBySlugs(popularSlugs);
  const featuredCategories = categories.filter((c) => c.featured);
  const nonFeaturedCategories = categories.filter((c) => !c.featured);

  return (
    <div>
      {popularProjects.length > 0 && (
        <ScrollSection title="Popular Projects">
          {popularProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.frontmatter.title}
              description={project.frontmatter.description}
              slug={project.slug}
              github={project.frontmatter.github}
              ip={project.frontmatter.ip}
              website={project.frontmatter.website}
              image={project.frontmatter.image}
              logo={project.frontmatter.logo}
              buttons={project.frontmatter.buttons}
            />
          ))}
        </ScrollSection>
      )}
      {featuredCategories.map((category) => {
        const projects = getProjectsByCategorySlug(category.slug);
        if (projects.length === 0) return null;
        return (
          <ScrollSection key={category.slug} title={category.title}>
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.frontmatter.title}
                description={project.frontmatter.description}
                slug={project.slug}
                github={project.frontmatter.github}
                ip={project.frontmatter.ip}
                website={project.frontmatter.website}
              />
            ))}
          </ScrollSection>
        );
      })}
      {nonFeaturedCategories.length > 0 && (
        <ScrollSection title="Categories">
          {nonFeaturedCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              slug={category.slug}
              title={category.title}
              description={category.description}
              logo={category.logo}
            />
          ))}
        </ScrollSection>
      )}
    </div>
  );
}
