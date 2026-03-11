import React from "react";
import Navbar from "@/components/navbar";

export default function SiteHeader({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <header className="w-full border-b">
                <div className="flex h-14 items-center px-4">
                    <Navbar />
                </div>
            </header>
            {children}
        </>
    )
}