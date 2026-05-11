import type { CSSProperties, ReactNode } from "react";

import { Glyph } from "./icons";
import type { GlyphName } from "./icons";
import { cn } from "./utils";

export type ChipVariant = "default" | "active" | "success" | "info" | "warning";
type ButtonVariant = "ghost" | "soft" | "primary" | "warning" | "icon";
type GlyphButtonVariant = "muted" | "surface";
type GlyphButtonSize = "default" | "rail";

export function Surface({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
    return (
        <article
            className={cn(
                "nous-surface rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-soft)] bg-[var(--nous-card-bg)]",
                className
            )}
            style={style}
        >
            {children}
        </article>
    );
}

export function NavItem({ active, icon, label }: { active?: boolean; icon: GlyphName; label: string }) {
    return (
        <a
            className={cn(
                "flex items-center gap-[var(--nous-nav-item-gap)] rounded-[var(--nous-radius-md)] p-[var(--nous-nav-item-padding)] text-sm font-semibold transition",
                active
                    ? "bg-[var(--nous-nav-item-bg-active)] border border-[color:var(--nous-stroke-soft)] text-[var(--nous-nav-item-fg-active)]"
                    : "text-[var(--nous-fg-body)] hover:bg-[var(--nous-nav-item-bg-active)]"
            )}
        >
            <Glyph name={icon} className="size-[var(--nous-nav-icon-size)] text-[var(--nous-icon-fg-muted)]" />
            <span className="truncate">{label}</span>
        </a>
    );
}

export function SegmentedTabs({ tabs }: { tabs: Array<[GlyphName, string, boolean]> }) {
    return (
        <div className="inline-flex rounded-[var(--nous-radius-sm)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-control)] p-[var(--nous-segmented-padding)] text-xs text-[var(--nous-fg-secondary)]">
            {tabs.map(([icon, label, active]) => (
                <span
                    className={cn(
                        "flex items-center gap-[var(--nous-segmented-item-gap)] rounded-[var(--nous-radius-xs)] pl-[var(--nous-segmented-item-padding-left)] py-[var(--nous-segmented-item-padding-y)] pr-[var(--nous-segmented-item-padding-right)]",
                        active && "bg-[var(--nous-bg-selected-subtle)] border border-[var(--nous-stroke-ghost)] text-[var(--nous-fg-primary)] shadow-sm"
                    )}
                    key={label}
                >
                    <Glyph name={icon} className={`h-2.5 w-2.5 ${active ? "text-[var(--nous-accent-info)]" : ""}`} />
                    {label}
                </span>
            ))}
        </div>
    );
}

export function CommandInput({ value }: { value: string }) {
    return (
        <div className="border-t border-[color:var(--nous-stroke-subtle)] p-4">
            <div className="flex min-h-20 items-start gap-3 rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-inset)] px-4 py-3 text-sm text-[var(--nous-fg-secondary)]">
                <Glyph name="add" className="mt-1 text-[var(--nous-fg-body)]" />
                <p className="flex-1 leading-6">{value}</p>
                <Glyph name="mic" className="mt-auto text-[var(--nous-fg-subtle)]" />
                <span className="mt-auto grid size-7 place-items-center rounded-[var(--nous-radius-md)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-primary)]">
                    <Glyph name="send" />
                </span>
            </div>
        </div>
    );
}

export function Button({ children, className, icon, variant = "soft" }: { children?: ReactNode; className?: string; icon?: GlyphName; variant?: ButtonVariant }) {
    const variants: Record<ButtonVariant, string> = {
        ghost: "text-[var(--nous-fg-body)] hover:bg-[var(--nous-control-bg-soft)]",
        icon: "size-8 border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-panel)] px-0 text-[var(--nous-fg-body)]",
        primary: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-accent-info-bg)] text-[var(--nous-accent-info-fg)]",
        soft: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-primary)]",
        warning: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-accent-warning-bg-muted)] text-[var(--nous-accent-warning)]"
    };

    return (
            <button
            className={cn(
                "nous-mono inline-flex items-center justify-center gap-[var(--nous-control-gap)] rounded-[var(--nous-control-radius-sm)] border px-[var(--nous-control-padding-x)] py-[var(--nous-control-padding-y)] text-xs transition",
                variants[variant],
                className
            )}
            type="button"
        >
            <span className="!text-[var(--nous-fg-primary)]">{children}</span>
            {icon ? <Glyph className="size-[var(--nous-control-icon-size-xs)]" name={icon} /> : null}
        </button>
    );
}

export function Chip({ children, variant = "default" }: { children: ReactNode; variant?: ChipVariant }) {
    const variants: Record<ChipVariant, string> = {
        active: "border-none nous-mono bg-[var(--nous-accent-info-bg)] text-[var(--nous-accent-info-fg)]",
        default: "border-none nous-mono bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-body)]",
        info: "border-none nous-mono bg-[var(--nous-accent-info-bg-subtle)] text-[var(--nous-accent-info-fg-muted)]",
        success: "border-none nous-mono bg-[var(--nous-accent-success-bg)] text-[var(--nous-accent-success-fg)]",
        warning: "border-none nous-mono bg-[var(--nous-accent-warning-bg)] text-[var(--nous-accent-warning)]"
    };

    return (
        <span className={cn("nous-mono inline-flex items-center rounded-full border px-4 py-0.75 text-xs", variants[variant])}>
            {children}
        </span>
    );
}

export function GlyphButton({
    active,
    buttonClassName,
    className,
    icon,
    iconClassName,
    label,
    onClick,
    size = "default",
    variant = "muted",
    tone
}: {
    active?: boolean;
    buttonClassName?: string;
    className?: string;
    icon: GlyphName;
    iconClassName?: string;
    label: string;
    onClick?: () => void;
    size?: GlyphButtonSize;
    tone?: "green";
    variant?: GlyphButtonVariant;
}) {
    const sizes: Record<GlyphButtonSize, string> = {
        default: "size-[var(--nous-control-size-sm)] rounded-[var(--nous-control-radius-xs)]",
        rail: "m-[var(--nous-rail-item-margin)] size-[var(--nous-control-size-md)] rounded-[var(--nous-radius-md)]"
    };
    const variants: Record<GlyphButtonVariant, string> = {
        muted: "border-transparent text-[var(--nous-icon-fg-muted)]",
        surface: "border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-bg-control)] text-[var(--nous-icon-fg-primary)]"
    };

    return (
        <button
            aria-label={label}
            className={cn(
                "grid place-items-center border transition",
                sizes[size],
                variants[variant],
                active && "bg-[var(--nous-accent-workspace)] text-[var(--nous-fg-primary)]",
                tone === "green" && "bg-[var(--nous-accent-success)] text-[var(--nous-fg-primary)]",
                !active && !tone && "hover:border-[color:var(--nous-stroke-subtle)] hover:bg-[var(--nous-control-bg-soft)]",
                buttonClassName,
                className
            )}
            onClick={onClick}
            type="button"
        >
            <Glyph className={cn("size-[var(--nous-control-icon-size-sm)]", iconClassName)} name={icon} strokeWidth={1.5} />
        </button>
    );
}
