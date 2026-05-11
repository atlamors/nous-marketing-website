import { describe, expect, it } from "vitest";
import { getHarnessChecks } from "./harness-checks";

describe("getHarnessChecks", () => {
  it("returns the core frontend harness checks", () => {
    expect(getHarnessChecks()).toHaveLength(3);
    expect(getHarnessChecks().map((check) => check.name)).toContain(
      "Strict TypeScript"
    );
  });
});
