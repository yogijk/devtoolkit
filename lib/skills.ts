import fs from "fs";
import path from "path";
import { Skill, SkillCategory } from "./types";

const skillsDir = path.join(process.cwd(), "content", "skills");

export function getAllSkills(): Skill[] {
  if (!fs.existsSync(skillsDir)) return [];
  const files = fs.readdirSync(skillsDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(skillsDir, file), "utf-8");
    return JSON.parse(raw) as Skill;
  });
}

export function getSkillBySlug(slug: string): Skill | undefined {
  const filePath = path.join(skillsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Skill;
}

export function getSkillCategories(): SkillCategory[] {
  const skills = getAllSkills();
  return Array.from(new Set(skills.map((s) => s.category)));
}
