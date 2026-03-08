import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCategories, getCategoryBySlug } from "@/app/lib/categories";
import { getProjectsByCategorySlug } from "@/app/lib/projects";
import ProjectCard from "@/app/components/project-card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const projects = getProjectsByCategorySlug(slug);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        &larr; Back to home
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h1>
      <p className="text-gray-500 mb-8">{category.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
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
      </div>
      {projects.length === 0 && (
        <p className="text-gray-400">No projects in this category yet.</p>
      )}
    </div>
  );
}
