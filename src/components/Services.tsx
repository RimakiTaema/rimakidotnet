"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { fadeUp, inView, staggerContainer } from "./motion";
import { SectionHeading } from "./SectionHeading";

export function Services() {
	return (
		<section
			id="services"
			aria-labelledby="services-title"
			className="border-t border-line/60"
		>
			<div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
				<SectionHeading
					id="services-title"
					index="02"
					label="Services"
					title="What I can do for you"
				>
					Available for commissions and collaborations.
				</SectionHeading>

				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={inView}
					className="grid gap-5 sm:grid-cols-2"
				>
					{services.map((service, i) => (
						<motion.li
							key={service.title}
							variants={fadeUp}
							whileHover={{ y: -4 }}
							className="group relative overflow-hidden rounded-[20px] border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/50 sm:p-8"
						>
							<span
								aria-hidden
								className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
							/>
							<span
								aria-hidden
								className="font-mono text-xs tracking-widest text-accent"
							>
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
								{service.title}
							</h3>
							<p className="mt-3 leading-relaxed text-muted">
								{service.description}
							</p>
							<ul aria-label="Keywords" className="mt-6 flex flex-wrap gap-2">
								{service.tags.map((tag) => (
									<li
										key={tag}
										className="rounded-md bg-raised px-2 py-1 font-mono text-xs text-muted"
									>
										{tag}
									</li>
								))}
							</ul>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
