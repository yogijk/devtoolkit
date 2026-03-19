import fs from "fs";
import path from "path";
import { LearningLevel } from "./types";

const learningPath = path.join(
  process.cwd(),
  "content",
  "learning-path.json"
);

export function getLearningPath(): LearningLevel[] {
  if (!fs.existsSync(learningPath)) return [];
  const raw = fs.readFileSync(learningPath, "utf-8");
  return JSON.parse(raw) as LearningLevel[];
}
