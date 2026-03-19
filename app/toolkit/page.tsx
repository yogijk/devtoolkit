import { getAllTools, getCategories } from "@/lib/tools";
import ToolkitGrid from "@/components/ToolkitGrid";

export default function ToolkitPage() {
  const tools = getAllTools();
  const categories = getCategories();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Toolkit</h1>
        <p className="text-[#8b8e94] mt-2">
          Every tool in your development stack, explained
        </p>
      </div>
      <ToolkitGrid tools={tools} categories={categories} />
    </main>
  );
}
