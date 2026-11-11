import type { SVGProps } from "react";
import type { ContactKind } from "@/data/profile";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
	width: 20,
	height: 20,
	viewBox: "0 0 24 24",
	"aria-hidden": true,
	focusable: false,
} as const;

const stroke = {
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.75,
	strokeLinecap: "round",
	strokeLinejoin: "round",
} as const;

export function GitHubIcon(props: IconProps) {
	return (
		<svg {...base} fill="currentColor" {...props}>
			<path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.96c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.25C22 6.580 17.52 2 12 2Z" />
		</svg>
	);
}

export function DiscordIcon(props: IconProps) {
	return (
		<svg {...base} fill="currentColor" {...props}>
			<path d="M19.27 5.33A17.4 17.4 0 0 0 14.94 4l-.2.4c1.6.4 2.34.96 3.11 1.57a12.6 12.6 0 0 0-11.7 0C6.92 5.360 7.800 4.770 9.260 4.400L9.060 4a17.400 17.400 0 0 0-4.330 1.330C2 9.390 1.250 13.350 1.620 17.250a17.600 17.600 0 0 0 5.320 2.700l1.140-1.860c-.620-.230-1.220-.520-1.780-.860l.440-.340a12.500 12.500 0 0 0 10.520 0l.440.340c-.560.340-1.160.630-1.780.860l1.140 1.860a17.500 17.500 0 0 0 5.320-2.700c.440-4.520-.750-8.440-3.110-11.920ZM8.680 14.810c-1.030 0-1.870-.950-1.870-2.110s.820-2.110 1.870-2.110 1.890.950 1.870 2.110c0 1.160-.830 2.110-1.870 2.110Zm6.640 0c-1.030 0-1.870-.950-1.870-2.110s.820-2.110 1.870-2.110 1.890.950 1.870 2.110c0 1.160-.820 2.110-1.870 2.110Z" />
		</svg>
	);
}

export function MailIcon(props: IconProps) {
	return (
		<svg {...base} {...stroke} {...props}>
			<rect x="3" y="5" width="18" height="14" rx="2.5" />
			<path d="m4 7.500 8 6 8-6" />
		</svg>
	);
}

export function ArrowUpRightIcon(props: IconProps) {
	return (
		<svg {...base} {...stroke} {...props}>
			<path d="M7 17 17 7M8.500 7H17v8.500" />
		</svg>
	);
}

export function ArrowUpIcon(props: IconProps) {
	return (
		<svg {...base} {...stroke} {...props}>
			<path d="M12 19V5M6 11l6-6 6 6" />
		</svg>
	);
}

export function CloseIcon(props: IconProps) {
	return (
		<svg {...base} {...stroke} {...props}>
			<path d="M6 6l12 12M18 6 6 18" />
		</svg>
	);
}

export function CheckIcon(props: IconProps) {
	return (
		<svg {...base} {...stroke} strokeWidth={2.5} {...props}>
			<path d="m5 12.500 4.500 4.500L19 7.500" />
		</svg>
	);
}

export const contactIcons: Record<
	ContactKind,
	(props: IconProps) => React.JSX.Element
> = {
	github: GitHubIcon,
	discord: DiscordIcon,
	email: MailIcon,
};
