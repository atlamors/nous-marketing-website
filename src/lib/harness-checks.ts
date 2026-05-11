export type HarnessCheck = {
  name: string;
  description: string;
};

export function getHarnessChecks(): HarnessCheck[] {
  return [
    {
      name: "Strict TypeScript",
      description:
        "Path aliases, typed routes, isolated modules, and a no-emit typecheck script are wired in."
    },
    {
      name: "Quality Gates",
      description:
        "ESLint, Prettier, Vitest, Playwright, and a combined check script give each change a repeatable path to green."
    },
    {
      name: "App Router",
      description:
        "The app starts with server-first composition and keeps client interactivity opt-in."
    }
  ];
}
