"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import type {
	ChangelogEntry,
	Project,
	RoadmapItem,
	RoadmapStatus,
} from "@/data/projects";
import { CheckIcon, CloseIcon, GitHubIcon } from "./Icons";
import { EASE } from "./motion";
import { StatusBadge } from "./StatusBadge";

const TABS = ["Overview", "Roadmap", "Changelog"] as const;
type Tab = (typeof TABS)[number];

const FOCUSABLE =
	'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

type Props = {
	project: Project;
	onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [tab, setTab] = useState<Tab>("Overview");
	const lenis = useLenis();
	const id = useId();
	const titleId = `${id}-title`;

	// Move focus in on open, hand it back to the card on close.
	useEffect(() => {
		const previous = document.activeElement as HTMLElement | null;
		closeRef.current?.focus({ preventScroll: true });
		return () => previous?.focus({ preventScroll: true });
	}, []);

	// Lock page scroll while the dialog is open.
	useEffect(() => {
		const root = document.documentElement;
		const previous = root.style.overflow;
		root.style.overflow = "hidden";
		lenis?.stop();
		return () => {
			root.style.overflow = previous;
			lenis?.start();
		};
	}, [lenis]);

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") {
			event.stopPropagation();
			onClose();
			return;
		}
		if (event.key !== "Tab") return;

		// Focus trap: wrap around at either end of the dialog.
		const focusable = Array.from(
			dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
		);
		if (focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const active = document.activeElement;

		if (
			event.shiftKey &&
			(active === first || !dialogRef.current?.contains(active))
		) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	};

	const handleTabKeys = (event: KeyboardEvent<HTMLDivElement>) => {
		const current = TABS.indexOf(tab);
		let next = current;
		if (event.key === "ArrowRight") next = (current + 1) % TABS.length;
		else if (event.key === "ArrowLeft")
			next = (current - 1 + TABS.length) % TABS.length;
		else if (event.key === "Home") next = 0;
		else if (event.key === "End") next = TABS.length - 1;
		else return;
		event.preventDefault();
		setTab(TABS[next]);
		tabRefs.current[next]?.focus();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
			onKeyDown={handleKeyDown}
		>
			<motion.div
				aria-hidden
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25 }}
				className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
			/>

			<motion.div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				layoutId={`project-${project.slug}`}
				style={{ borderRadius: 20 }}
				transition={{ duration: 0.45, ease: EASE }}
				className="relative flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden border border-line bg-surface shadow-2xl shadow-black/60 max-sm:!rounded-b-none"
			>
				<header className="px-6 pt-6 sm:px-8 sm:pt-8">
					<div className="flex items-start justify-between gap-4">
						<StatusBadge status={project.status} />
						<button
							ref={closeRef}
							type="button"
							onClick={onClose}
							aria-label="Close project details"
							className="-mr-2 -mt-2 grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-fg"
						>
							<CloseIcon />
						</button>
					</div>
					<motion.h3
						id={titleId}
						layoutId={`project-title-${project.slug}`}
						transition={{ duration: 0.45, ease: EASE }}
						className="mt-4 w-fit text-3xl font-semibold tracking-tight sm:text-4xl"
					>
						{project.name}
					</motion.h3>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.1 } }}
						transition={{ delay: 0.15, duration: 0.3 }}
						className="mt-2 text-muted"
					>
						{project.tagline}
					</motion.p>
				</header>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 0.1 } }}
					transition={{ delay: 0.2, duration: 0.3 }}
					className="flex min-h-0 flex-1 flex-col"
				>
					<div
						role="tablist"
						aria-label={`${project.name} details`}
						onKeyDown={handleTabKeys}
						className="mt-6 flex gap-1 border-b border-line px-4 sm:px-6"
					>
						{TABS.map((name, i) => {
							const selected = name === tab;
							return (
								<button
									key={name}
									ref={(node) => {
										tabRefs.current[i] = node;
									}}
									type="button"
									role="tab"
									id={`${id}-tab-${name}`}
									aria-selected={selected}
									aria-controls={`${id}-panel`}
									tabIndex={selected ? 0 : -1}
									onClick={() => setTab(name)}
									className={`relative px-3 py-3 text-sm font-medium transition-colors ${
										selected ? "text-fg" : "text-muted hover:text-fg"
									}`}
								>
									{name}
									{selected ? (
										<motion.span
											layoutId={`${id}-tab-indicator`}
											aria-hidden
											className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
										/>
									) : null}
								</button>
							);
						})}
					</div>

					<div
						role="tabpanel"
						id={`${id}-panel`}
						aria-labelledby={`${id}-tab-${tab}`}
						// biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable panel must be keyboard reachable
						tabIndex={0}
						data-lenis-prevent
						className="min-h-[14rem] flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8"
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={tab}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.2, ease: EASE }}
							>
								{tab === "Overview" ? <Overview project={project} /> : null}
								{tab === "Roadmap" ? <Roadmap items={project.roadmap} /> : null}
								{tab === "Changelog" ? (
									<Changelog entries={project.changelog} />
								) : null}
							</motion.div>
						</AnimatePresence>
					</div>

					<footer className="flex items-center justify-between gap-4 border-t border-line px-6 py-4 sm:px-8">
						{project.githubUrl ? (
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
							>
								<GitHubIcon width={18} height={18} />
								View on GitHub
								<span className="sr-only"> (opens in a new tab)</span>
							</a>
						) : (
							<p className="text-sm text-muted">No public repository.</p>
						)}
						<kbd className="hidden rounded-md border border-line px-2 py-1 font-mono text-xs text-muted sm:block">
							Esc
						</kbd>
					</footer>
				</motion.div>
			</motion.div>
		</div>
	);
}

