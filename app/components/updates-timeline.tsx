import Link from "next/link";
import type { UpdateEntry } from "@/app/lib/projects";

interface UpdatesTimelineProps {
  updates: readonly UpdateEntry[];
}

export default function UpdatesTimeline({ updates }: UpdatesTimelineProps) {
  if (updates.length === 0) {
    return <p className="text-gray-400">No updates yet.</p>;
  }

  return (
    <div className="relative border-l-2 border-gray-200 ml-3">
      {updates.map((update) => (
        <div key={update.slug} className="mb-8 ml-6">
          <div className="absolute -left-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{update.frontmatter.title}</h3>
              {update.frontmatter.date && (
                <span className="text-xs text-gray-400">{update.frontmatter.date}</span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-3">{update.frontmatter.description}</p>
            <Link
              href={`/updates/${update.slug}`}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Read full update &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
