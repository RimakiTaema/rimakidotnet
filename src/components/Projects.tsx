"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import { inView, staggerContainer } from "./motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
	const [openSlug, setOpenSlug] = useState<string | null>(null);
	const openProject = projects.find((project) => project.slug === openSlug);

	return (
		<section
			id="projects"
			aria-labelledby="projects-title"
			className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
		>
			<SectionHeading
				id="projects-title"
				index="01"
				label="Projects"
				title="Things I'm building"
			>
				Select a project for its overview, roadmap and changelog.
			</SectionHeading>

			<motion.ul
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
				viewport={inView}
				className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
			>
				{projects.map((project) => (
					<ProjectCard
						key={project.slug}
						project={project}
						onOpen={setOpenSlug}
					/>
				))}
			</motion.ul>

			<AnimatePresence>
				{openProject ? (
					<ProjectModal
						key={openProject.slug}
						project={openProject}
						onClose={() => setOpenSlug(null)}
					/>
				) : null}
			</AnimatePresence>
		</section>
	);
}
