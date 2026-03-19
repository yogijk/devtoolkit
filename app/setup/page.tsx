import { getAllSetups } from "@/lib/setup";
import { getAllTools } from "@/lib/tools";
import { getAllSkills } from "@/lib/skills";
import SetupClient from "./SetupClient";

export default function SetupPage() {
  const setups = getAllSetups();
  const tools = getAllTools();
  const skills = getAllSkills();

  const toolsMap: Record<string, string> = {};
  for (const t of tools) toolsMap[t.slug] = t.name;

  const skillsMap: Record<string, string> = {};
  for (const s of skills) skillsMap[s.slug] = s.name;

  return <SetupClient setups={setups} toolsMap={toolsMap} skillsMap={skillsMap} />;
}
