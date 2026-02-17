"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Grave {
  id: string;
  repo: string;
  cause: string;
  lesson: string;
}

export default function GravesPage() {
  const [graves, setGraves] = useState<Grave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGraves() {
      try {
        const response = await fetch("/api/graves", { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to fetch graves");
        }

        const data = (await response.json()) as { graves: Grave[] };
        setGraves(data.graves);
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(fetchError instanceof Error ? fetchError.message : "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchGraves();

    return () => controller.abort();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 mt-28">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Graves</h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
        A collection of unfinished repositories and the lessons they left behind.
      </p>

      <section className="mt-14 space-y-8">
        {loading && <p className="italic text-sm text-[var(--color-muted)]">Loading graves…</p>}

        {error && <p className="italic text-sm text-[var(--color-danger)]">{error}</p>}

        {!loading && !error && graves.length === 0 && (
          <p className="italic text-sm text-[var(--color-muted)]">No repos have been laid to rest yet.</p>
        )}

        {!loading &&
          !error &&
          graves.map((grave) => (
            <Link
              key={grave.id}
              href={`/grave/${grave.id}`}
              className="block border border-[var(--color-border)]
                       bg-[var(--color-surface)] p-8 rounded-xl
                       transition hover:border-white/20"
            >
              <h3 className="text-lg font-medium tracking-tight">{grave.repo}</h3>

              <p className="mt-1 italic text-sm text-[var(--color-danger)]">Died of {grave.cause}</p>

              <p className="mt-4 text-[15px] leading-relaxed text-gray-300">{grave.lesson}</p>
            </Link>
          ))}
      </section>
    </main>
  );
}
