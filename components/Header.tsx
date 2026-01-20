import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* LOGO → HOME */}
        <Link
          href="/"
          className="text-lg font-semibold hover:opacity-90"
        >
          RepoRequiem
        </Link>

        <nav className="flex gap-6 text-[var(--color-muted)]">
          <Link href="/graves" className="hover:text-white">
            Graves
          </Link>
          <Link href="/profile" className="hover:text-white">
            Profile
          </Link>
          <Link href="/lay" className="hover:text-white">
            Lay a Repo to Rest
          </Link>
        </nav>
      </div>
    </header>
  );
}
