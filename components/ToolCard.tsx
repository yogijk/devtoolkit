import Link from "next/link";
import { Tool } from "@/lib/types";

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-100 text-blue-700",
  Backend: "bg-green-100 text-green-700",
  Database: "bg-yellow-100 text-yellow-700",
  Deployment: "bg-purple-100 text-purple-700",
  "Dev Tools": "bg-orange-100 text-orange-700",
  Productivity: "bg-pink-100 text-pink-700",
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const badgeClass =
    categoryColors[tool.category] ?? "bg-gray-100 text-gray-700";

  return (
    <Link href={`/toolkit/${tool.slug}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 h-full hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <span className="text-3xl">{tool.icon}</span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${badgeClass}`}
          >
            {tool.category}
          </span>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900">{tool.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {tool.analogy}
          </p>
        </div>
      </div>
    </Link>
  );
}
