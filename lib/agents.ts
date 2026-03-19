import fs from "fs";
import path from "path";
import { AgentsGuide } from "./types";

const agentsPath = path.join(process.cwd(), "content", "agents-guide.json");

export function getAgentsGuide(): AgentsGuide | null {
  if (!fs.existsSync(agentsPath)) return null;
  const raw = fs.readFileSync(agentsPath, "utf-8");
  return JSON.parse(raw) as AgentsGuide;
}