function Overview({ project }: { project: Project }) {
	return (
		<div>
			<div className="space-y-4 leading-relaxed text-fg/90">
				{project.description.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
			<ul aria-label="Tags" className="mt-6 flex flex-wrap gap-2">
				{project.tags.map((tag) => (
					<li
						key={tag}
						className="rounded-md bg-raised px-2 py-1 font-mono text-xs text-muted"
					>
						{tag}
					</li>
				))}
			</ul>
		</div>
	);
}

const roadmapLabels: Record<RoadmapStatus, string> = {
	done: "Done",
	"in-progress": "In progress",
	planned: "Planned",
};

function RoadmapMarker({ status }: { status: RoadmapStatus }) {
	if (status === "done") {
		return (
			<span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-bg">
				<CheckIcon width={12} height={12} />
			</span>
		);
	}
	if (status === "in-progress") {
		return (
			<span className="grid h-5 w-5 place-items-center rounded-full border-2 border-accent">
				<span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
			</span>
		);
	}
	return (
		<span className="h-5 w-5 rounded-full border-2 border-dashed border-muted/50" />
	);
}

function Roadmap({ items }: { items: RoadmapItem[] }) {
	if (items.length === 0) return <Empty>No roadmap items yet.</Empty>;
	return (
		<ul className="space-y-1">
			{items.map((entry) => (
				<li
					key={entry.item}
					className="flex items-center gap-4 rounded-xl px-1 py-3"
				>
					<span aria-hidden className="shrink-0">
						<RoadmapMarker status={entry.status} />
					</span>
					<span
						className={`flex-1 ${entry.status === "done" ? "text-muted" : ""}`}
					>
						{entry.item}
					</span>
					<span
						className={`shrink-0 font-mono text-[0.68rem] uppercase tracking-wider ${
							entry.status === "in-progress" ? "text-accent" : "text-muted"
						}`}
					>
						{roadmapLabels[entry.status]}
					</span>
				</li>
			))}
		</ul>
	);
}

function Changelog({ entries }: { entries: ChangelogEntry[] }) {
	if (entries.length === 0) return <Empty>No changelog entries yet.</Empty>;
	return (
		<ol className="space-y-8 border-l border-line pl-6">
			{entries.map((entry) => (
				<li key={`${entry.version}-${entry.date}`} className="relative">
					<span
						aria-hidden
						className="absolute -left-[1.8rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-surface"
					/>
					<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
						<h4 className="font-mono text-sm font-medium">{entry.version}</h4>
						<span className="font-mono text-xs text-muted">{entry.date}</span>
					</div>
					<ul className="mt-3 list-disc space-y-1.5 pl-4 text-fg/90 marker:text-muted">
						{entry.notes.map((note) => (
							<li key={note}>{note}</li>
						))}
					</ul>
				</li>
			))}
		</ol>
	);
}

function Empty({ children }: { children: React.ReactNode }) {
	return (
		<p className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
			{children}
		</p>
	);
}
