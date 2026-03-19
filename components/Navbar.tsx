"use client";

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

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DevToolkit
          </Link>
          <div className="flex gap-1 sm:gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
