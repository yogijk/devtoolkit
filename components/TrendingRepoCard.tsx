import { TrendingRepo } from "@/lib/types";

interface TrendingRepoCardProps {
  repo: TrendingRepo;
}

function getRelativeDate(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function TrendingRepoCard({ repo }: TrendingRepoCardProps) {
  return (
    <div className="bg-[#1c1f26] border border-[#2a2e37] rounded-xl p-5 hover:brightness-125 transition-all duration-200">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#6c5ce7] hover:text-[#7c6ff7] font-semibold text-lg"
      >
        {repo.full_name}
      </a>
      <p className="text-[#8b8e94] mt-2 text-sm">
        {repo.description ?? "No description"}
      </p>
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <span className="text-sm text-[#8b8e94]">
          ⭐ {repo.stargazers_count.toLocaleString()}
        </span>
        {repo.language && (
          <span className="text-xs bg-[#2a2e37] text-[#8b8e94] px-2 py-1 rounded-full border border-[#2a2e37]">
            {repo.language}
          </span>
        )}
        <span className="text-xs text-[#8b8e94] ml-auto">
          Created {getRelativeDate(repo.created_at)}
        </span>
      </div>
    </div>
  );
}
