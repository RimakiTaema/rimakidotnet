/**
 * Everything about you that the site shows: hero text, SEO metadata and
 * contact links. Edit this file; no component changes needed.
 *
 * Anything marked PLACEHOLDER is a guess or a blank to fill in.
 */

export type ContactKind = "github" | "discord" | "email";

export type ContactLink = {
	kind: ContactKind;
	label: string;
	/** Text shown on the link, e.g. a username or address. */
	value: string;
	/** Leave out to render the entry as plain text (used for placeholders). */
	href?: string;
};

export type Profile = {
	name: string;
	/** Small line above the name in the hero. */
	kicker: string;
	/** One-liner used in the hero and as the SEO description. */
	tagline: string;
	/** Short bio paragraph in the hero. */
	bio: string;
	/** Canonical site URL, no trailing slash. Used for SEO / Open Graph. */
	siteUrl: string;
	/** Shown in the contact section heading. */
	contactBlurb: string;
	links: ContactLink[];
};

export const profile: Profile = {
	name: "Rimaki",
	kicker: "Developer · Minecraft & apps",
	tagline: "I build Minecraft tooling, launchers and servers.",
	// PLACEHOLDER bio: written from the project list, rewrite in your own words.
	bio: "I'm Rimaki. I write plugins and mods, run servers, and build the apps around them, from native clients to launchers.",
	siteUrl: "https://rimaki.net",
	contactBlurb:
		"Have a server, plugin or app in mind? Send a message and tell me what you need.",
	links: [
		{
			kind: "github",
			label: "GitHub",
			value: "RimakiTaema",
			href: "https://github.com/RimakiTaema",
		},
		{
			kind: "discord",
			label: "Discord",
			// PLACEHOLDER: set your handle, and add an `href` (profile or invite link).
			value: "[placeholder: Discord handle]",
		},
		{
			kind: "email",
			label: "Email",
			// PLACEHOLDER: set your address and add `href: "mailto:you@rimaki.net"`.
			value: "[placeholder: email address]",
		},
	],
};
