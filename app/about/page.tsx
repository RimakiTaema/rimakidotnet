"use client"

import { SidebarSeparator } from "@/components/ui/sidebar";
import {useEffect, useRef} from "react";
import gsap from "gsap";

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(pageRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        });
        return () => ctx.revert();
    }, []);


    return (
        <div ref={pageRef} className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
            <div className="text-2xl font-semibold">
                About
            </div>
            <SidebarSeparator />
            <div className="mt-4">
                <p className="text-lg text-gray-700">
                    Welcome to Rimaki&#39;s Projects.
                </p>
            </div>
        </div>
    );
}
