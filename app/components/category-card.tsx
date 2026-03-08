import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  description: string;
  slug: string;
  logo?: string;
}

export default function CategoryCard({ title, description, slug, logo }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="block min-w-75 max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        {logo && (
          <Image src={logo} alt={title} width={36} height={36} className="rounded" />
        )}
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 leading-8">{title}</h5>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <span className="inline-flex items-center text-blue-600 font-medium text-sm">
        View projects
        <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
      </span>
    </Link>
  );
}
