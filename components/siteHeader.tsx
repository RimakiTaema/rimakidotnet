import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function SiteHeader({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <header className="sticky top-0 z-30 w-full border-b bg-white dark:bg-black">
                <div className="flex h-14 items-center px-4">
                    <Navbar />
                </div>
            </header>
            {children}
            <Footer />
        </>
    )
}