"use client";

import { useState } from "react";
import { AgentsGuide } from "@/lib/types";
import ModelStrategyTable from "@/components/ModelStrategyTable";
import AgentPatternCard from "@/components/AgentPatternCard";

interface Props {
  guide: AgentsGuide;
}

function ModelBadge({ model }: { model: string }) {
  const lower = model.toLowerCase();
  if (lower === "haiku") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-cyan-500/10 text-cyan-400">
        {model}
      </span>
    );
  }
  if (lower === "sonnet") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-400">
        {model}
      </span>
    );
  }
  if (lower === "opus") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-violet-500/10 text-violet-400">
        {model}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-white/10 text-[#e4e6eb]">
      {model}
    </span>
  );
}

const ALL_SECTIONS = ["models", "patterns", "efficiency", "example"] as const;
type SectionId = (typeof ALL_SECTIONS)[number];

export default function AgentsClient({ guide }: Props) {
  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(
    new Set(ALL_SECTIONS)
  );

  function toggle(id: SectionId) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function SectionHeader({
    id,
    label,
  }: {
    id: SectionId;
    label: string;
  }) {
    const expanded = expandedSections.has(id);
    return (
      <button
        onClick={() => toggle(id)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
          {label}
        </h2>
        <span className="text-[#e4e6eb]/40 text-xl select-none group-hover:text-emerald-400 transition-colors">
          {expanded ? "▾" : "▸"}
        </span>
      </button>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e1217] text-[#e4e6eb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            PRACTICAL PLAYBOOK
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Agents Guide
          </h1>
          <p className="text-[#e4e6eb]/60 text-lg max-w-2xl">
            How to pick the right model, coordinate parallel agents, and build
            efficiently without blowing your token budget.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {/* Section 1: Model Strategy */}
          <section>
            <div className="mb-5">
              <SectionHeader id="models" label="Model strategy" />
            </div>
            {expandedSections.has("models") && (
              <ModelStrategyTable rows={guide.modelStrategy} />
            )}
          </section>

          {/* Section 2: Agent Patterns */}
          <section>
            <div className="mb-5">
              <SectionHeader id="patterns" label="Agent patterns" />
            </div>
            {expandedSections.has("patterns") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {guide.agentPatterns.map((pattern, i) => (
                  <AgentPatternCard key={i} pattern={pattern} />
                ))}
              </div>
            )}
          </section>

          {/* Section 3: Token Efficiency */}
          <section>
            <div className="mb-5">
              <SectionHeader id="efficiency" label="Token efficiency" />
            </div>
            {expandedSections.has("efficiency") && (
              <ol className="flex flex-col gap-3">
                {guide.tokenEfficiency.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1 bg-[#1c1f26]/80 rounded-xl px-4 py-3 ring-1 ring-white/[0.04]">
                      <p className="text-sm text-[#e4e6eb]/80 leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Section 4: Real Example */}
          <section>
            <div className="mb-5">
              <SectionHeader id="example" label="Real example" />
            </div>
            {expandedSections.has("example") && (
              <div className="bg-[#1c1f26]/80 rounded-2xl ring-1 ring-white/[0.04] p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {guide.realExample.title}
                </h3>
                <p className="text-[#e4e6eb]/60 text-sm mb-6">
                  {guide.realExample.description}
                </p>
                <div className="flex flex-col gap-3">
                  {guide.realExample.batches.map((batch, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-[#0e1217]/60 rounded-xl px-4 py-3"
                    >
                      <span className="text-xs font-semibold text-[#e4e6eb]/40 uppercase tracking-wider w-16 flex-shrink-0">
                        {batch.name}
                      </span>
                      <span className="flex-1 text-sm text-[#e4e6eb]/80">
                        {batch.tasks}
                      </span>
                      <div className="flex items-center gap-2">
                        <ModelBadge model={batch.model} />
                        {batch.parallel ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400/80">
                            <span>⚡</span>
                            <span>parallel</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-[#e4e6eb]/40">
                            <span>→</span>
                            <span>sequential</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
