"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/data/profile";

const nav = [
	{ href: "#projects", label: "Projects" },
	{ href: "#services", label: "Services" },
	{ href: "#contact", label: "Contact" },
];

export function Header() {
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

	return (
		<header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
				<a
					href="#top"
					className="font-mono text-sm font-medium tracking-tight"
					aria-label={`${profile.name}, back to top`}
				>
					<span className="text-accent">~/</span>
					{profile.name.toLowerCase()}
				</a>
				<nav aria-label="Sections">
					<ul className="flex items-center gap-4 text-sm text-muted sm:gap-7">
						{nav.map((item) => (
							<li key={item.href}>
								<a href={item.href} className="transition-colors hover:text-fg">
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<motion.div
				aria-hidden
				style={{ scaleX: progress }}
				className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
			/>
		</header>
	);
}
