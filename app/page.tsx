"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {SidebarSeparator} from "@/components/ui/sidebar";
import {Card, CardDescription, CardTitle} from "@/components/ui/card";

export default function Home() {
    const card = [
        {title: "Placeholder 1", description: "Placeholder 1"},
        {title: "Placeholder 2", description: "Placeholder 2"},
        {title: "Placeholder 3", description: "Placeholder 3"},
        {title: "Placeholder 4", description: "Placeholder 4"},
        {title: "Placeholder 5", description: "Placeholder 5"},
    ]

    const cagtcard = [
        {title: "Placeholder 1", description: "Placeholder 1"},
        {title: "Placeholder 2", description: "Placeholder 2"},
        {title: "Placeholder 3", description: "Placeholder 3"},
    ]

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="text-2xl font-semibold">
        Projects
      </div>
      <SidebarSeparator />
      <div className="mt-4">
            <div className="flex flex-row gap-3 overflow-x-auto">
                {card.map((card, index) => (
                    <Card key={index} className="w-64 h-64 shrink-0">
                        <CardTitle className="text-2xl font-semibold text-gray-900 px-2">
                            {card.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-gray-900 px-2">
                            {card.description}
                        </CardDescription>
                    </Card>
                ))}
            </div>
      </div>
        <div className="text-2xl font-semibold">
            Categorises
        </div>
        <SidebarSeparator />
        <div className="mt-4">
            <div className="flex flex-row gap-3 overflow-x-auto">
                {cagtcard.map((card, index) => (
                    <Card key={index} className="w-64 h-64 shrink-0">
                        <CardTitle className="text-2xl font-semibold text-gray-900 px-2">
                            {card.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-gray-900 px-2">
                            {card.description}
                        </CardDescription>
                    </Card>
                ))}
            </div>
        </div>
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Website Under Rewrite...</AlertDialogTitle>
            <AlertDialogDescription>
              Sorry In Advance I&#39;m On Rewriting Website to Better Theme (Style Is ExaTon NEXT)
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
