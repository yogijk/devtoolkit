import Link from "next/link";
import { Skill } from "@/lib/types";

const skillCategoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Frontend Design": { bg: "bg-violet-500/8", text: "text-violet-400", dot: "bg-violet-400" },
  "Code Quality": { bg: "bg-emerald-500/8", text: "text-emerald-400", dot: "bg-emerald-400" },
  "Workflow": { bg: "bg-blue-500/8", text: "text-blue-400", dot: "bg-blue-400" },
  "Debugging": { bg: "bg-red-500/8", text: "text-red-400", dot: "bg-red-400" },
  "Review": { bg: "bg-amber-500/8", text: "text-amber-400", dot: "bg-amber-400" },
  "Deployment": { bg: "bg-cyan-500/8", text: "text-cyan-400", dot: "bg-cyan-400" },
};

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const colors = skillCategoryColors[skill.category] ?? {
    bg: "bg-gray-500/8",
    text: "text-gray-400",
    dot: "bg-gray-400",
  };

  return (
    <Link href={`/skills/${skill.slug}`} className="group block h-full">
      <div className="card-glow bg-[#1c1f26]/80 backdrop-blur-sm border border-white/[0.04] rounded-2xl p-6 flex flex-col gap-4 h-full hover:border-white/[0.1] active:scale-[0.98] transition-all duration-300 cursor-pointer relative overflow-hidden">
        {/* Subtle gradient accent top */}
        <div className={`absolute top-0 left-0 right-0 h-[1px] ${colors.bg} opacity-60`} />

        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center text-xl`}>
              {skill.icon}
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                {skill.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                <span className={`text-[10px] font-medium uppercase tracking-wider ${colors.text}`}>
                  {skill.category}
                </span>
              </div>
            </div>
          </div>
          <code className="text-[11px] font-mono bg-white/[0.04] text-emerald-400/80 px-1.5 py-0.5 rounded-md shrink-0">
            {skill.command}
          </code>
        </div>

        {/* What it does */}
        <p className="text-[13px] text-[#8b8e94] leading-relaxed line-clamp-2 max-w-[65ch]">
          {skill.whatItDoes}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/[0.04] flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#555]">
            {skill.source}
          </span>
          <span className="text-[11px] text-[#555] group-hover:text-emerald-400/60 transition-colors duration-300">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
