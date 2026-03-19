import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white">404</h1>
      <p className="mt-2 text-[#8b8e94]">Page not found</p>
      <Link href="/" className="mt-4 text-[#6c5ce7] hover:text-[#7c6ff7] transition-colors">
        Go home
      </Link>
    </main>
  );
}
