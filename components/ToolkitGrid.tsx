"use client";

import { useState } from "react";
import { Tool, ToolCategory } from "@/lib/types";
import ToolCard from "./ToolCard";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

interface ToolkitGridProps {
  tools: Tool[];
  categories: ToolCategory[];
}

export default function ToolkitGrid({ tools, categories }: ToolkitGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = tools.filter((tool) => {
    const matchesCategory = activeCategory
      ? tool.category === activeCategory
      : true;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q
      ? tool.name.toLowerCase().includes(q) ||
        tool.analogy.toLowerCase().includes(q)
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <span className="text-xs text-[#555] font-medium tabular-nums">
          {filtered.length} of {tools.length} tools
        </span>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#555] text-sm">No tools match your search</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
            className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool, index) => (
            <div
              key={tool.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
