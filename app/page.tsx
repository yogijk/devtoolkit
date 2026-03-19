import Link from "next/link";

const sections = [
  {
    title: "My Toolkit",
    description: "Every tool you use — explained in plain English with real-world analogies.",
    href: "/toolkit",
    icon: "🧰",
  },
  {
    title: "Project Starter",
    description: "Pick a project type and see exactly which tools you need and why.",
    href: "/starter",
    icon: "🚀",
  },
  {
    title: "Learning Path",
    description: "A step-by-step roadmap from where you are now to full independence.",
    href: "/learn",
    icon: "📚",
  },
  {
    title: "What's New",
    description: "Trending developer tools from this week — stay updated automatically.",
    href: "/feed",
    icon: "✨",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white">DevToolkit</h1>
        <p className="mt-3 text-lg text-[#8b8e94] max-w-2xl mx-auto">
          Your personal guide to developer tools — understand what you use,
          discover what&apos;s new.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-6 bg-[#1c1f26] border border-[#2a2e37] rounded-xl hover:brightness-125 transition-all"
          >
            <span className="text-3xl">{section.icon}</span>
            <h2 className="mt-3 text-xl font-semibold text-white">
              {section.title}
            </h2>
            <p className="mt-2 text-[#8b8e94]">{section.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
