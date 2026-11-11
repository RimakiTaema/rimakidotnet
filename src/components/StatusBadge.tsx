import type { ProjectStatus } from "@/data/projects";

const labels: Record<ProjectStatus, string> = {
	active: "Active",
	"in-development": "In development",
	paused: "Paused",
	archived: "Archived",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
	const live = status === "active" || status === "in-development";
	return (
		<span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
			<span
				aria-hidden
				className={`h-1.5 w-1.5 rounded-full ${live ? "bg-accent" : "bg-muted/60"}`}
			/>
			{labels[status]}
		</span>
	);
}
