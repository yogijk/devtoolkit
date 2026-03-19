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
    <nav className="border-b border-white/[0.06] bg-[#0e1217] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-white tracking-tighter"
            onClick={() => setIsOpen(false)}
          >
            DevToolkit
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <div className="hidden sm:flex gap-1 sm:gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                  pathname.startsWith(link.href)
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-[#8b8e94] hover:text-white hover:bg-[#1c1f26]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger button — visible on mobile only */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-[#1c1f26] transition-colors duration-200"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[#e4e6eb] transition-transform duration-200 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#e4e6eb] transition-opacity duration-200 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#e4e6eb] transition-transform duration-200 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — full-width panel below navbar */}
      {isOpen && (
        <div className="sm:hidden border-t border-white/[0.06] bg-[#0e1217] w-full">
          <div className="flex flex-col px-4 py-3 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith(link.href)
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-[#8b8e94] hover:text-white hover:bg-[#1c1f26]"
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
