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
    <div className="flex flex-col gap-6">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <p className="text-sm text-gray-500">
        Showing {filtered.length} of {tools.length} tools
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
