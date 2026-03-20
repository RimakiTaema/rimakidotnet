import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { Category } from "@/db";
import Link from "next/link";

export default function CategoryCard({ title, description, slug }: Category) {
    return (
        <Link href={`/categories/${slug}`}>
            <Card className="w-64 h-64 shrink-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardTitle className="text-2xl font-semibold text-gray-900 px-2">
                    {title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-900 px-2">
                    {description}
                </CardDescription>
            </Card>
        </Link>
    );
}
