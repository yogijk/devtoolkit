"use client";

import { useState } from "react";
import { SetupTemplate } from "@/lib/types";
import SetupCard from "@/components/SetupCard";

interface SetupClientProps {
  setups: SetupTemplate[];
  toolsMap: Record<string, string>;
  skillsMap: Record<string, string>;
}

export default function SetupClient({ setups, toolsMap, skillsMap }: SetupClientProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  function handleToggle(slug: string) {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400/70 mb-3">
          Get Started
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none">
          Project Setup
        </h1>
        <p className="text-[#8b8e94] mt-3 text-base max-w-[52ch]">
          Pick a project type to see the recommended tools, skills, and agent strategy.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {setups.map((setup, i) => (
          <div
            key={setup.slug}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
          >
            <SetupCard
              setup={setup}
              toolsMap={toolsMap}
              skillsMap={skillsMap}
              isExpanded={expandedSlug === setup.slug}
              onToggle={() => handleToggle(setup.slug)}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
