import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevHarness } from "./dev-harness";

describe("DevHarness", () => {
  it("renders supplied checks", () => {
    render(
      <DevHarness
        checks={[
          {
            name: "Fast Feedback",
            description: "A useful harness keeps local checks close at hand."
          }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Fast Feedback" })).toBeVisible();
  });
});
