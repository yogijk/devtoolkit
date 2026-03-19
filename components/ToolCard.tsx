import Link from "next/link";
import { Tool } from "@/lib/types";

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  Frontend: { bg: "bg-blue-500/8", text: "text-blue-400", dot: "bg-blue-400" },
  Backend: { bg: "bg-green-500/8", text: "text-green-400", dot: "bg-green-400" },
  Database: { bg: "bg-yellow-500/8", text: "text-yellow-400", dot: "bg-yellow-400" },
  Deployment: { bg: "bg-emerald-500/8", text: "text-emerald-400", dot: "bg-emerald-400" },
  "Dev Tools": { bg: "bg-orange-500/8", text: "text-orange-400", dot: "bg-orange-400" },
  Productivity: { bg: "bg-pink-500/8", text: "text-pink-400", dot: "bg-pink-400" },
};

const levelLabels: Record<number, string> = {
  1: "Beginner",
  2: "Familiar",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const colors = categoryColors[tool.category] ?? {
    bg: "bg-gray-500/8",
    text: "text-gray-400",
    dot: "bg-gray-400",
  };

  return (
    <Link href={`/toolkit/${tool.slug}`} className="group block h-full">
      <div className="card-glow bg-[#1c1f26]/80 backdrop-blur-sm border border-white/[0.04] rounded-2xl p-6 flex flex-col gap-4 h-full hover:border-white/[0.1] active:scale-[0.98] transition-all duration-300 cursor-pointer relative overflow-hidden">
        {/* Subtle gradient accent top */}
        <div className={`absolute top-0 left-0 right-0 h-[1px] ${colors.bg} opacity-60`} />

        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center text-xl`}>
              {tool.icon}
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                {tool.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                <span className={`text-[10px] font-medium uppercase tracking-wider ${colors.text}`}>
                  {tool.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Analogy */}
        <p className="text-[13px] text-[#8b8e94] leading-relaxed line-clamp-2 max-w-[65ch]">
          {tool.analogy}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/[0.04] flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#555]">
            Level {tool.level} — {levelLabels[tool.level] ?? ""}
          </span>
          <span className="text-[11px] text-[#555] group-hover:text-emerald-400/60 transition-colors duration-300">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
