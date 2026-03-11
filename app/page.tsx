"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function Home() {
  return (
    <div className="flex min-h-screen h-32 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>Background content here</p>

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
