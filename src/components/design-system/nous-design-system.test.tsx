import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DesignSystemDoc } from "./nous-design-system";

describe("DesignSystemDoc", () => {
  it("documents the intro, specimen, visual components, and compact tokens", () => {
    render(<DesignSystemDoc />);

    expect(screen.getByRole("heading", { name: /nous app shell reference/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /canonical workspace specimen/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /component visualized design system/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /compact token system visualization/i })).toBeVisible();
    expect(screen.getByText(/workflow data, task schemas/i)).toBeVisible();
    expect(screen.getAllByText("Client onboarding").length).toBeGreaterThan(0);
  });
});
