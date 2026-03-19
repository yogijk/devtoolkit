import Link from "next/link";
import { Tool } from "@/lib/types";

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-900/40 text-blue-400",
  Backend: "bg-green-900/40 text-green-400",
  Database: "bg-yellow-900/40 text-yellow-400",
  Deployment: "bg-purple-900/40 text-purple-400",
  "Dev Tools": "bg-orange-900/40 text-orange-400",
  Productivity: "bg-pink-900/40 text-pink-400",
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const badgeClass =
    categoryColors[tool.category] ?? "bg-gray-800 text-gray-400";

  return (
    <Link href={`/toolkit/${tool.slug}`}>
      <div className="bg-[#1c1f26] border border-[#2a2e37] rounded-xl p-5 flex flex-col gap-3 h-full hover:brightness-125 transition-all cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <span className="text-3xl">{tool.icon}</span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${badgeClass}`}
          >
            {tool.category}
          </span>
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#e4e6eb]">{tool.name}</h3>
          <p className="text-sm text-[#8b8e94] mt-1 line-clamp-2">
            {tool.analogy}
          </p>
        </div>
      </div>
    </Link>
  );
}
