// components/footer.tsx
import Link from "next/link";
import { navItems } from "@/lib/navigation";

export default function Footer() {
    return (
        <footer className="w-full border-t border-slate-200 bg-slate-50 mt-auto">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-sky-600 font-bold text-xl">
                            Rimaki&#39;s Projects
                        </Link>
                        <p className="text-slate-500 text-sm mt-2 max-w-xs">
                            A collection of projects and experiments.
                        </p>
                    </div>

                    {/* Nav links */}
                    <div>
                        <h3 className="text-slate-700 font-semibold mb-2">Pages</h3>
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-slate-500 hover:text-sky-500 text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials / external links */}
                    <div>
                        <h3 className="text-slate-700 font-semibold mb-2">Links</h3>
                        <ul className="flex flex-col gap-1">
                            <li>
                                <a
                                    href="https://github.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-sky-500 text-sm"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://status.rimaki.net/status/rimakibackend"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-sky-500 text-sm"
                                >
                                    Status
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-4 border-t border-slate-200 text-center text-slate-400 text-sm">
                    © {new Date().getFullYear()} Rimaki. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
