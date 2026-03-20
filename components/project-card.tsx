import {Card, CardDescription, CardTitle, CardFooter, CardHeader} from "@/components/ui/card";
import type { Project } from "@/db";
import Link from "next/link";

export default function ProjectCard({ title, description, slug, tags, href }: Project) {
    const parsedTags: string[] = tags ? JSON.parse(tags) : [];

    const content = (
        <Card className="w-64 h-64 shrink-0 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 px-2">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardDescription className="text-lg text-gray-900 px-2">
                {description}
            </CardDescription>
            {parsedTags.length > 0 && (
                <CardFooter className="px-2 gap-1 flex-wrap">
                    {parsedTags.map((tag) => (
                        <span key={tag} className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </CardFooter>
            )}
        </Card>
    );

    return (
        <Link href={href ?? `/projects/${slug}`}>
            {content}
        </Link>
    );
}
