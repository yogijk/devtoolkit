"use client";

import { useState } from "react";
import { LearningLevel, LearningTopic, Resource } from "@/lib/types";

interface LevelCardProps {
  level: LearningLevel;
  progress: Record<string, boolean>;
  onToggle: (topicId: string) => void;
}

function resourceIcon(type: Resource["type"]) {
  if (type === "video") return "📹";
  if (type === "docs") return "📖";
  return "💻";
}

function StatusBadge({ status }: { status: LearningLevel["status"] }) {
  if (status === "completed") {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-900/40 text-green-400">
        Complete
      </span>
    );
  }
  if (status === "current") {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#6c5ce7]/20 text-[#7c6ff7]">
        Current
      </span>
    );
  }
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#2a2e37] text-[#8b8e94]">
      Upcoming
    </span>
  );
}

export default function LevelCard({ level, progress, onToggle }: LevelCardProps) {
  const [expanded, setExpanded] = useState(level.status === "current");

  return (
    <div className="bg-[#1c1f26] border border-[#2a2e37] rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-xl font-bold text-white min-w-0">
          Level {level.level}: {level.title}
        </h2>
        <div className="flex-shrink-0 pt-0.5">
          <StatusBadge status={level.status} />
        </div>
      </div>

      <p className="text-[#8b8e94] text-sm mb-4">{level.description}</p>

      {/* Expandable topics section */}
      <div>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-semibold text-[#e4e6eb] hover:text-white transition-colors mb-3"
        >
          <span>{expanded ? "▾" : "▸"}</span>
          <span>{level.topics.length} Topics</span>
        </button>

        {expanded && (
          <div className="space-y-6 mt-2">
            {level.topics.map((topic: LearningTopic, topicIndex: number) => {
              const topicKey = `level-${level.level}-${topicIndex}`;
              const isCompleted = !!progress[topicKey];

              return (
                <div key={topicKey} className="border-t border-[#2a2e37] pt-5">
                  <h3 className="text-base font-semibold text-[#e4e6eb] mb-2">
                    {topic.name}
                  </h3>

                  <p className="text-sm text-[#8b8e94] mb-4">{topic.explanation}</p>

                  {/* Resources */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    {topic.resources.map((resource: Resource, rIdx: number) => (
                      <a
                        key={rIdx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#6c5ce7] hover:text-[#7c6ff7] hover:underline"
                      >
                        <span>{resourceIcon(resource.type)}</span>
                        <span>{resource.title}</span>
                      </a>
                    ))}
                  </div>

                  {/* Challenge callout */}
                  <div className="bg-amber-900/20 border-l-4 border-amber-500 px-4 py-3 rounded-r-md mb-4">
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-1">
                      Challenge
                    </p>
                    <p className="text-sm text-amber-200">{topic.challenge}</p>
                  </div>

                  {/* Completion checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => onToggle(topicKey)}
                      className="w-4 h-4 rounded border-[#2a2e37] text-[#6c5ce7] accent-[#6c5ce7] cursor-pointer"
                    />
                    <span className="text-sm text-[#8b8e94]">
                      I&apos;ve completed this
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
