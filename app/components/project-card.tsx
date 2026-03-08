import Image from "next/image";
import Link from "next/link";
import type { CustomButton } from "@/app/lib/projects";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  github?: string;
  ip?: string;
  website?: string;
  image?: string;
  logo?: string;
  buttons?: readonly CustomButton[];
}

export default function ProjectCard({ title, description, slug, github, ip, website, image, logo, buttons }: ProjectCardProps) {
  return (
    <div className="min-w-75 max-w-sm border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col">
      {image && (
        <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-3">
        {logo && (
          <Image src={logo} alt={title} width={36} height={36} className="rounded" />
        )}
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 leading-8">{title}</h5>
      </div>
      <p className="text-gray-600 mb-4 flex-1">{description}</p>
      <div className="flex flex-col gap-2">
        <Link
          href={`/projects/${slug}`}
          className="flex items-center justify-center w-full text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-lg text-sm py-2.5 focus:outline-none"
        >
          View project
          <svg className="w-4 h-4 ms-1.5" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
        </Link>
        <div className="flex flex-wrap gap-2">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {ip && (
            <button onClick={undefined} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg" title={ip}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {ip}
            </button>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
              Website
            </a>
          )}
          {buttons?.map((btn) => (
            <a key={btn.label} href={btn.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
              {btn.logo ? (
                <Image src={btn.logo} alt={btn.label} width={16} height={16} className="rounded-sm" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
              )}
              {btn.label}
            </a>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
