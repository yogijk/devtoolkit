import fs from "fs";
import path from "path";
import { Tool, ToolCategory } from "./types";

const toolsDir = path.join(process.cwd(), "content", "tools");

export function getAllTools(): Tool[] {
  if (!fs.existsSync(toolsDir)) return [];
  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(toolsDir, file), "utf-8");
    return JSON.parse(raw) as Tool;
  });
}

export function getToolBySlug(slug: string): Tool | undefined {
  const filePath = path.join(toolsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Tool;
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return getAllTools().filter((t) => t.category === category);
}

export function getCategories(): ToolCategory[] {
  const tools = getAllTools();
  return Array.from(new Set(tools.map((t) => t.category)));
}
