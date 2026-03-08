import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/app/lib/categories";
import { getProjectsByCategorySlug } from "@/app/lib/projects";

export const metadata = {
  title: "Categories",
  description: "Browse all project categories",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        &larr; Back to home
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
      <p className="text-gray-500 mb-8">Browse all project categories</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const projectCount = getProjectsByCategorySlug(category.slug).length;
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                {category.logo && (
                  <Image src={category.logo} alt={category.title} width={36} height={36} className="rounded" />
                )}
                <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <span className="text-xs text-gray-400">{projectCount} {projectCount === 1 ? "project" : "projects"}</span>
            </Link>
          );
        })}
      </div>
      {categories.length === 0 && (
        <p className="text-gray-400">No categories yet.</p>
      )}
    </div>
  );
}
