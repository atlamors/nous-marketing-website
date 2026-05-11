import { DashboardColumn, InsightCard, WorkCard } from "./cards";
import { attentionCards, insightCards } from "./data";
import { Glyph } from "./icons";
import { Chip, GlyphButton, SegmentedTabs } from "./primitives";

export function ContextPanel() {
    return (
        <section className="col-start-2 flex min-h-0 flex-col overflow-hidden">
            <div className="flex h-[var(--nous-shell-contextbar-height)] items-center justify-between border-b border-[color:var(--nous-stroke-subtle)] px-[var(--nous-workspace-header-padding-x)]">
                <div className="flex items-center gap-[var(--nous-workspace-header-group-gap)]">
                    <div className="flex items-center gap-[var(--nous-workspace-header-title-gap)]">
                        <Glyph name="agent" className="text-[var(--nous-icon-fg-muted)]" />
                        <h2 className="text-sm text-[var(--nous-panel-header-fg)] font-semibold">Client onboarding</h2>
                    </div>
                    <SegmentedTabs
                        tabs={[
                            ["pulse", "Pulse", true],
                            ["workflow", "Workflow Editor", false],
                            ["history", "History", false]
                        ]}
                    />
                </div>
                <GlyphButton icon="settings" label="Settings" variant="surface" />
            </div>

            <div className="min-h-0 flex-1 overflow-hidden pl-[var(--nous-workspace-canvas-padding-left)] py-[var(--nous-workspace-canvas-padding-y)] pr-[var(--nous-workspace-canvas-padding-right)]">
                <div className="mb-[var(--nous-workspace-hero-margin-bottom)] max-w-xl">
                    <h3 className="text-[length:var(--nous-type-page-title)] font-semibold tracking-[-0.02em] text-[var(--nous-section-title-fg)]">Client onboarding</h3>
                    <p className="mt-[var(--nous-workspace-subtitle-margin-top)] text-md text-[var(--nous-fg-secondary)]">Automated client intake</p>
                    <div className="mt-[var(--nous-workspace-status-margin-top)] flex items-center gap-[var(--nous-workspace-status-gap)]">
                        <Chip variant="success">Running</Chip>
                        <span className="nous-mono text-xs text-[var(--nous-fg-quieter)]">73 days of uptime</span>
                        <span className="nous-mono text-xs text-[var(--nous-fg-quieter)]">·</span>
                        <span className="nous-mono text-xs text-[var(--nous-fg-primary)]">10 Agents</span>
                    </div>
                </div>

                <div className="grid w-full grid-cols-[repeat(2,minmax(0,1fr))] gap-[var(--nous-workspace-dashboard-gap)]">
                    <DashboardColumn icon="flag" title="Needs attention">
                        {attentionCards.map(([title, body, count]) => (
                            <WorkCard body={body} count={count} key={title} title={title} />
                        ))}
                    </DashboardColumn>
                    <DashboardColumn icon="pulse" title="Pulse insights">
                        {insightCards.map(([title, body, note]) => (
                            <InsightCard body={body} key={title} note={note} title={title} />
                        ))}
                    </DashboardColumn>
                </div>
            </div>
        </section>
    );
}

export { ContextPanel as WorkspaceCanvas };
