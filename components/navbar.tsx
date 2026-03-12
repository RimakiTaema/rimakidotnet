"use client"

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export const navItems = [
    { name: "Home", href: "/"},
    { name: "Projects", href: "/categories"},
    { name: "About", href: "/about"},
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="flex w-full items-center justify-between text-slate-800">
                    <Link
                        href="/"
                        className="mr-4 block cursor-pointer py-1.5 text-sky-200 font-bold text-2xl"
                    >
                        Rimaki&#39;s Projects
                    </Link>
                    <div className="lg:hidden">
                        <button
                            className="p-2 rounded-lg text-inherit hover:bg-slate-100"
                            onClick={toggleMobileMenu}
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div
                            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                            onClick={toggleMobileMenu}
                        />
                    )}

                    {/* Mobile Menu */}
                    <div className={`fixed top-0 left-0 h-full w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:hidden z-50 overflow-y-auto`}>
                        <div className="flex items-center justify-between p-4">
                            <Link
                                href="/"
                                className="cursor-pointer text-sky-600 font-bold text-xl"
                            >
                            Rimaki&#39;s Projects
                            </Link>
                            <button
                                onClick={toggleMobileMenu}
                                className="text-slate-600 hover:text-sky-500"
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                    <path 
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <ul>
                            {navItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-sky-500"
                                >
                                    <Link href={item.href} onClick={toggleMobileMenu}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Button className="w-full rounded-md h-8">
                                    Status
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <ul className="flex flex-row gap-4">
                            {navItems.map((item, index) => (
                                <li key={index} className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-sky-500">
                                    <Link href={item.href} className="flex items-center">
                                    {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Button className="w-full rounded-md h-8">
                                    Status
                                </Button>
                            </li>
                        </ul>
                    </div>

        </nav>
    )
}