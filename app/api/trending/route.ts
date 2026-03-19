import { NextResponse } from "next/server";
import { TrendingRepo } from "@/lib/types";

interface GitHubRepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  created_at: string;
}

export async function GET() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const dateStr = sevenDaysAgo.toISOString().split("T")[0];

  const url = `https://api.github.com/search/repositories?q=created:>${dateStr}+language:javascript+OR+language:typescript&sort=stars&order=desc&per_page=20`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "GitHub API error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const repos: TrendingRepo[] = data.items.map((item: GitHubRepoItem) => ({
      id: item.id,
      name: item.name,
      full_name: item.full_name,
      description: item.description,
      html_url: item.html_url,
      stargazers_count: item.stargazers_count,
      language: item.language,
      created_at: item.created_at,
    }));

    return NextResponse.json(repos, {
      headers: { "Cache-Control": "public, s-maxage=86400" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trending repos" },
      { status: 500 }
    );
  }
}
