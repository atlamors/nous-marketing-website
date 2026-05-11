import { UpdateMiniCard } from "./cards";
import { updateCards } from "./data";
import { Glyph } from "./icons";
import { GlyphButton } from "./primitives";

export function WorkspaceUpdates() {
    return (
        <aside className="nous-updates-panel relative col-start-3 flex min-h-0 flex-col overflow-hidden border-l border-[color:var(--nous-stroke-subtle)] px-[var(--nous-updates-padding-x)] pb-[var(--nous-updates-padding-x)] pt-[var(--nous-updates-padding-top)]">
            <div className="mb-[var(--nous-updates-header-margin-bottom)] flex shrink-0 items-center justify-between">
                <GlyphButton icon="panelRightClose" className="text-[var(--nous-icon-fg-muted)]" label="Close workspace updates" />
                <div className="flex items-center gap-[var(--nous-updates-title-gap)]">
                    <Glyph name="timeline" className="text-[var(--nous-icon-fg-muted)]" />
                    <h2 className="text-sm text-[var(--nous-panel-header-fg)] font-semibold">Workspace updates</h2>
                </div>
                <div className="flex gap-[var(--nous-updates-actions-gap)]">
                    <GlyphButton icon="filter" label="Filter" variant="surface" />
                    <GlyphButton icon="settings" label="Tune" variant="surface" />
                </div>
            </div>
            <div className="nous-mobile-scrollbar -mr-[var(--nous-updates-scroll-gutter)] min-h-0 flex-1 space-y-[var(--nous-updates-list-gap)] overflow-y-auto pr-[var(--nous-updates-scroll-gutter)]">
                {updateCards.map(([title, body, time], index) => (
                    <UpdateMiniCard body={body} key={`${title}-${index}`} time={time} title={title} />
                ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[image:var(--nous-updates-bottom-fade)]" />
        </aside>
    );
}

export { WorkspaceUpdates as UpdatesPanel };
