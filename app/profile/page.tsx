import Heatmap from "@/components/Heatmap";

export default function ProfilePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 mt-28">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Profile
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
        This profile reflects effort and learning — not achievements.
      </p>

      {/* PROFILE CARD */}
      <section
        className="mt-14 border border-[var(--color-border)]
                   bg-[var(--color-surface)] p-8 rounded-xl"
      >
        <h2 className="text-lg font-medium tracking-tight">
          Anonymous Developer
        </h2>

        <p className="mt-2 text-sm text-[var(--color-muted)]">
          3 unfinished repositories • 40 active days
        </p>

        {/* HEATMAP */}
        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-wide text-[var(--color-muted)] mb-4">
            Activity Before Death
          </h3>

          <Heatmap />
        </div>
      </section>
    </main>
  );
}
