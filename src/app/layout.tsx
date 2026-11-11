import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/Providers";
import { profile } from "@/data/profile";
import "./globals.css";

const ogImage = {
	url: "/og.png",
	width: 1200,
	height: 630,
	alt: `${profile.name} · ${profile.tagline}`,
};

const title = `${profile.name} · ${profile.tagline}`;

export const metadata: Metadata = {
	metadataBase: new URL(profile.siteUrl),
	title: {
		default: title,
		template: `%s · ${profile.name}`,
	},
	description: profile.bio,
	applicationName: profile.name,
	authors: [{ name: profile.name, url: profile.siteUrl }],
	creator: profile.name,
	keywords: [
		profile.name,
		"Minecraft plugin developer",
		"Minecraft mod developer",
		"Paper",
		"Forge",
		"server setup",
		"app development",
	],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		siteName: profile.name,
		title,
		description: profile.bio,
		locale: "en_US",
		images: [ogImage],
	},
	twitter: {
		card: "summary_large_image",
		title,
		description: profile.bio,
		images: [ogImage],
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: "#090a08",
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
		>
			<body className="min-h-dvh font-sans">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
