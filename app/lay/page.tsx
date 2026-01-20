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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.lesson.trim()) {
      alert("Final lesson is required.");
      return;
    }

    const existing = JSON.parse(
      localStorage.getItem("reporequiem_graves") || "[]"
    );

    const newGrave = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "reporequiem_graves",
      JSON.stringify([newGrave, ...existing])
    );

    router.push("/success");
  }

  return (
    <main className="max-w-3xl mx-auto px-6 mt-28">
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Lay a Repo to Rest
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
        This is a quiet place to reflect on an unfinished project and
        leave behind what it taught you.
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-14 space-y-10">
        {/* Repo name */}
        <div>
          <label className="block text-sm mb-2">
            Repository name
          </label>
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

        {/* Description */}
        <div>
          <label className="block text-sm mb-2">
            What were you trying to build?
          </label>
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

        {/* Tech stack */}
        <div>
          <label className="block text-sm mb-2">
            Tech stack
          </label>
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

        {/* Time */}
        <div>
          <label className="block text-sm mb-2">
            Time spent
          </label>
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

        {/* Cause */}
        <div>
          <label className="block text-sm mb-2">
            Cause of death
          </label>
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

        {/* FINAL LESSON */}
        <div>
          <label className="block text-sm mb-2">
            Final lesson{" "}
            <span className="text-[var(--color-muted)]">
              (required)
            </span>
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

        {/* SUBMIT */}
        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center
                       bg-[var(--color-accent)]
                       text-[var(--color-bg)]
                       px-6 py-3 rounded-md
                       font-semibold transition hover:opacity-90"
          >
            Lay This Repo to Rest
          </button>
        </div>
      </form>
    </main>
  );
}
