import { AgentPattern } from "@/lib/types";

interface Props {
  pattern: AgentPattern;
}

export default function AgentPatternCard({ pattern }: Props) {
  return (
    <div className="bg-[#1c1f26]/80 rounded-2xl p-6 ring-1 ring-white/[0.04] flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">{pattern.name}</h3>

      <p className="text-[#e4e6eb]/70 text-sm leading-relaxed">
        {pattern.description}
      </p>

      <div>
        <p className="text-xs font-semibold text-[#e4e6eb]/40 uppercase tracking-wider mb-1">
          When to use
        </p>
        <p className="text-sm text-[#e4e6eb]/70">{pattern.whenToUse}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#e4e6eb]/40 uppercase tracking-wider mb-2">
          Diagram
        </p>
        <div className="bg-[#0e1217] rounded-xl px-5 py-4 font-mono text-sm text-emerald-400/80 whitespace-pre">
          {pattern.diagram}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[#e4e6eb]/40 uppercase tracking-wider mb-1">
          Example
        </p>
        <p className="text-sm text-[#e4e6eb]/50 italic">{pattern.example}</p>
      </div>
    </div>
  );
}
