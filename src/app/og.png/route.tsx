import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Open Graph image: generated once at build time from src/data/profile.ts.
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

// Served as /og.png (a real file with a .png extension in the static export).
export function GET() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: 80,
				background:
					"radial-gradient(900px 500px at 85% 0%, rgba(184,243,79,0.22), transparent 70%), #090a08",
				color: "#ecefe8",
			}}
		>
			<div style={{ display: "flex", fontSize: 28, color: "#b8f34f" }}>
				{profile.siteUrl.replace(/^https?:\/\//, "")}
			</div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						fontSize: 168,
						fontWeight: 700,
						letterSpacing: -8,
						lineHeight: 1,
					}}
				>
					{profile.name}
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 28,
						fontSize: 40,
						color: "#8f9689",
					}}
				>
					{profile.tagline}
				</div>
			</div>
		</div>,
		size,
	);
}
