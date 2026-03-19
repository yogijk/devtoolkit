export interface Tool {
  slug: string;
  name: string;
  category: ToolCategory;
  icon: string; // emoji character
  analogy: string;
  whatItDoes: string;
  whyYouUseIt: string;
  alternatives: string[];
  whenToSwap: string;
  learnMore: string;
  level: number;
}

export type ToolCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Deployment"
  | "Dev Tools"
  | "Productivity";

export interface StarterTemplate {
  slug: string;
  type: string;
  description: string;
  tools: string[]; // tool slugs
  why: string;
}

export interface LearningLevel {
  level: number;
  title: string;
  status: "completed" | "current" | "upcoming";
  description: string;
  topics: LearningTopic[];
}

export interface LearningTopic {
  name: string;
  explanation: string;
  resources: Resource[];
  challenge: string;
}

export interface Resource {
  title: string;
  url: string;
  type: "video" | "docs" | "tutorial";
}

export interface TrendingRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  created_at: string;
}
