export interface ReferenceTable {
  title: string;
  columns: [string, string];
  rows: [string, string][];
}

export interface ReferenceSheet {
  id: string;
  title: string;
  icon: string;
  tables: ReferenceTable[];
}

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
  referenceSheets?: ReferenceSheet[];
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

export interface Skill {
  slug: string;
  name: string;
  icon: string;
  category: SkillCategory;
  command: string;
  source: string;
  whatItDoes: string;
  whenToUse: string;
  exampleUse: string;
  pairsWellWith: string[];
}

export type SkillCategory =
  | "Frontend Design"
  | "Code Quality"
  | "Workflow"
  | "Debugging"
  | "Review"
  | "Deployment";

export type ModelTier = "haiku" | "sonnet" | "opus";
export type AgentPatternName = "solo" | "parallel" | "sequential-review" | "escalation";
export type Complexity = "Low" | "Medium" | "High";

export interface SetupTemplate {
  slug: string;
  type: string;
  description: string;
  tools: string[];
  skills: string[];
  agentStrategy: {
    primary: ModelTier;
    useOpusFor: string;
    useHaikuFor: string;
    pattern: AgentPatternName;
    tip: string;
  };
  complexity: Complexity;
  estimatedTasks: string;
}

export interface AgentsGuide {
  modelStrategy: ModelRow[];
  agentPatterns: AgentPattern[];
  tokenEfficiency: string[];
  realExample: BuildTimeline;
}

export interface ModelRow {
  taskType: string;
  model: string;
  why: string;
  cost: "Lowest" | "Medium" | "Highest";
}

export interface AgentPattern {
  name: string;
  description: string;
  whenToUse: string;
  diagram: string;
  example: string;
}

export interface BuildTimeline {
  title: string;
  description: string;
  batches: { name: string; tasks: string; model: string; parallel: boolean }[];
}
