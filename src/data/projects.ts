/**
 * Projects shown in the grid and in the detail modal.
 * Add a project by appending an object to `projects`.
 *
 * Anything marked PLACEHOLDER is unknown and waiting for real details.
 * No version numbers or dates here are real until you fill them in.
 */

export type ProjectStatus = "active" | "in-development" | "paused" | "archived";

export type RoadmapStatus = "done" | "in-progress" | "planned";

export type RoadmapItem = {
	item: string;
	status: RoadmapStatus;
};

export type ChangelogEntry = {
	version: string;
	/** Any readable date string, shown as written (e.g. "2026-01-31"). */
	date: string;
	notes: string[];
};

export type Project = {
	/** Unique id, lowercase with dashes. Used for animation keys. */
	slug: string;
	name: string;
	tagline: string;
	/** Overview tab. One string per paragraph. */
	description: string[];
	status: ProjectStatus;
	tags: string[];
	/** `null` hides the "View on GitHub" button. */
	githubUrl: string | null;
	roadmap: RoadmapItem[];
	changelog: ChangelogEntry[];
};

export const projects: Project[] = [
	{
		slug: "exaton",
		name: "ExaTon",
		tagline: "A native client for exaroton servers.",
		description: [
			"ExaTon is a native exaroton server client: manage your servers from an app instead of the web panel.",
			'Version 1.6, the "next gen" release, is the current focus. It brings mobile support, a credit pool and a rewrite in Flutter.',
			"[Placeholder: add more detail about features, platforms and how to install.]",
		],
		// PLACEHOLDER status: confirm.
		status: "in-development",
		tags: ["exaroton", "Flutter", "Native client"],
		githubUrl: "https://github.com/RimakiTaema/ExaTon",
		roadmap: [
			// PLACEHOLDER statuses: all three are 1.6 goals, set each to
			// "done" | "in-progress" | "planned" as they really stand.
			{ item: '1.6 "next gen": Flutter rewrite', status: "planned" },
			{ item: '1.6 "next gen": mobile support', status: "planned" },
			{ item: '1.6 "next gen": credit pool', status: "planned" },
		],
		changelog: [
			// PLACEHOLDER entry showing the format. Replace with real releases.
			{
				version: "[version]",
				date: "[release date]",
				notes: ["[Placeholder: what changed in this release.]"],
			},
		],
	},
	{
		slug: "reality-launcher",
		name: "Reality Launcher",
		tagline: "A Minecraft launcher.",
		description: [
			"Reality Launcher is a Minecraft launcher, developed under catlab-design.",
			"[Placeholder: describe what sets it apart, supported platforms and mod loaders, and your role in the project.]",
		],
		// PLACEHOLDER status: confirm.
		status: "active",
		tags: ["Minecraft", "Launcher"],
		githubUrl: "https://github.com/catlab-design/realitylauncher-client",
		roadmap: [{ item: "[Placeholder: roadmap item]", status: "planned" }],
		changelog: [],
	},
	{
		slug: "altarffa-network",
		name: "AltarFFA Network",
		tagline: "A Minecraft FFA server.",
		description: [
			"AltarFFA Network is a Minecraft free-for-all PvP server.",
			"[Placeholder: add the server address, supported versions, game modes and what you run or build for it.]",
		],
		// PLACEHOLDER status: confirm.
		status: "active",
		tags: ["Minecraft", "Server", "FFA", "PvP"],
		// PLACEHOLDER: no public repository known. Set a URL to show the button.
		githubUrl: null,
		roadmap: [{ item: "[Placeholder: roadmap item]", status: "planned" }],
		changelog: [],
	},
];
