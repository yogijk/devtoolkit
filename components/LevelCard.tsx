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
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
        Complete
      </span>
    );
  }
  if (status === "current") {
    return (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
        Current
      </span>
    );
  }
  return (
    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
      Upcoming
    </span>
  );
}

export default function LevelCard({ level, progress, onToggle }: LevelCardProps) {
  const [expanded, setExpanded] = useState(level.status === "current");

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-xl font-bold text-gray-900">
          Level {level.level}: {level.title}
        </h2>
        <StatusBadge status={level.status} />
      </div>

      <p className="text-gray-600 text-sm mb-4">{level.description}</p>

      {/* Expandable topics section */}
      <div>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors mb-3"
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
                <div key={topicKey} className="border-t border-gray-100 pt-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {topic.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">{topic.explanation}</p>

                  {/* Resources */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    {topic.resources.map((resource: Resource, rIdx: number) => (
                      <a
                        key={rIdx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <span>{resourceIcon(resource.type)}</span>
                        <span>{resource.title}</span>
                      </a>
                    ))}
                  </div>

                  {/* Challenge callout */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 rounded-r-md mb-4">
                    <p className="text-xs font-semibold text-yellow-800 uppercase tracking-wide mb-1">
                      Challenge
                    </p>
                    <p className="text-sm text-yellow-900">{topic.challenge}</p>
                  </div>

                  {/* Completion checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => onToggle(topicKey)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">
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
