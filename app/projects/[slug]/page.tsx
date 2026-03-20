"use client"

export const runtime = "edge";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useParams } from "next/navigation";

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<{
        title: string;
        description: string;
        tags: string | null;
        href: string | null;
    } | null>(null);
    const [error, setError] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`/api/projects/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json() as Promise<{ project: typeof project }>;
            })
            .then((data) => {
                setProject(data.project);
            })
            .catch(() => setError(true));
    }, [slug]);

    useEffect(() => {
        if (!project) return;
        const ctx = gsap.context(() => {
            gsap.from(pageRef.current, {
                opacity: 0,
                y: 12,
                duration: 0.4,
                ease: "power2.out",
            });
        });
        return () => ctx.revert();
    }, [project]);

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
                <p className="text-gray-500">Project not found.</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    const tags: string[] = project.tags ? JSON.parse(project.tags) : [];

    return (
        <div ref={pageRef} className="min-h-screen bg-zinc-50 dark:bg-black p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
                <p className="text-lg text-gray-600 mt-2">{project.description}</p>
                {tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {tags.map((tag) => (
                            <span key={tag} className="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                {project.href && (
                    <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-sky-600 hover:text-sky-500 underline"
                    >
                        View Project
                    </a>
                )}
            </div>
        </div>
    );
}
