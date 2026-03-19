import fs from "fs";
import path from "path";
import { SetupTemplate } from "./types";

const setupDir = path.join(process.cwd(), "content", "setup");

export function getAllSetups(): SetupTemplate[] {
  if (!fs.existsSync(setupDir)) return [];
  const files = fs.readdirSync(setupDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(setupDir, file), "utf-8");
    return JSON.parse(raw) as SetupTemplate;
  });
}
