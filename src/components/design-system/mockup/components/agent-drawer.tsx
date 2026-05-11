"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

import { DisclosureTriangle, Glyph } from "./icons";
import { GlyphButton, SegmentedTabs } from "./primitives";

export function AgentDrawer() {
    const [isOpen, setIsOpen] = useState(true);
    const conversationScrollRef = useRef<HTMLDivElement>(null);
    const topicScrollRef = useRef<HTMLDivElement>(null);
    const topicDragRef = useRef({ left: 0, startX: 0, isDragging: false });

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const frame = requestAnimationFrame(() => {
            const scroller = conversationScrollRef.current;

            if (scroller) {
                scroller.scrollTop = scroller.scrollHeight;
            }
        });

        return () => cancelAnimationFrame(frame);
    }, [isOpen]);

    function handleTopicPointerDown(event: PointerEvent<HTMLDivElement>) {
        const scroller = topicScrollRef.current;

        if (!scroller) {
            return;
        }

        topicDragRef.current = {
            isDragging: true,
            left: scroller.scrollLeft,
            startX: event.clientX
        };
        scroller.setPointerCapture(event.pointerId);
    }

    function handleTopicPointerMove(event: PointerEvent<HTMLDivElement>) {
        const scroller = topicScrollRef.current;
        const drag = topicDragRef.current;

        if (!scroller || !drag.isDragging) {
            return;
        }

        scroller.scrollLeft = drag.left - (event.clientX - drag.startX);
    }

    function handleTopicPointerEnd(event: PointerEvent<HTMLDivElement>) {
        const scroller = topicScrollRef.current;

        topicDragRef.current.isDragging = false;
        scroller?.releasePointerCapture(event.pointerId);
    }

    if (!isOpen) {
        return (
            <button
                aria-label="Open client onboarding review drawer"
                className="absolute bottom-[var(--nous-drawer-floating-inset)] right-[var(--nous-drawer-floating-inset)] z-20 grid size-[var(--nous-control-size-lg)] place-items-center rounded-full border border-[color:var(--nous-stroke-default)] text-[var(--nous-fg-primary)] shadow-[var(--nous-shadow-drawer)] backdrop-blur transition"
                onClick={() => setIsOpen(true)}
                style={{
                    background: "var(--nous-drawer-floating-bg)"
                }}
                type="button"
            >
                <Glyph className="size-[var(--nous-control-icon-size-lg)] -mb-[1px] text-[var(--nous-fg-secondary)]" name="nous" strokeWidth={2 / 5} />
            </button>
        );
    }

    return (
        <aside
            aria-label="Client onboarding review drawer"
            className="absolute bottom-[var(--nous-drawer-inset)] right-[var(--nous-drawer-inset)] top-[var(--nous-drawer-top)] z-20 flex w-[var(--nous-drawer-width)] flex-col rounded-[var(--nous-radius-lg)] border border-[color:var(--nous-stroke-default)] shadow-[var(--nous-shadow-drawer)] backdrop-blur"
            style={{
                background:
                    "var(--nous-drawer-overlay-bg)"
            }}
        >
            <div className="flex items-center justify-between border-b border-[color:var(--nous-stroke-subtle)] px-[var(--nous-drawer-header-padding-x)] py-[var(--nous-drawer-header-padding-y)]">
                <SegmentedTabs
                    tabs={[
                        ["nous", "Nue", false],
                        ["databaseZap", "Coaching", false],
                        ["agent", "Client Onboarding", true]
                    ]}
                />
                <div className="flex items-center gap-[var(--nous-drawer-header-actions-gap)]">
                    <GlyphButton icon="historyClock" label="View review history" variant="surface" />
                    <GlyphButton icon="close" label="Close drawer" onClick={() => setIsOpen(false)} />
                </div>
            </div>
            <div className="nous-mono border-b border-[color:var(--nous-stroke-subtle)] py-[var(--nous-drawer-topic-padding-y)] text-[length:var(--nous-type-micro-sm)] text-[var(--nous-fg-title)]">
                <div
                    className="mx-[var(--nous-drawer-topic-scroll-margin-x)] cursor-grab overflow-x-auto active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    onPointerCancel={handleTopicPointerEnd}
                    onPointerDown={handleTopicPointerDown}
                    onPointerMove={handleTopicPointerMove}
                    onPointerUp={handleTopicPointerEnd}
                    ref={topicScrollRef}
                >
                    <div className="flex w-max gap-[var(--nous-drawer-topic-gap)] text-[length:var(--nous-type-micro-xs)]">
                        <TopicPill active>Review client intakes</TopicPill>
                        <TopicPill>Approved email drafts</TopicPill>
                        <TopicPill>Clients keep asking</TopicPill>
                        <TopicPill>Follow-ups Paused</TopicPill>
                        <TopicPill>Clients</TopicPill>
                    </div>
                </div>
            </div>
            <div
                className="nous-mobile-scrollbar flex-1 overflow-y-auto px-[var(--nous-drawer-body-padding-x)] py-[var(--nous-drawer-body-padding-y)] text-xs leading-[var(--nous-leading-drawer)] text-[var(--nous-drawer-body-fg-strong)]"
                ref={conversationScrollRef}
            >
                <div className="flex min-h-full flex-col justify-end">
                    <p className="max-w-[var(--nous-drawer-intro-max-width)]">
                        Tonya asked whether to use your standard 4-week onboarding plan or a lighter
                        first two weeks based on her stated capacity.
                    </p>
                    <div className="my-[var(--nous-drawer-message-margin-y)] ml-[var(--nous-drawer-message-offset-left)] rounded-[var(--nous-drawer-message-radius)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-message-bg)] px-[var(--nous-drawer-message-padding-x)] py-[var(--nous-drawer-message-padding-y)] text-[var(--nous-message-fg)]">
                        Why lighter? She seems like a good fit for the standard plan.
                    </div>
                    <p className="mb-2 flex items-center gap-[var(--nous-drawer-status-gap)] font-semibold text-[var(--nous-drawer-meta-fg)]">
                        Worked for 18s <DisclosureTriangle className="-rotate-90" />
                    </p>
                    <div className="space-y-[var(--nous-drawer-result-gap)] border-t border-[color:var(--nous-stroke-subtle)] pt-[var(--nous-drawer-result-padding-top)]">
                        <p className="text-[var(--nous-drawer-result-fg)]">The revised plan is ready.</p>
                        <p>
                            I kept weekly accountability check-ins, changed weeks 1–2 to a lighter setup
                            cadence, and left weeks 3–4 on your standard execution rhythm.
                        </p>
                        <p>Nothing has been sent yet.</p>
                        <div>
                            <h3 className="mb-[var(--nous-drawer-result-title-margin-bottom)] font-semibold text-[var(--nous-drawer-result-fg)]">Changes made</h3>
                            <dl className="grid grid-cols-[var(--nous-drawer-dl-label-width)_1fr] gap-x-[var(--nous-drawer-status-gap)] text-[var(--nous-drawer-body-fg)]">
                                <dt className="nous-mono text-[length:var(--nous-type-meta)] font-semibold text-[var(--nous-drawer-meta-fg)]">Created</dt>
                                <dd>Tonya Silverman · 4-week onboarding plan</dd>
                                <dt className="nous-mono text-[length:var(--nous-type-meta)] font-semibold text-[var(--nous-drawer-meta-fg)]">Updated</dt>
                                <dd>Weeks 1–2 to lighter setup and cadence-building</dd>
                                <dt className="nous-mono text-[length:var(--nous-type-meta)] font-semibold text-[var(--nous-drawer-meta-fg)]">Updated</dt>
                                <dd>Welcome email draft with lighter-start language</dd>
                            </dl>
                        </div>
                        <div>
                            <h3 className="mb-[var(--nous-drawer-action-title-margin-bottom)] font-semibold text-[var(--nous-drawer-result-fg)]">Suggested actions</h3>
                            <ul className="list-disc space-y-1 pl-[var(--nous-drawer-list-padding-left)]">
                                <li>Review revised plan</li>
                                <li>Approve intake summary</li>
                                <li>Open welcome draft</li>
                                <li>Ask for changes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <DrawerCommandInput />
        </aside>
    );
}

