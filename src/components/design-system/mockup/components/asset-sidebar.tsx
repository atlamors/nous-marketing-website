import { sidebarSections } from "./data";
import { DisclosureTriangle, Glyph } from "./icons";
import { GlyphButton, NavItem } from "./primitives";

export function AssetSidebar() {
    return (
        <aside className="col-start-1 flex min-h-0 flex-col border-r border-[color:var(--nous-stroke-subtle)]">
            <div className="flex items-center justify-between px-[var(--nous-sidebar-padding-x)] py-[var(--nous-sidebar-header-padding-y)] pt-[var(--nous-sidebar-header-padding-top)]">
                <div className="flex items-center gap-[var(--nous-sidebar-header-gap)]">
                    <div className="grid size-6 place-items-center rounded-full bg-[var(--nous-accent-workspace-deep)] text-[var(--nous-fg-primary)]">
                        <Glyph name="databaseZap" className="h-3 w-3" strokeWidth={2.25} />
                    </div>
                    <div className="flex items-center gap-[var(--nous-sidebar-header-control-gap)]">
                        <span className="font-semibold text-[var(--nous-sidebar-title-fg)]">Coaching</span>
                        <Glyph name="chevronDown" className="text-[var(--nous-fg-secondary)]" />
                    </div>
                </div>
                <div className="flex items-center gap-[var(--nous-sidebar-header-control-gap)]">
                    <GlyphButton icon="panelClose" label="Collapse asset sidebar" />
                    <GlyphButton icon="edit" label="Edit coaching workspace" variant="surface" />
                </div>
            </div>
            <nav aria-label="Workspace navigation" className="min-h-0 flex-1 space-y-[var(--nous-sidebar-nav-section-gap)] overflow-hidden px-[var(--nous-sidebar-padding-x)]">
                <div className="gap-[var(--nous-sidebar-nav-item-gap)] pt-[var(--nous-sidebar-nav-top-padding)]">
                    <NavItem icon="inbox" label="Inbox" />
                    <NavItem icon="pulse" label="Pulse" />
                </div>
                {sidebarSections.map((section) => (
                    <div key={section.title} className="space-y-[var(--nous-sidebar-section-item-gap)]">
                        <p className="mb-[var(--nous-sidebar-section-label-margin-bottom)] flex items-center gap-[var(--nous-sidebar-section-label-gap)] text-sm font-semibold text-[var(--nous-nav-section-label-fg)]">
                            {section.title} <DisclosureTriangle />
                        </p>
                        {section.items.map(([icon, label, active]) => (
                            <NavItem active={active} icon={icon} key={label} label={label} />
                        ))}
                    </div>
                ))}
            </nav>
            <div className="flex h-[var(--nous-shell-userbar-height)] items-center justify-between border-t border-[color:var(--nous-stroke-subtle)] p-[var(--nous-sidebar-footer-padding)]">
                <div className="flex items-center gap-[var(--nous-sidebar-user-gap)]">
                    <div className="size-7 rounded-full bg-gradient-to-br from-[#f4c7a0] to-[#116c7a]" />
                    <div>
                        <p className="text-sm/tight font-medium">Nue</p>
                        <p className="text-xs/tight italic text-[var(--nous-fg-secondary)]">Andrew</p>
                    </div>
                </div>
                <GlyphButton icon="settings" label="Workspace settings" />
            </div>
        </aside>
    );
}
