"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/toolkit", label: "My Toolkit" },
  { href: "/starter", label: "Project Starter" },
  { href: "/learn", label: "Learning Path" },
  { href: "/feed", label: "What's New" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0e1217]/80 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-white tracking-tighter"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-emerald-400">Dev</span>Toolkit
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center bg-white/[0.03] rounded-xl p-1 ring-1 ring-white/[0.04]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-300 active:scale-[0.97] ${
                  pathname.startsWith(link.href)
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-[#8b8e94] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-xl hover:bg-white/[0.04] transition-colors duration-200"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[#e4e6eb] transition-transform duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#e4e6eb] transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#e4e6eb] transition-transform duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-white/[0.04] bg-[#0e1217]/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-3 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  pathname.startsWith(link.href)
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-[#8b8e94] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
