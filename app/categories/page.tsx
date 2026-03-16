"use client"

import { SidebarSeparator } from "@/components/ui/sidebar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { categoryCards } from "../categoryCards";
import {CardFooter} from "@/components/ui/card";
import {useEffect, useRef} from "react";
import gsap from "gsap";
import {Button} from "@/components/ui/button";

export default function CategoriesPage() {
    const cardRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current, {
                y: 20,
                opacity: 0,
                scale: 0.97,
                duration: 0.4,
                ease: "power3.out",
                stagger: 0.08,
            });
            gsap.from(pageRef.current, {
                opacity: 0,
                y: 12,
                duration: 0.4,
                ease: "power2.out",
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
            <div className="text-2xl font-semibold">
                Categories
            </div>
            <SidebarSeparator />
            <div className="mt-4">
                <div ref={cardRef} className="flex flex-row gap-3 flex-wrap">
                    {categoryCards.map((category, index) => (
                        <Card key={index} className="w-64 h-64 shrink-0 flex flex-col justify-between">
                            <div className="p-4">
                                <CardTitle className="text-2xl font-semibold text-gray-900">
                                    {category.title}
                                </CardTitle>
                                <CardDescription className="text-lg text-gray-900 mt-2">
                                    {category.description}
                                </CardDescription>
                            </div>
                            <CardFooter>
                                <Button className={"flex items-center"}>
                                    View Updates
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
