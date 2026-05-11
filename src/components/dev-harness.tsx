import type { HarnessCheck } from "@/lib/harness-checks";

type DevHarnessProps = {
  checks: HarnessCheck[];
};

export function DevHarness({ checks }: DevHarnessProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:px-10">
      <header className="flex flex-col gap-6 border-b border-[var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
            Frontend harness
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Build Next.js UI in a small, testable loop.
          </h1>
        </div>
        <div className="grid min-w-56 grid-cols-2 gap-3 text-sm">
          <Metric label="Router" value="App" />
          <Metric label="React" value="19" />
        </div>
      </header>

      <section className="grid gap-4 py-8 md:grid-cols-3">
        {checks.map((check) => (
          <article
            className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm"
            key={check.name}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{check.name}</h2>
              <span className="rounded-full bg-[#d7f2ec] px-3 py-1 text-xs font-semibold text-[#075047]">
                Ready
              </span>
            </div>
            <p className="text-sm leading-6 text-[var(--muted)]">{check.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4">
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}
