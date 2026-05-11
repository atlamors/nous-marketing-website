import { HeroModeTabs } from "./hero-mode-tabs";

const problemCards = [
  [
    "Chat does not run operations",
    "Most assistants can answer, draft, and suggest. Nous keeps workflows moving after the conversation ends."
  ],
  [
    "Autonomy needs boundaries",
    "Agents become useful when actions are permissioned, inspectable, and stopped for approval when judgment matters."
  ],
  [
    "Your intelligence should be portable",
    "Memory, models, skills, and workflows should belong to you — not one provider's locked surface."
  ]
] as const;

const storyBands = [
  [
    "Remember context across work",
    "Projects, people, preferences, decisions, and open loops persist beyond one prompt. Nous brings the right memory into the next action without trapping it in one model provider.",
    "Memory"
  ],
  [
    "Run workflows after chat ends",
    "Repeated asks become durable workflows: intake reviews, follow-ups, research briefs, weekly planning, and anything else that should not restart from scratch.",
    "Workflows"
  ],
  [
    "Give agents boundaries",
    "Agents can draft, compare, search, and prepare — but approvals, permissions, and review gates stay visible before judgment-sensitive actions happen.",
    "Governance"
  ]
] as const;

const architectureLayers = [
  ["Cortex", "Decide, approve, inhibit, and explain."],
  ["Memory", "Stage, retrieve, distill, and compound context."],
  ["Subcortex", "Route models, execute tools, and run workflows."],
  ["Autonomic", "Store, schedule, maintain, and recover quietly."]
] as const;

