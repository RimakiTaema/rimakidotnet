"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  main?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/catagories" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact", main: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainItem = navItems.find((item) => item.main);
  const miniItems = navItems.filter((item) => !item.main);

  return (
    <nav className="bg-gray-50 shadow-md p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-black text-2xl font-bold">
          RimakiProjects
        </Link>

        {/* Desktop: all links + main button */}
        <div className="hidden md:flex items-center space-x-4">
          {miniItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-700 hover:text-black">
              {item.label}
            </Link>
          ))}
          {mainItem && (
            <Link href={mainItem.href} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
              {mainItem.label}
            </Link>
          )}
        </div>

        {/* Mobile: main button + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {mainItem && (
            <Link href={mainItem.href} className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
              {mainItem.label}
            </Link>
          )}
          <button className="text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown: mini items only */}
      {isMenuOpen && (
        <ul className="flex flex-col md:hidden mt-2">
          {miniItems.map((item) => (
            <li key={item.href} className="py-2">
              <Link href={item.href} className="text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
