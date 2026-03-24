"use client";

import { useState } from "react";
import { ReferenceSheet } from "@/lib/types";

export default function ReferenceSheets({ sheets }: { sheets: ReferenceSheet[] }) {
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {sheets.map((sheet) => {
        const isOpen = openSheet === sheet.id;

        return (
          <div key={sheet.id} className="rounded-lg border border-[#2a2d35] overflow-hidden">
            <button
              onClick={() => setOpenSheet(isOpen ? null : sheet.id)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#1a1d24] hover:bg-[#22252d] transition-colors duration-150 text-left"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-lg">{sheet.icon}</span>
                <span className="text-sm font-medium text-[#e4e6eb]">{sheet.title}</span>
                <span className="text-xs text-[#5a5d65]">
                  {sheet.tables.reduce((acc, t) => acc + t.rows.length, 0)} items
                </span>
              </span>
              <span
                className={`text-[#5a5d65] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {isOpen && (
              <div className="px-4 py-4 bg-[#13151a] space-y-5">
                {sheet.tables.map((table, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-semibold text-[#8b8e94] uppercase tracking-wider mb-2">
                      {table.title}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#2a2d35]">
                            <th className="text-left py-1.5 pr-4 text-[#5a5d65] font-medium text-xs">
                              {table.columns[0]}
                            </th>
                            <th className="text-left py-1.5 text-[#5a5d65] font-medium text-xs">
                              {table.columns[1]}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map(([col1, col2], rowIdx) => (
                            <tr
                              key={rowIdx}
                              className="border-b border-[#1e2028] last:border-0"
                            >
                              <td className="py-1.5 pr-4 font-mono text-xs text-emerald-400 whitespace-nowrap">
                                {col1}
                              </td>
                              <td className="py-1.5 text-xs text-[#8b8e94]">{col2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
