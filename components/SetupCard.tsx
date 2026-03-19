"use client";

import Link from "next/link";
import { SetupTemplate, ModelTier, Complexity } from "@/lib/types";

interface SetupCardProps {
  setup: SetupTemplate;
  toolsMap: Record<string, string>;
  skillsMap: Record<string, string>;
  isExpanded: boolean;
  onToggle: () => void;
}

const complexityColors: Record<Complexity, { bg: string; text: string; ring: string }> = {
  Low: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20" },
  Medium: { bg: "bg-yellow-500/10", text: "text-yellow-400", ring: "ring-yellow-500/20" },
  High: { bg: "bg-red-500/10", text: "text-red-400", ring: "ring-red-500/20" },
};

const modelColors: Record<ModelTier, { bg: string; text: string; ring: string; label: string }> = {
  haiku: { bg: "bg-cyan-500/10", text: "text-cyan-400", ring: "ring-cyan-500/20", label: "Claude Haiku" },
  sonnet: { bg: "bg-blue-500/10", text: "text-blue-400", ring: "ring-blue-500/20", label: "Claude Sonnet" },
  opus: { bg: "bg-violet-500/10", text: "text-violet-400", ring: "ring-violet-500/20", label: "Claude Opus" },
};

const patternLabels: Record<string, string> = {
  solo: "Solo Agent",
  parallel: "Parallel Agents",
  "sequential-review": "Sequential Review",
  escalation: "Escalation Pattern",
};

export default function SetupCard({
  setup,
  toolsMap,
  skillsMap,
  isExpanded,
  onToggle,
}: SetupCardProps) {
  const complexity = complexityColors[setup.complexity];
  const model = modelColors[setup.agentStrategy.primary];
  const patternLabel = patternLabels[setup.agentStrategy.pattern] ?? setup.agentStrategy.pattern;

  return (
    <div
      className={`bg-[#1c1f26]/80 rounded-2xl ring-1 cursor-pointer transition-all duration-300 ${
        isExpanded
          ? "ring-emerald-500/20 shadow-lg shadow-emerald-500/5"
          : "ring-white/[0.04] hover:ring-white/[0.1]"
      }`}
      onClick={onToggle}
    >
      {/* Collapsed header — always visible */}
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-white text-[15px] tracking-tight">
              {setup.type}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ring-1 ${complexity.bg} ${complexity.text} ${complexity.ring}`}
            >
              {setup.complexity}
            </span>
          </div>
          <p className="text-sm text-[#8b8e94] mt-1.5 leading-relaxed line-clamp-2">
            {setup.description}
          </p>
        </div>
        <span
          className={`text-[#8b8e94] text-lg mt-0.5 flex-shrink-0 transition-transform duration-300 ${
            isExpanded ? "rotate-90" : ""
          }`}
        >
          {isExpanded ? "▾" : "▸"}
        </span>
      </div>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="px-5 pb-6 flex flex-col gap-5 border-t border-white/[0.04]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Recommended Tools */}
          {setup.tools.length > 0 && (
            <div className="pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] mb-2.5">
                Recommended Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {setup.tools.map((slug) => (
                  <Link
                    key={slug}
                    href={`/toolkit/${slug}`}
                    className="bg-white/[0.04] hover:bg-emerald-500/10 text-[#e4e6eb] hover:text-emerald-400 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {toolsMap[slug] ?? slug}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Skills */}
          {setup.skills.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] mb-2.5">
                Recommended Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {setup.skills.map((slug) => (
                  <Link
                    key={slug}
                    href={`/skills/${slug}`}
                    className="bg-white/[0.04] hover:bg-violet-500/10 text-[#e4e6eb] hover:text-violet-400 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {skillsMap[slug] ?? slug}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Agent Strategy */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555] mb-2.5">
              Agent Strategy
            </p>
            <div className="bg-[#13151b] rounded-xl p-4 flex flex-col gap-3">
              {/* Primary model + pattern */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold ring-1 ${model.bg} ${model.text} ${model.ring}`}
                >
                  {model.label}
                </span>
                <span className="text-[11px] text-[#555]">·</span>
                <span className="text-[11px] text-[#8b8e94] font-medium">{patternLabel}</span>
              </div>

              {/* Use model for */}
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex gap-2">
                  <span className="text-violet-400 font-semibold shrink-0">Use Opus for:</span>
                  <span className="text-[#8b8e94]">{setup.agentStrategy.useOpusFor}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-cyan-400 font-semibold shrink-0">Use Haiku for:</span>
                  <span className="text-[#8b8e94]">{setup.agentStrategy.useHaikuFor}</span>
                </div>
              </div>

              {/* Tip */}
              <div className="bg-emerald-500/[0.06] ring-1 ring-emerald-500/20 rounded-lg px-3 py-2.5">
                <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                  <span className="font-semibold text-emerald-400">Tip: </span>
                  {setup.agentStrategy.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex items-center gap-4 pt-1 border-t border-white/[0.04]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555]">
                Estimated Tasks
              </p>
              <p className="text-sm font-semibold text-white mt-0.5">{setup.estimatedTasks}</p>
            </div>
            <div className="h-8 w-px bg-white/[0.04]" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555]">
                Complexity
              </p>
              <p className={`text-sm font-semibold mt-0.5 ${complexity.text}`}>
                {setup.complexity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