export function Homepage() {
  return (
    <main className="nous-design-system nous-app-chrome min-h-screen overflow-hidden text-[var(--nous-fg-primary)]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(111,140,255,0.2),transparent_34rem),radial-gradient(circle_at_18%_24%,rgba(119,228,255,0.08),transparent_24rem),linear-gradient(180deg,#030407_0%,#06070b_42%,#030407_100%)]" />
      <div className="nous-constellation pointer-events-none fixed inset-0 -z-10 opacity-45" />
      <SiteHeader />
      <section className="relative mx-auto grid w-full max-w-[1500px] gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8 lg:pb-28 lg:pt-16 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="pointer-events-none absolute left-1/2 top-28 -z-0 size-[34rem] -translate-x-1/2 rounded-full border border-white/[0.03] bg-[radial-gradient(circle,rgba(111,140,255,0.12),transparent_58%)] blur-sm" />
        <div className="flex flex-col justify-center lg:min-h-[760px] lg:pb-20">
          <p className="nous-mono w-fit rounded-full border border-[color:var(--nous-stroke-subtle)] bg-white/[0.03] px-3 py-1 text-xs tracking-[0.14em] text-[var(--nous-accent-info-fg-strong)] shadow-[var(--nous-shadow-card)]">
            OPEN SOURCE · LOCAL-FIRST · AGENT OS
          </p>
          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--nous-fg-title)] sm:text-6xl lg:text-[62px] lg:leading-[0.93] xl:text-[74px]">
            Your personal agent, from chat to operating system.
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-8 text-[var(--nous-fg-muted)] sm:text-xl">
            Start with a conversation. Nous turns intent into inspectable workflows, governed agents, portable memory, and automations that keep working after chat ends.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="whitespace-nowrap rounded-full bg-[#eef3ff] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_34px_rgba(238,243,255,0.16)] transition hover:scale-[1.02]" href="#waitlist">
              Request early access
            </a>
            <a className="whitespace-nowrap rounded-full border border-[color:var(--nous-stroke-default)] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-[var(--nous-fg-title)] transition hover:border-[color:var(--nous-stroke-strong)]" href="#architecture">
              Read the architecture
            </a>
          </div>
        </div>

        <HeroModeTabs />
      </section>

      <section className="border-y border-[color:var(--nous-stroke-subtle)] bg-black/20 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="nous-mono text-xs tracking-[0.14em] text-[var(--nous-fg-quieter)]">WHY NOUS</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--nous-fg-title)] sm:text-5xl">
              AI is ready to work. The products are holding it back.
            </h2>
          </div>
          <p className="text-lg leading-8 text-[var(--nous-fg-muted)]">
            The intelligence is already here. What is missing is the layer around it: memory you own, workflows agents can run, governance you can trust, and an interface that works for both beginners and builders.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-[1180px] gap-4 md:grid-cols-3">
          {problemCards.map(([title, body]) => (
            <article className="rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-reference-panel-bg)] p-5 shadow-[var(--nous-shadow-card)]" key={title}>
              <h3 className="text-lg font-semibold tracking-[-0.025em] text-[var(--nous-fg-title)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--nous-fg-muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px] space-y-5">
          {storyBands.map(([title, body, label], index) => (
            <article className="group grid overflow-hidden rounded-[calc(var(--nous-radius-xl)+4px)] border border-[color:var(--nous-stroke-soft)] bg-[linear-gradient(90deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] lg:grid-cols-[0.74fr_1.26fr]" key={title}>
              <div className="p-6 sm:p-8">
                <p className="nous-mono text-[length:var(--nous-type-micro-xs)] tracking-[0.16em] text-[var(--nous-accent-info-fg-strong)]">0{index + 1} · {label}</p>
                <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-[-0.045em] text-[var(--nous-fg-title)] sm:text-5xl">{title}</h2>
              </div>
              <div className="relative border-t border-[color:var(--nous-stroke-soft)] p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[rgba(111,140,255,0.55)] to-transparent opacity-0 transition group-hover:opacity-100 lg:block" />
                <p className="max-w-2xl text-lg leading-8 text-[var(--nous-fg-muted)]">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="nous-mono text-xs tracking-[0.14em] text-[var(--nous-accent-info-fg-strong)]">LOCAL-FIRST BY DEFAULT</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--nous-fg-title)] sm:text-5xl">
              Your operating layer should be yours.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--nous-fg-muted)]">
              Use cloud models when they help. Keep memory, workflows, permissions, and tool traces in an open layer you can inspect, move, and extend.
            </p>
          </div>
          <div className="rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-default)] bg-[#05070d]/80 p-5 shadow-[var(--nous-shadow-drawer)]">
            <div className="flex items-center gap-2 border-b border-[color:var(--nous-stroke-subtle)] pb-4">
              <span className="size-3 rounded-full bg-[#ff6b6b]" />
              <span className="size-3 rounded-full bg-[#ffd166]" />
              <span className="size-3 rounded-full bg-[#6ee7b7]" />
              <span className="nous-mono ml-3 text-xs text-[var(--nous-fg-quieter)]">nous/system.manifest</span>
            </div>
            <div className="nous-mono grid gap-3 pt-5 text-sm text-[var(--nous-fg-secondary)]">
              {[
                ["memory", "local + portable"],
                ["models", "swappable"],
                ["workflows", "inspectable"],
                ["tools", "permissioned"],
                ["source", "open"]
              ].map(([key, value]) => (
                <div className="grid grid-cols-[7rem_1fr] rounded-[var(--nous-radius-md)] border border-[color:var(--nous-stroke-soft)] bg-white/[0.025] px-4 py-3" key={key}>
                  <span className="text-[var(--nous-fg-quieter)]">{key}</span>
                  <span className="text-[var(--nous-fg-title)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8" id="architecture">
        <div>
          <p className="nous-mono text-xs tracking-[0.14em] text-[var(--nous-accent-info-fg-strong)]">THE MIND MODEL</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--nous-fg-title)] sm:text-5xl">
            The labs built the neurons. Nous builds the brain.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--nous-fg-muted)]">
            Foundation models are becoming interchangeable compute. Nous composes them into a persistent, governed system with memory, routing, workflows, and feedback loops.
          </p>
        </div>
        <div className="grid gap-3">
          {architectureLayers.map(([layer, body], index) => (
            <article className="group grid grid-cols-[56px_1fr] gap-4 rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-reference-panel-bg)] p-4 transition hover:border-[color:var(--nous-stroke-default)]" key={layer}>
              <div className="nous-mono grid size-11 place-items-center rounded-[var(--nous-radius-md)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)] text-sm text-[var(--nous-accent-info-fg-strong)]">
                0{index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-[var(--nous-fg-title)]">{layer}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--nous-fg-muted)]">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8" id="waitlist">
        <div className="mx-auto max-w-[1180px] rounded-[calc(var(--nous-radius-xl)+8px)] border border-[color:var(--nous-stroke-default)] bg-[radial-gradient(circle_at_50%_0%,rgba(111,140,255,0.2),transparent_32rem),var(--nous-reference-panel-bg)] p-8 text-center shadow-[var(--nous-shadow-drawer)] sm:p-12">
          <p className="nous-mono text-xs tracking-[0.14em] text-[var(--nous-fg-quieter)]">COME BUILD WITH US</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-[var(--nous-fg-title)] sm:text-5xl">
            Enter through chat. You are not trapped in chat.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--nous-fg-muted)]">
            Join the early list for an open-source AI workspace that is easy enough for everyone and powerful enough for serious work.
          </p>
          <a className="mt-8 inline-flex rounded-full bg-[var(--nous-fg-title)] px-5 py-3 text-sm font-semibold text-black" href="mailto:hello@ortho.ai?subject=Nous%20waitlist">
            Request early access
          </a>
        </div>
      </section>
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
      <a className="flex items-center gap-3" href="#top" aria-label="Nous home">
        <span className="grid size-9 place-items-center rounded-full border border-[color:var(--nous-stroke-default)] bg-[radial-gradient(circle,rgba(111,140,255,0.28),rgba(255,255,255,0.03))] text-[var(--nous-accent-info-fg-strong)] shadow-[0_0_34px_rgba(111,140,255,0.2)]">◌</span>
        <span className="text-lg font-semibold tracking-[-0.03em] text-[var(--nous-fg-title)]">Nous</span>
      </a>
      <nav className="hidden items-center gap-6 text-sm text-[var(--nous-fg-muted)] sm:flex" aria-label="Primary navigation">
        <a className="transition hover:text-[var(--nous-fg-title)]" href="#architecture">Architecture</a>
        <a className="transition hover:text-[var(--nous-fg-title)]" href="#waitlist">Waitlist</a>
      </nav>
    </header>
  );
}
