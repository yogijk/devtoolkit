"use client";

import { useEffect, useState } from "react";
import { LearningLevel } from "@/lib/types";
import LevelCard from "@/components/LevelCard";

const STORAGE_KEY = "devtoolkit-progress";

interface LearnClientProps {
  levels: LearningLevel[];
}

export default function LearnClient({ levels }: LearnClientProps) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  function toggleProgress(topicId: string) {
    setProgress((prev) => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }

  // Progress summary: which level is current
  const currentLevel = levels.find((l) => l.status === "current");
  const currentLevelNum = currentLevel?.level ?? 1;
  const totalLevels = levels.length;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tighter">Learning Path</h1>
        <p className="mt-2 text-[#8b8e94] max-w-[65ch]">
          A structured path from web basics to professional development practices.
        </p>
        <p className="mt-1 text-sm text-emerald-500 font-medium">
          Level {currentLevelNum} of {totalLevels}
        </p>
      </div>

      {/* Level cards */}
      <div className="space-y-6">
        {levels.map((level, index) => (
          <div
            key={level.level}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <LevelCard
              level={level}
              progress={progress}
              onToggle={toggleProgress}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
