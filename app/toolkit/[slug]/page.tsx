import { getToolBySlug, getAllTools } from "@/lib/tools";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.name} | DevToolkit`,
    description: tool.whatItDoes,
  };
}

export default function ToolDetailPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const categoryColors: Record<string, string> = {
    Frontend: "bg-blue-100 text-blue-800",
    Backend: "bg-green-100 text-green-800",
    Database: "bg-yellow-100 text-yellow-800",
    Deployment: "bg-purple-100 text-purple-800",
    "Dev Tools": "bg-orange-100 text-orange-800",
    Productivity: "bg-pink-100 text-pink-800",
  };

  const badgeClass = categoryColors[tool.category] ?? "bg-gray-100 text-gray-800";

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/toolkit"
        className="inline-block mb-8 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        ← Back to toolkit
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{tool.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
          <span
            className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
          >
            {tool.category}
          </span>
        </div>
      </div>

      {/* Think of it as... */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Think of it as…</h2>
        <blockquote className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg px-5 py-4 text-blue-900 italic">
          {tool.analogy}
        </blockquote>
      </section>

      {/* What it does */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">What it does</h2>
        <p className="text-gray-600 leading-relaxed">{tool.whatItDoes}</p>
      </section>

      {/* Why you use it */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Why you use it</h2>
        <p className="text-gray-600 leading-relaxed">{tool.whyYouUseIt}</p>
      </section>

      {/* Alternatives */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Alternatives</h2>
        <ul className="list-disc list-inside space-y-1">
          {tool.alternatives.map((alt) => (
            <li key={alt} className="text-gray-600">
              {alt}
            </li>
          ))}
        </ul>
      </section>

      {/* When to switch */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">When to switch</h2>
        <p className="text-gray-600 leading-relaxed">{tool.whenToSwap}</p>
      </section>

      {/* Learn more */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Learn more</h2>
        <a
          href={tool.learnMore}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
        >
          Official documentation ↗
        </a>
      </section>

      {/* Bottom back link */}
      <Link
        href="/toolkit"
        className="inline-block text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        ← Back to toolkit
      </Link>
    </main>
  );
}
