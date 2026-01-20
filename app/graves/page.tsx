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

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("reporequiem_graves") || "[]"
    );
    setGraves(stored);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 mt-28">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Graves
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
        A collection of unfinished repositories and the lessons they left behind.
      </p>

      {/* LIST */}
      <section className="mt-14 space-y-8">
        {graves.length === 0 && (
          <p className="italic text-sm text-[var(--color-muted)]">
            No repos have been laid to rest yet.
          </p>
        )}

        {graves.map((grave) => (
          <Link
            key={grave.id}
            href={`/grave/${grave.id}`}
            className="block border border-[var(--color-border)]
                       bg-[var(--color-surface)] p-8 rounded-xl
                       transition hover:border-white/20"
          >
            <h3 className="text-lg font-medium tracking-tight">
              {grave.repo}
            </h3>

            <p className="mt-1 italic text-sm text-[var(--color-danger)]">
              Died of {grave.cause}
            </p>

            <p className="mt-4 text-[15px] leading-relaxed text-gray-300">
              {grave.lesson}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
