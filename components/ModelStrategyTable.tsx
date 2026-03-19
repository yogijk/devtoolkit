import { ModelRow } from "@/lib/types";

interface Props {
  rows: ModelRow[];
}

function ModelBadge({ model }: { model: string }) {
  const lower = model.toLowerCase();
  if (lower === "haiku") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-cyan-500/10 text-cyan-400">
        {model}
      </span>
    );
  }
  if (lower === "sonnet") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-400">
        {model}
      </span>
    );
  }
  if (lower === "opus") {
    return (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-violet-500/10 text-violet-400">
        {model}
      </span>
    );
  }
  return <span className="text-sm text-[#e4e6eb]">{model}</span>;
}

function CostDot({ cost }: { cost: ModelRow["cost"] }) {
  const dotClass =
    cost === "Lowest"
      ? "bg-emerald-400"
      : cost === "Medium"
      ? "bg-yellow-400"
      : "bg-red-400";
  return (
    <span className="flex items-center gap-2">
      <span className={`inline-block w-2 h-2 rounded-full ${dotClass}`} />
      <span className="text-sm text-[#e4e6eb]/70">{cost}</span>
    </span>
  );
}

export default function ModelStrategyTable({ rows }: Props) {
  return (
    <>
      {/* Table view — sm and up */}
      <div className="hidden sm:block bg-[#1c1f26]/80 rounded-2xl ring-1 ring-white/[0.04] overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="px-5 py-3.5 font-semibold text-[#e4e6eb]/60 uppercase tracking-wider text-xs">
                Task Type
              </th>
              <th className="px-5 py-3.5 font-semibold text-[#e4e6eb]/60 uppercase tracking-wider text-xs">
                Model
              </th>
              <th className="px-5 py-3.5 font-semibold text-[#e4e6eb]/60 uppercase tracking-wider text-xs">
                Why
              </th>
              <th className="px-5 py-3.5 font-semibold text-[#e4e6eb]/60 uppercase tracking-wider text-xs">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-white/[0.04]">
                <td className="px-5 py-4 text-[#e4e6eb]">{row.taskType}</td>
                <td className="px-5 py-4">
                  <ModelBadge model={row.model} />
                </td>
                <td className="px-5 py-4 text-[#e4e6eb]/70">{row.why}</td>
                <td className="px-5 py-4">
                  <CostDot cost={row.cost} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view — below sm */}
      <div className="sm:hidden flex flex-col gap-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="bg-[#1c1f26]/80 rounded-2xl ring-1 ring-white/[0.04] p-4 flex flex-col gap-2"
          >
            <p className="text-[#e4e6eb] font-medium text-sm">{row.taskType}</p>
            <div className="flex items-center gap-3">
              <ModelBadge model={row.model} />
              <CostDot cost={row.cost} />
            </div>
            <p className="text-[#e4e6eb]/60 text-xs">{row.why}</p>
          </div>
        ))}
      </div>
    </>
  );
}
