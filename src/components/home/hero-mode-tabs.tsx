"use client";

import { useEffect, useState } from "react";

import { WorkspaceMockup } from "@/components/design-system/mockup/components";

type Mode = "chat" | "workspace";

const modes = {
  chat: {
    body: "Ask in plain language, review the plan, and approve anything that crosses a boundary.",
    eyebrow: "Simple entry",
    label: "Chat mode",
    title: "Start with a conversation."
  },
  workspace: {
    body: "Open the workspace when you want the operating surface: memory, workflows, agents, tools, and activity.",
    eyebrow: "Full system",
    label: "Workspace mode",
    title: "Then inspect the system underneath."
  }
} satisfies Record<Mode, { body: string; eyebrow: string; label: string; title: string }>;

export function HeroModeTabs() {
  const [activeMode, setActiveMode] = useState<Mode>("chat");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveMode((current) => (current === "chat" ? "workspace" : "chat"));
    }, 7000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const active = modes[activeMode];

  return (
    <section
      className="relative mt-10 lg:mt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col items-start gap-4 text-left">
        <div
          aria-label="Hero product mode"
          className="inline-flex rounded-full border border-[color:var(--nous-stroke-default)] bg-black/50 p-1 shadow-[var(--nous-shadow-card)] backdrop-blur"
          role="group"
        >
          {(Object.keys(modes) as Mode[]).map((mode) => {
            const isActive = activeMode === mode;

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[var(--nous-fg-title)] text-black shadow-[0_0_24px_rgba(238,243,255,0.18)]"
                    : "text-[var(--nous-fg-secondary)] hover:text-[var(--nous-fg-title)]"
                }`}
                key={mode}
                onClick={() => {
                  setActiveMode(mode);
                  setIsPaused(true);
                }}
                type="button"
              >
                {modes[mode].label}
              </button>
            );
          })}
        </div>
        <div className="min-h-[104px] max-w-xl">
          <p className="nous-mono text-[length:var(--nous-type-micro-xs)] uppercase tracking-[0.16em] text-[var(--nous-accent-info-fg-strong)]">
            {active.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--nous-fg-title)] sm:text-[34px] sm:leading-tight">
            {active.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--nous-fg-muted)] sm:text-base">
            {active.body}
          </p>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[calc(var(--nous-radius-xl)+12px)] border border-[color:var(--nous-stroke-default)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] p-2 shadow-[0_44px_140px_rgba(0,0,0,0.62)] sm:p-3 lg:-mr-12 xl:-mr-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-white/[0.08] to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[calc(var(--nous-radius-xl)+12px)] ring-1 ring-white/[0.03]" />
        <div className="overflow-hidden rounded-[var(--nous-radius-xl)]">
          <div
            className={`min-w-[1180px] origin-top-left transition duration-700 ease-out ${
              activeMode === "chat"
                ? "translate-x-[-260px] scale-[1.06] lg:translate-x-[-360px] lg:scale-[1.1]"
                : "translate-x-0 scale-100"
            }`}
          >
            <WorkspaceMockup mode={activeMode} />
          </div>
        </div>
        <div className={`pointer-events-none absolute inset-0 z-10 transition duration-700 ${activeMode === "chat" ? "bg-[radial-gradient(circle_at_74%_55%,transparent_0,transparent_20rem,rgba(0,0,0,0.42)_38rem)]" : "bg-transparent"}`} />
      </div>
    </section>
  );
}
