import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-6">
      {/* HERO */}
      <section className="mt-28">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-3xl">
          Every unfinished repo has a lesson.
        </h1>

        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)]">
          RepoRequiem is a dignified resting place for repositories
          that never shipped — but still taught something valuable.
        </p>

        <div className="mt-10">
          <Link
            href="/lay"
            className="inline-flex items-center bg-[var(--color-accent)]
                       text-[var(--color-bg)] px-6 py-3 rounded-md
                       font-semibold transition hover:opacity-90"
          >
            Lay Your Repo to Rest
          </Link>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="mt-32 grid gap-12 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-medium tracking-tight">
            Unfinished ≠ Useless
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            A project doesn’t need to ship to have value.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium tracking-tight">
            Failure is Experience
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Every failed repo leaves behind knowledge.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium tracking-tight">
            Lessons Outlive Code
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Code dies. Learning stays.
          </p>
        </div>
      </section>
    </main>
  );
}
