"use client";

import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from "framer-motion";
import type { PointerEvent } from "react";
import type { Project } from "@/data/projects";
import { ArrowUpRightIcon } from "./Icons";
import { fadeUp } from "./motion";
import { StatusBadge } from "./StatusBadge";

const MAX_TILT = 6;
const spring = { stiffness: 220, damping: 20, mass: 0.6 };

type Props = {
	project: Project;
	onOpen: (slug: string) => void;
};

export function ProjectCard({ project, onOpen }: Props) {
	const reduceMotion = useReducedMotion();

	const rotateX = useSpring(0, spring);
	const rotateY = useSpring(0, spring);
	const glowX = useMotionValue(50);
	const glowY = useMotionValue(0);
	const glow = useMotionTemplate`radial-gradient(360px circle at ${glowX}% ${glowY}%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 70%)`;

	const handleMove = (event: PointerEvent<HTMLDivElement>) => {
		if (event.pointerType !== "mouse") return;
		const rect = event.currentTarget.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width;
		const y = (event.clientY - rect.top) / rect.height;
		glowX.set(x * 100);
		glowY.set(y * 100);
		if (reduceMotion) return;
		rotateX.set((0.5 - y) * MAX_TILT * 2);
		rotateY.set((x - 0.5) * MAX_TILT * 2);
	};

	const handleLeave = () => {
		rotateX.set(0);
		rotateY.set(0);
	};

	return (
		<motion.li variants={fadeUp} className="[perspective:1000px]">
			<motion.div
				onPointerMove={handleMove}
				onPointerLeave={handleLeave}
				style={{ rotateX, rotateY }}
				className="h-full"
			>
				<motion.article
					layoutId={`project-${project.slug}`}
					style={{ borderRadius: 20 }}
					className="group relative flex h-full flex-col overflow-hidden border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/50 focus-within:border-accent/50 sm:p-7"
				>
					<motion.div
						aria-hidden
						style={{ background: glow }}
						className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					/>

					<div className="relative flex items-start justify-between gap-4">
						<StatusBadge status={project.status} />
						<ArrowUpRightIcon className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
					</div>

					<motion.h3
						layoutId={`project-title-${project.slug}`}
						className="relative mt-10 w-fit text-2xl font-semibold tracking-tight"
					>
						<button
							type="button"
							onClick={() => onOpen(project.slug)}
							aria-haspopup="dialog"
							className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
						>
							{project.name}
							<span className="sr-only">: open project details</span>
						</button>
					</motion.h3>

					<p className="relative mt-2 text-muted">{project.tagline}</p>

					<ul
						aria-label="Tags"
						className="relative mt-auto flex flex-wrap gap-2 pt-8"
					>
						{project.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-md bg-raised px-2 py-1 font-mono text-xs text-muted"
							>
								{tag}
							</li>
						))}
					</ul>
				</motion.article>
			</motion.div>
		</motion.li>
	);
}
