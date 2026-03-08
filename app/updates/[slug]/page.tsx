import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getUpdateBySlug, getAllUpdateSlugs } from "@/app/lib/projects";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllUpdateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);
  if (!update) return {};

  return {
    title: update.frontmatter.title,
    description: update.frontmatter.description,
  };
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);

  if (!update) notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <Link href={`/projects/${update.frontmatter.project}`} className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        &larr; Back to project
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {update.frontmatter.title}
      </h1>
      {update.frontmatter.date && (
        <p className="text-gray-400 text-sm mb-4">{update.frontmatter.date}</p>
      )}
      <p className="text-gray-500 mb-8">{update.frontmatter.description}</p>
      <div className="prose prose-gray max-w-none">
        <MDXRemote source={update.content} options={{ mdxOptions: { format: update.format } }} />
      </div>
    </article>
  );
}
