import { getSkillBySlug, getAllSkills } from "@/lib/skills";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

const skillCategoryColors: Record<string, string> = {
  "Frontend Design": "bg-violet-900/40 text-violet-400",
  "Code Quality": "bg-emerald-900/40 text-emerald-400",
  "Workflow": "bg-blue-900/40 text-blue-400",
  "Debugging": "bg-red-900/40 text-red-400",
  "Review": "bg-amber-900/40 text-amber-400",
  "Deployment": "bg-cyan-900/40 text-cyan-400",
};

export async function generateStaticParams() {
  const skills = getAllSkills();
  return skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const skill = getSkillBySlug(params.slug);
  if (!skill) return { title: "Skill Not Found" };
  return {
    title: `${skill.name} | DevToolkit`,
    description: skill.whatItDoes,
  };
}

export default function SkillDetailPage({ params }: PageProps) {
  const skill = getSkillBySlug(params.slug);
  if (!skill) notFound();

  const allSkills = getAllSkills();
  const slugToName = Object.fromEntries(allSkills.map((s) => [s.slug, s.name]));

  const badgeClass =
    skillCategoryColors[skill.category] ?? "bg-gray-800 text-gray-400";

  const isGitHubSource = skill.source.toLowerCase().includes("github");

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/skills"
        className="inline-block mb-8 text-sm text-[#8b8e94] hover:text-[#e4e6eb] transition-colors duration-200"
      >
        ← Back to Skills Hub
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 animate-fade-in">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.06] text-xl">
          {skill.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tighter">{skill.name}</h1>
          <span
            className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
          >
            {skill.category}
          </span>
        </div>
      </div>

      {/* Command */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "60ms" }}>
        <div className="bg-white/[0.03] rounded-xl px-5 py-4 ring-1 ring-white/[0.04]">
          <code className="text-emerald-400 font-mono text-lg">{skill.command}</code>
        </div>
      </div>

      {/* What it does */}
      <section className="mb-8 animate-fade-in" style={{ animationDelay: "120ms" }}>
        <h2 className="text-lg font-semibold text-[#e4e6eb] mb-2">What it does</h2>
        <p className="text-[#8b8e94] leading-relaxed max-w-[65ch]">{skill.whatItDoes}</p>
      </section>

      {/* When to use it */}
      <section className="mb-8 animate-fade-in" style={{ animationDelay: "180ms" }}>
        <h2 className="text-lg font-semibold text-[#e4e6eb] mb-2">When to use it</h2>
        <p className="text-[#8b8e94] leading-relaxed max-w-[65ch]">{skill.whenToUse}</p>
      </section>

      {/* Example */}
      <section className="mb-8 animate-fade-in" style={{ animationDelay: "240ms" }}>
        <h2 className="text-lg font-semibold text-[#e4e6eb] mb-2">Example</h2>
        <div className="bg-emerald-500/5 border-l-4 border-emerald-500/30 rounded-r-lg px-5 py-4 text-[#8b8e94] leading-relaxed">
          {skill.exampleUse}
        </div>
      </section>

      {/* Pairs well with */}
      {skill.pairsWellWith.length > 0 && (
        <section className="mb-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-lg font-semibold text-[#e4e6eb] mb-3">Pairs well with</h2>
          <div className="flex flex-wrap gap-2">
            {skill.pairsWellWith.map((pairSlug) => (
              <Link
                key={pairSlug}
                href={`/skills/${pairSlug}`}
                className="px-3 py-1 rounded-full text-sm bg-white/[0.05] text-[#8b8e94] hover:bg-white/[0.09] hover:text-[#e4e6eb] ring-1 ring-white/[0.07] transition-colors duration-200"
              >
                {slugToName[pairSlug] ?? pairSlug}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Source */}
      <section className="mb-10 animate-fade-in" style={{ animationDelay: "360ms" }}>
        <h2 className="text-lg font-semibold text-[#e4e6eb] mb-2">Source</h2>
        {isGitHubSource ? (
          <a
            href={skill.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 underline underline-offset-2 transition-colors duration-200"
          >
            {skill.source} ↗
          </a>
        ) : (
          <p className="text-[#8b8e94]">{skill.source}</p>
        )}
      </section>

      {/* Bottom back link */}
      <Link
        href="/skills"
        className="inline-block text-sm text-[#8b8e94] hover:text-[#e4e6eb] transition-colors duration-200"
      >
        ← Back to Skills Hub
      </Link>
    </main>
  );
}
