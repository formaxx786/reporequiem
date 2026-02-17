"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LayRepoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    repo: "",
    description: "",
    tech: "",
    time: "Days",
    cause: "Burnout",
    lesson: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.lesson.trim()) {
      alert("Final lesson is required.");
      return;
    }

    if (!form.repo.trim()) {
      alert("Repository name is required.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/graves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { error?: string };
        throw new Error(errorBody.error || "Unable to lay this repo to rest.");
      }

      router.push("/success");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 mt-28">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Lay a Repo to Rest
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
        This is a quiet place to reflect on an unfinished project and leave behind what it taught
        you.
      </p>

      <form onSubmit={handleSubmit} className="mt-14 space-y-10">
        <div>
          <label className="block text-sm mb-2">Repository name</label>
          <input
            name="repo"
            value={form.repo}
            onChange={handleChange}
            placeholder="auth-system-v2"
            className="w-full bg-[var(--color-surface)]
                       border border-[var(--color-border)]
                       px-4 py-3 rounded-md
                       text-white placeholder:text-[var(--color-muted)]
                       focus:outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">What were you trying to build?</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="A brief description of the idea behind this repo..."
            rows={3}
            className="w-full bg-[var(--color-surface)]
                       border border-[var(--color-border)]
                       px-4 py-3 rounded-md
                       text-white placeholder:text-[var(--color-muted)]
                       focus:outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Tech stack</label>
          <input
            name="tech"
            value={form.tech}
            onChange={handleChange}
            placeholder="React, Node.js, PostgreSQL"
            className="w-full bg-[var(--color-surface)]
                       border border-[var(--color-border)]
                       px-4 py-3 rounded-md
                       text-white placeholder:text-[var(--color-muted)]
                       focus:outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Time spent</label>
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full bg-[var(--color-surface)]
                       border border-[var(--color-border)]
                       px-4 py-3 rounded-md
                       text-white focus:outline-none focus:border-white/30"
          >
            <option>Days</option>
            <option>Weeks</option>
            <option>Months</option>
            <option>More than a year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Cause of death</label>
          <select
            name="cause"
            value={form.cause}
            onChange={handleChange}
            className="w-full bg-[var(--color-surface)]
                       border border-[var(--color-border)]
                       px-4 py-3 rounded-md
                       text-white focus:outline-none focus:border-white/30"
          >
            <option>Burnout</option>
            <option>Scope creep</option>
            <option>No users</option>
            <option>Overengineering</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">
            Final lesson <span className="text-[var(--color-muted)]">(required)</span>
          </label>
          <textarea
            name="lesson"
            value={form.lesson}
            onChange={handleChange}
            placeholder="What did this project teach you?"
            rows={5}
            className="w-full bg-[var(--color-surface)]
                       border-l-4 border-[var(--color-accent)]
                       border-t border-r border-b border-[var(--color-border)]
                       px-4 py-4 rounded-md
                       text-white placeholder:text-[var(--color-muted)]
                       focus:outline-none focus:border-white/30"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center
                       bg-[var(--color-accent)]
                       text-[var(--color-bg)]
                       px-6 py-3 rounded-md
                       font-semibold transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Laying to rest..." : "Lay This Repo to Rest"}
          </button>
        </div>
      </form>
    </main>
  );
}
