import type { GlyphName } from "./icons";

export const sidebarSections = [
    {
        title: "Workflows",
        items: [
            ["agent", "Client onboarding", true],
            ["phone", "Cold calling", false],
            ["paperclip", "Invoicing", false],
            ["captions", "Content creation", false],
            ["mobile", "Social media", false]
        ]
    },
    {
        title: "Tasks",
        items: [
            ["agent", "Morning emails", false],
            ["phone", "Schedule review", false]
        ]
    },
    {
        title: "Chats",
        items: [
            ["user", "Tonya Silverman", false],
            ["user", "Johnathon Richmond", false],
            ["user", "Alena Maripova", false]
        ]
    }
] satisfies Array<{
    title: string;
    items: Array<[GlyphName, string, boolean]>;
}>;

export const attentionCards = [
    ["Review client intakes", "Completed intakes are ready for review.", "1"],
    ["Approve email drafts", "Welcome emails are ready to send. Personalized from goals.", "5"],
    ["Follow-ups paused", "Follow-ups are waiting on your scheduling rules.", "3"]
] as const;

export const insightCards = [
    ["Scheduling is slowing onboarding", "8 clients are waiting on kickoff booking.", "Move calendar selection before the welcome packet."],
    ["Clients keep asking this", "4 recent clients asked whether sessions are recorded.", "Add recording policy to the welcome packet FAQ."],
    ["Higher-touch plans convert faster", "Midweek accountability checks book kickoff calls sooner.", "Make them the default for urgent goals."]
] as const;

export const updateCards = [
    ["Morning emails finished", "Nue replied to 6 routine messages and left 2 client replies for review.", "2 min ago"],
    ["Invoice draft created", "The March coaching invoice is ready for Alena Maripova.", "8 min ago"],
    ["Content idea saved", "Nue pulled a recurring client question into this week's LinkedIn draft queue.", "16 min ago"],
    ["Schedule conflict spotted", "Johnathon Richmond's preferred kickoff time overlaps your blocked writing window.", "21 min ago"],
    ["Cold calling list updated", "12 leads were enriched; 3 look like a strong fit for the executive coaching offer.", "34 min ago"],
    ["Tonya Silverman moved forward", "Her intake summary is complete and waiting in Client onboarding.", "48 min ago"],
    ["Weekly review prepared", "Nous summarized wins, stalled clients, and suggested follow-ups for your Friday review.", "2 hr ago"],
    ["Cold calling list updated", "Removed stale leads and queued 9 new prospects for review.", "3 hr ago"],
    ["Welcome packet revised", "Recording policy language was added to the onboarding FAQ.", "Yesterday"],
    ["Kickoff prep attached", "Prep notes and goals were attached to 2 upcoming kickoff calls.", "2 days ago"]
] as const;
