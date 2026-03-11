import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


export default function Home() {
  return (
    <div className="flex min-h-screen h-32 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Card className={"flex flex-col min-w-75 min-h-20"}>
        <CardHeader>
          <CardTitle>
            Rimaki&#39;s Projects Website
          </CardTitle>
        </CardHeader>
        <CardDescription className={"px-4"}>
          Ongoing Rewrite I&#39;m sorry
        </CardDescription>
      </Card>
    </div>
  );
}
