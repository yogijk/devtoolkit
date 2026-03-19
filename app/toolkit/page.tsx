import { getAllTools, getCategories } from "@/lib/tools";
import ToolkitGrid from "@/components/ToolkitGrid";

export default function ToolkitPage() {
  const tools = getAllTools();
  const categories = getCategories();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/70 mb-3">
          Your stack
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none">
          My Toolkit
        </h1>
        <p className="text-[#8b8e94] mt-3 text-base max-w-[50ch]">
          Every tool in your development stack, explained with real-world
          analogies so you actually understand what each one does.
        </p>
      </div>
      <ToolkitGrid tools={tools} categories={categories} />
    </main>
  );
}
