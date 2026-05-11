import { AgentDrawer } from "./agent-drawer";
import { AssetSidebar } from "./asset-sidebar";
import { AppTopBar, IconRail } from "./chrome";
import { ContextPanel } from "./context-panel";
import { WorkspaceUpdates } from "./workspace-updates";

export type WorkspaceMockupMode = "chat" | "workspace";

export function WorkspaceMockup({ mode = "workspace" }: { mode?: WorkspaceMockupMode }) {
    return (
        <div className="nous-app relative grid h-[var(--nous-demo-frame-height)] min-w-[var(--nous-demo-frame-min-width)] w-full grid-cols-[var(--nous-shell-rail-width)_minmax(0,1fr)] grid-rows-[var(--nous-shell-topbar-height)_1fr] overflow-hidden rounded-[var(--nous-radius-xl)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-chrome)] shadow-[var(--nous-shadow-card)] ring-1 ring-black/40">
            <AppTopBar mode={mode} />
            <IconRail />
            <div className="nous-app-chrome relative col-start-2 row-start-2 mb-[var(--nous-shell-frame-inset)] mr-[var(--nous-shell-frame-inset)] grid min-h-0 grid-cols-[var(--nous-shell-sidebar-width)_minmax(0,1fr)_var(--nous-shell-updates-width)] overflow-hidden rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-subtle)]">
                <AssetSidebar />
                <ContextPanel />
                <WorkspaceUpdates />
            </div>
            <AgentDrawer />
        </div>
    );
}
