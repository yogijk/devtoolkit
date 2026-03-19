import fs from "fs";
import path from "path";
import { StarterTemplate } from "./types";

const startersDir = path.join(process.cwd(), "content", "starters");

export function getAllStarters(): StarterTemplate[] {
  if (!fs.existsSync(startersDir)) return [];
  const files = fs.readdirSync(startersDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(startersDir, file), "utf-8");
    return JSON.parse(raw) as StarterTemplate;
  });
}
