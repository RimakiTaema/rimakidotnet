"use client";

import { motion, type Variants } from "framer-motion";
import { profile } from "@/data/profile";
import { HeroBackground } from "./HeroBackground";
import { EASE, fadeUp } from "./motion";

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const letters: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.06 } },
};

const letter: Variants = {
	hidden: { y: "110%" },
	show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

const words: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.025 } },
};

const word: Variants = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Hero() {
	return (
		<section
			id="top"
			aria-labelledby="hero-title"
			className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-24 pt-28"
		>
			<HeroBackground />

			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="relative mx-auto w-full max-w-6xl px-5 sm:px-8"
			>
				<motion.p
					variants={fadeUp}
					className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted sm:text-sm"
				>
					<span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
					{profile.kicker}
				</motion.p>

				<motion.h1
					id="hero-title"
					variants={letters}
					aria-label={profile.name}
					className="flex overflow-hidden pb-[0.08em] text-[clamp(4.5rem,21vw,15rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
				>
					{Array.from(profile.name).map((char, i) => (
						<motion.span
							// biome-ignore lint/suspicious/noArrayIndexKey: static string split
							key={i}
							aria-hidden
							variants={letter}
							className="inline-block will-change-transform"
						>
							{char === " " ? " " : char}
						</motion.span>
					))}
				</motion.h1>

				<motion.p
					variants={fadeUp}
					className="mt-6 max-w-2xl text-balance text-2xl font-medium tracking-tight sm:mt-8 sm:text-4xl"
				>
					{profile.tagline}
				</motion.p>

				<motion.p
					variants={words}
					aria-label={profile.bio}
					className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
				>
					{profile.bio.split(" ").map((text, i) => (
						<motion.span
							// biome-ignore lint/suspicious/noArrayIndexKey: static string split
							key={i}
							aria-hidden
							variants={word}
							className="inline-block whitespace-pre"
						>
							{`${text} `}
						</motion.span>
					))}
				</motion.p>

				<motion.div
					variants={fadeUp}
					className="mt-9 flex flex-wrap items-center gap-3"
				>
					<a
						href="#projects"
						className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
					>
						See projects
					</a>
					<a
						href="#contact"
						className="rounded-full border border-line bg-surface/60 px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60"
					>
						Get in touch
					</a>
				</motion.div>
			</motion.div>

			<motion.a
				href="#projects"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.6, duration: 0.8 }}
				className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted transition-colors hover:text-fg"
			>
				Scroll
				<span aria-hidden className="block h-10 w-px overflow-hidden bg-line">
					<span className="block h-full w-full animate-cue bg-accent" />
				</span>
			</motion.a>
		</section>
	);
}