function TopicPill({ active, children }: { active?: boolean; children: string }) {
    return <span className={`rounded-[var(--nous-radius-xs)] px-[var(--nous-drawer-topic-padding-x)] py-[var(--nous-drawer-topic-padding-y-item)] ${active ? "bg-[var(--nous-accent-info-bg-subtle)] text-[var(--nous-accent-info-fg-strong)]" : "bg-[var(--nous-control-bg-soft)] text-[var(--nous-fg-title)]"}`}>{children}</span>;
}

function DrawerCommandInput() {
    return (
        <div className="px-[var(--nous-drawer-input-padding-x)] pb-[var(--nous-drawer-input-padding-bottom)]">
            <div className="rounded-[var(--nous-radius-control-lg)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-command-input-bg)] text-[var(--nous-command-input-placeholder-fg)]">
                <p className="min-h-[var(--nous-drawer-command-min-height)] px-[var(--nous-drawer-command-padding-x)] py-[var(--nous-drawer-command-padding-y)] text-xs leading-4">
                    This direction looks good. Show me the revised plan first, then move to the next intake.
                    <span className="ml-px inline-block h-[var(--nous-drawer-caret-height)] w-px translate-y-0.5 animate-[nous-caret-blink_1s_steps(1,end)_infinite] bg-[var(--nous-drawer-body-fg)]" />
                </p>
                <div className="flex items-center justify-between border-t border-[color:var(--nous-stroke-subtle)] px-[var(--nous-drawer-command-toolbar-padding-x)] py-[var(--nous-drawer-command-toolbar-padding-y)]">
                    <div className="flex items-center gap-[var(--nous-control-gap)] text-[var(--nous-icon-fg-subtle)]">
                        <Glyph name="add" className="size-5.5" strokeWidth={1.4} />
                        <Glyph name="squareSlash" className="size-5" strokeWidth={1.4} />
                    </div>
                    <div className="flex items-center gap-[var(--nous-drawer-command-actions-gap)] text-[var(--nous-icon-fg-subtle)]">
                        <Glyph name="mic" className="size-5" strokeWidth={1.4} />
                        <span className="grid size-8 place-items-center rounded-[var(--nous-control-radius-md)] border border-[color:var(--nous-stroke-subtle)] bg-[var(--nous-control-bg-soft)] text-[var(--nous-drawer-result-fg)]">
                            <Glyph name="send" className="size-5" strokeWidth={1.4} />
                        </span>
                    </div>
                </div>
            </div >
        </div >
    );
}
