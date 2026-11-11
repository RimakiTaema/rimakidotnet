"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { profile } from "@/data/profile";
import { ArrowUpIcon, ArrowUpRightIcon, contactIcons } from "./Icons";
import { fadeUp, inView, staggerContainer } from "./motion";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
	const lenis = useLenis();

	const backToTop = () => {
		if (lenis) lenis.scrollTo(0);
		else window.scrollTo({ top: 0 });
		document.getElementById("main")?.focus({ preventScroll: true });
	};

	return (
		<footer
			id="contact"
			aria-labelledby="contact-title"
			className="border-t border-line/60"
		>
			<div className="mx-auto max-w-6xl px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
				<SectionHeading
					id="contact-title"
					index="03"
					label="Contact"
					title="Let's talk"
				>
					{profile.contactBlurb}
				</SectionHeading>

				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={inView}
					className="grid gap-4 sm:grid-cols-3"
				>
					{profile.links.map((link) => {
						const Icon = contactIcons[link.kind];
						const body = (
							<>
								<span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-raised text-fg transition-colors group-hover:bg-accent group-hover:text-bg">
									<Icon />
								</span>
								<span className="min-w-0 flex-1">
									<span className="block font-mono text-[0.68rem] uppercase tracking-wider text-muted">
										{link.label}
									</span>
									<span className="block truncate font-medium">
										{link.value}
									</span>
								</span>
							</>
						);
						const external = link.href?.startsWith("http");
						return (
							<motion.li key={link.kind} variants={fadeUp}>
								{link.href ? (
									<a
										href={link.href}
										{...(external
											? { target: "_blank", rel: "noopener noreferrer me" }
											: {})}
										className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/50"
									>
										{body}
										<ArrowUpRightIcon className="shrink-0 text-muted transition-colors group-hover:text-accent" />
									</a>
								) : (
									<div className="flex items-center gap-4 rounded-2xl border border-dashed border-line p-4 text-muted">
										{body}
									</div>
								)}
							</motion.li>
						);
					})}
				</motion.ul>

				<div className="mt-20 flex items-center justify-between gap-4 border-t border-line/60 pt-8 text-sm text-muted">
					<p>
						© {new Date().getFullYear()} {profile.name}
					</p>
					<button
						type="button"
						onClick={backToTop}
						className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 transition-colors hover:border-accent/60 hover:text-fg"
					>
						Back to top
						<ArrowUpIcon
							width={16}
							height={16}
							className="transition-transform group-hover:-translate-y-0.5"
						/>
					</button>
				</div>
			</div>
		</footer>
	);
}
