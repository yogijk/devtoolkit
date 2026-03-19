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
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
      >
        {repo.full_name}
      </a>
      <p className="text-gray-600 mt-2 text-sm">
        {repo.description ?? "No description"}
      </p>
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <span className="text-sm text-gray-700">
          ⭐ {repo.stargazers_count.toLocaleString()}
        </span>
        {repo.language && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">
            {repo.language}
          </span>
        )}
        <span className="text-xs text-gray-500 ml-auto">
          Created {getRelativeDate(repo.created_at)}
        </span>
      </div>
    </div>
  );
}
