import { getAllSkills, getSkillCategories } from "@/lib/skills";
import SkillsGrid from "@/components/SkillsGrid";

export default function SkillsPage() {
  const skills = getAllSkills();
  const categories = getSkillCategories();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/70 mb-3">
          AI Capabilities
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none">
          Skills Hub
        </h1>
        <p className="text-[#8b8e94] mt-3 text-base max-w-[50ch]">
          Browse all installed AI skills and slash commands. Discover what each
          skill does, when to use it, and how to combine them for maximum impact.
        </p>
      </div>
      <SkillsGrid skills={skills} categories={categories} />
    </main>
  );
}
