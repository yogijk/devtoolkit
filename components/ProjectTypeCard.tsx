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
    <div className="bg-[#1c1f26] border border-white/[0.06] rounded-xl p-6 flex flex-col gap-5 hover:border-white/[0.12] transition-all duration-200">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tighter">{starter.type}</h2>
        <p className="mt-2 text-[#8b8e94] max-w-[65ch]">{starter.description}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#e4e6eb] uppercase tracking-wide mb-2">
          Recommended Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          {starter.tools.map((slug) => {
            const name = toolsMap[slug] ?? slug;
            return (
              <Link
                key={slug}
                href={`/toolkit/${slug}`}
                className="text-sm px-3 py-1 rounded-full bg-[#2a2e37] text-[#8b8e94] hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200 active:scale-[0.98]"
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-[#0e1217] border border-white/[0.06] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-[#e4e6eb] mb-1">
          Why this stack
        </h3>
        <p className="text-sm text-[#8b8e94] max-w-[65ch]">{starter.why}</p>
      </div>
    </div>
  );
}
