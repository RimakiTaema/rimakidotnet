import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Parent: staggers its children when it scrolls into view. */
export const staggerContainer: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Child: fade + slide up. */
export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 28 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const inView = { once: true, margin: "0px 0px -12% 0px" } as const;
