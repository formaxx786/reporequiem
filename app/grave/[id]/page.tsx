"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Grave {
  id: string;
  repo: string;
  description: string;
  tech: string;
  time: string;
  cause: string;
  lesson: string;
  createdAt: string;
}

export default function GraveDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [grave, setGrave] = useState<Grave | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("reporequiem_graves") || "[]"
    ) as Grave[];

    const found = stored.find((g) => g.id === id);
    setGrave(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-6 mt-28">
        <p className="text-sm text-[var(--color-muted)]">
          Loading grave…
        </p>
      </main>
    );
  }

  if (!grave) {
    return (
      <main className="max-w-3xl mx-auto px-6 mt-28">
        <h1 className="text-2xl font-semibold tracking-tight">
          This grave does not exist.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          It may have been removed, or never laid to rest.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 mt-28">
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        {grave.repo}
      </h1>

      <p className="mt-2 italic text-sm text-[var(--color-danger)]">
        Died of {grave.cause}
      </p>

      {/* META */}
      <div
        className="mt-10 border border-[var(--color-border)]
                   bg-[var(--color-surface)] p-8 rounded-xl text-sm"
      >
        <p>
          <span className="text-[var(--color-muted)]">
            Tech stack:
          </span>{" "}
          {grave.tech}
        </p>

        <p className="mt-3">
          <span className="text-[var(--color-muted)]">
            Time spent:
          </span>{" "}
          {grave.time}
        </p>
      </div>

      {/* DESCRIPTION */}
      {grave.description && (
        <div className="mt-14">
          <h3 className="text-xs uppercase tracking-wide text-[var(--color-muted)] mb-3">
            What it was meant to be
          </h3>
          <p className="text-[15px] leading-relaxed text-gray-300">
            {grave.description}
          </p>
        </div>
      )}

      {/* FINAL LESSON */}
      <div className="mt-16 border-l-4 border-[var(--color-accent)] pl-6">
        <p className="text-lg leading-relaxed">
          “{grave.lesson}”
        </p>
      </div>

      {/* DATE */}
      <p className="mt-12 text-xs text-[var(--color-muted)]">
        Laid to rest on{" "}
        {new Date(grave.createdAt).toLocaleDateString()}
      </p>
    </main>
  );
}
