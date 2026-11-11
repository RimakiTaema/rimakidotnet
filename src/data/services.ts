/**
 * Things you're available to do. Add, remove or reorder freely.
 * Descriptions are drafts: adjust them to what you actually offer.
 */

export type Service = {
	title: string;
	description: string;
	/** Short keywords shown as chips under the description. */
	tags: string[];
};

export const services: Service[] = [
	{
		title: "Minecraft plugin development",
		description:
			"Custom server-side plugins: gameplay mechanics, minigames, commands, economy and admin tooling.",
		tags: ["Paper", "Spigot", "Java"],
	},
	{
		title: "Mod development",
		description:
			"Client and server mods, from small tweaks to full features, plus fixes and ports of existing mods.",
		tags: ["Forge", "Java"],
	},
	{
		title: "Server setup",
		description:
			"Getting a server or network running properly: installation, configuration, plugins, permissions and performance tuning.",
		tags: ["Paper", "Networks", "Configuration"],
	},
	{
		title: "App development",
		description:
			"Desktop and mobile apps, companion tools and API clients built around your project or community.",
		tags: ["Desktop", "Mobile", "APIs"],
	},
];
