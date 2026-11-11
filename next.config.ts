import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Static export: `npm run build` writes plain HTML/CSS/JS to `out/`,
	// which is what Cloudflare Pages serves.
	output: "export",
	trailingSlash: true,
	images: { unoptimized: true },
};

export default nextConfig;
