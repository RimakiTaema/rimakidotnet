import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { profile } from "@/data/profile";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	url: profile.siteUrl,
	description: profile.bio,
	sameAs: profile.links
		.filter((link) => link.kind !== "email" && link.href)
		.map((link) => link.href),
};

export default function Home() {
	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
			>
				Skip to content
			</a>
			<Header />
			<main id="main" tabIndex={-1} className="outline-none">
				<Hero />
				<Projects />
				<Services />
			</main>
			<Contact />
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from local data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
		</>
	);
}
