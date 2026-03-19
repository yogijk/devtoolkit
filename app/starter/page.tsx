import { getAllStarters } from "@/lib/starters";
import { getAllTools } from "@/lib/tools";
import ProjectTypeCard from "@/components/ProjectTypeCard";

export default function StarterPage() {
  const starters = getAllStarters();
  const tools = getAllTools();

  const toolsMap: Record<string, string> = {};
  for (const tool of tools) {
    toolsMap[tool.slug] = tool.name;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Project Starter</h1>
        <p className="mt-2 text-[#8b8e94]">
          Pick a project type to see which tools you need
        </p>
      </div>

      <div className="space-y-8">
        {starters.map((starter) => (
          <ProjectTypeCard
            key={starter.slug}
            starter={starter}
            toolsMap={toolsMap}
          />
        ))}
      </div>
    </main>
  );
}
