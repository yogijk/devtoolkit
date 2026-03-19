import Link from "next/link";
import { StarterTemplate } from "@/lib/types";

interface ProjectTypeCardProps {
  starter: StarterTemplate;
  toolsMap: Record<string, string>; // slug → name
}

export default function ProjectTypeCard({
  starter,
  toolsMap,
}: ProjectTypeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{starter.type}</h2>
        <p className="mt-2 text-gray-600">{starter.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
          Recommended Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          {starter.tools.map((slug) => {
            const name = toolsMap[slug] ?? slug;
            return (
              <Link
                key={slug}
                href={`/toolkit/${slug}`}
                className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">
          Why this stack
        </h3>
        <p className="text-sm text-gray-600">{starter.why}</p>
      </div>
    </div>
  );
}
