"use client";

import { useEffect, useState } from "react";
import { TrendingRepo } from "@/lib/types";
import TrendingRepoCard from "@/components/TrendingRepoCard";

export default function FeedPage() {
  const [repos, setRepos] = useState<TrendingRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trending");
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
      const data: TrendingRepo[] = await res.json();
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tighter">What&apos;s New</h1>
        <p className="text-[#8b8e94] mt-2 max-w-[65ch]">
          Trending developer tools from this week
        </p>
      </header>

      {loading && (
        <div className="flex items-center gap-3 text-[#8b8e94] animate-pulse">
          <div className="w-4 h-4 rounded-full bg-[#2a2e37] animate-bounce" />
          <span>Loading trending repos...</span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-5 text-center">
          <p className="text-red-400 mb-3">{error}</p>
          <button
            onClick={fetchRepos}
            className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-4">
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TrendingRepoCard repo={repo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
