"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number; r: number };

const LINK_DISTANCE = 130;

/**
 * Slow drifting gradient plus a sparse particle field drawn on a canvas.
 * Pauses when off-screen or when the tab is hidden; with reduced motion it
 * draws a single still frame.
 */
export function HeroBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const accent =
			getComputedStyle(document.documentElement)
				.getPropertyValue("--color-accent")
				.trim() || "#b8f34f";

		let width = 0;
		let height = 0;
		let dots: Dot[] = [];
		let frame = 0;
		let visible = true;

		const seed = () => {
			const count = Math.min(70, Math.round((width * height) / 16000));
			dots = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.25,
				vy: (Math.random() - 0.5) * 0.25,
				r: Math.random() * 1.4 + 0.6,
			}));
		};

		const draw = () => {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = accent;
			ctx.strokeStyle = accent;
			ctx.lineWidth = 1;

			for (let i = 0; i < dots.length; i++) {
				const a = dots[i];
				ctx.globalAlpha = 0.55;
				ctx.beginPath();
				ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
				ctx.fill();

				for (let j = i + 1; j < dots.length; j++) {
					const b = dots[j];
					const dist = Math.hypot(a.x - b.x, a.y - b.y);
					if (dist < LINK_DISTANCE) {
						ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.14;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}
			ctx.globalAlpha = 1;
		};

		const step = () => {
			for (const dot of dots) {
				dot.x += dot.vx;
				dot.y += dot.vy;
				if (dot.x < -10) dot.x = width + 10;
				if (dot.x > width + 10) dot.x = -10;
				if (dot.y < -10) dot.y = height + 10;
				if (dot.y > height + 10) dot.y = -10;
			}
			draw();
			frame = requestAnimationFrame(step);
		};

		const start = () => {
			cancelAnimationFrame(frame);
			if (reduceMotion || !visible || document.hidden) {
				draw();
				return;
			}
			frame = requestAnimationFrame(step);
		};

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			seed();
			start();
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);

		const intersectionObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			start();
		});
		intersectionObserver.observe(canvas);

		document.addEventListener("visibilitychange", start);

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			document.removeEventListener("visibilitychange", start);
		};
	}, [reduceMotion]);

	return (
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			<div className="absolute -right-[20%] -top-[30%] h-[80vmax] w-[80vmax] animate-drift rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent)] blur-2xl" />
			<div className="absolute -bottom-[45%] -left-[25%] h-[70vmax] w-[70vmax] animate-drift rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent)] blur-2xl [animation-delay:-9s] [animation-direction:alternate-reverse]" />
			<canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
			<div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
		</div>
	);
}
