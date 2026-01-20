import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="max-w-xl mx-auto px-6 mt-32 text-center">
      {/* ICON / SYMBOL */}
      <div className="text-4xl mb-6">
        🪦
      </div>

      {/* TITLE */}
      <h1 className="text-2xl font-semibold">
        This repo has been laid to rest.
      </h1>

      {/* MESSAGE */}
      <p className="mt-4 text-[var(--color-muted)] leading-relaxed">
        Not every project ships.
        <br />
        But every project teaches something.
        <br /><br />
        Thank you for leaving this lesson behind.
      </p>

      {/* ACTIONS */}
      <div className="mt-10 flex flex-col gap-4 items-center">
        <Link
          href="/graves"
          className="text-[var(--color-accent)] hover:underline"
        >
          Read other graves
        </Link>

        <Link
          href="/lay"
          className="text-sm text-[var(--color-muted)] hover:text-white"
        >
          Lay another repo to rest
        </Link>
      </div>
    </main>
  );
}
