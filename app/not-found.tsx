import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white tracking-tighter">404</h1>
      <p className="mt-2 text-[#8b8e94]">Page not found</p>
      <Link href="/" className="mt-4 text-emerald-500 hover:text-emerald-400 transition-colors duration-200">
        Go home
      </Link>
    </main>
  );
}
