"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Global motion setup:
 * - Framer Motion drops transform/layout animations when the visitor
 *   prefers reduced motion (opacity fades stay).
 * - Lenis smooth scrolling is only mounted when motion is allowed.
 */
export function Providers({ children }: { children: ReactNode }) {
	const reduceMotion = useReducedMotion();

	return (
		<MotionConfig reducedMotion="user">
			{reduceMotion ? (
				children
			) : (
				<ReactLenis root options={{ lerp: 0.1, anchors: true }}>
					{children}
				</ReactLenis>
			)}
		</MotionConfig>
	);
}
