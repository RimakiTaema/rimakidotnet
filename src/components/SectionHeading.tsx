"use client";

import { motion } from "framer-motion";
import { fadeUp, inView, staggerContainer } from "./motion";

type Props = {
	index: string;
	label: string;
	title: string;
	/** id for the <h2>, referenced by the section's aria-labelledby. */
	id: string;
	children?: React.ReactNode;
};

export function SectionHeading({ index, label, title, id, children }: Props) {
	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			whileInView="show"
			viewport={inView}
			className="mb-10 max-w-2xl sm:mb-14"
		>
			<motion.p
				variants={fadeUp}
				className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"
			>
				<span className="text-accent">{index}</span>
				<span aria-hidden className="h-px w-8 bg-line" />
				{label}
			</motion.p>
			<motion.h2
				id={id}
				variants={fadeUp}
				className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
			>
				{title}
			</motion.h2>
			{children ? (
				<motion.p
					variants={fadeUp}
					className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg"
				>
					{children}
				</motion.p>
			) : null}
		</motion.div>
	);
}
