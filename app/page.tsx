"use client"

import { useEffect, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SidebarSeparator } from "@/components/ui/sidebar";
import type { Project, Category } from "@/db";
import ProjectCard from "@/components/project-card";
import CategoryCard from "@/components/category-card";
import gsap from "gsap";

export default function Home() {
    const [alertOpen, setAlertOpen] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const cardRef1 = useRef<HTMLDivElement>(null);
    const cardRef2 = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/api/projects").then((r) => r.json() as Promise<Project[]>).then(setProjects);
        fetch("/api/categories").then((r) => r.json() as Promise<Category[]>).then(setCategories);
    }, []);

    useEffect(() => {
        if (projects.length === 0 && categories.length === 0) return;
        const ctx = gsap.context(() => {
            gsap.from(cardRef1.current, {
                y: 20,
                opacity: 0,
                scale: 0.97,
                duration: 0.4,
                ease: "power3.out",
                stagger: 0.08,
            });
            gsap.from(cardRef2.current, {
                y: 20,
                opacity: 0,
                scale: 0.97,
                duration: 0.4,
                ease: "power3.out",
                stagger: 0.08,
            });
            gsap.from(pageRef.current, {
                opacity: 0,
                y: 12,
                duration: 0.4,
                ease: "power2.out",
            });
        });
        return () => ctx.revert();
    }, [projects, categories]);

    return (
        <div ref={pageRef} className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
            <div className="text-2xl font-semibold">
                Projects
            </div>
            <SidebarSeparator />
            <div ref={cardRef1} className="mt-4">
                <div className="flex flex-row gap-3 overflow-x-auto">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
            <div className="text-2xl font-semibold">
                Categories
            </div>
            <SidebarSeparator />
            <div ref={cardRef2} className="mt-4">
                <div className="flex flex-row gap-3 overflow-x-auto">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} {...category} />
                    ))}
                </div>
            </div>
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Website Under Rewrite...</AlertDialogTitle>
                        <AlertDialogDescription>
                            Sorry In Advance I&#39;m On Rewriting Website to Better Theme
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>
                            Acknowledge
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
