import { expect, test } from "@playwright/test";

test("design system page documents the Nous workspace UI", async ({ page }) => {
  await page.goto("/design-system");

  await expect(
    page.getByRole("heading", {
      name: "Nous app shell reference"
    })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Canonical workspace specimen" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Component visualized design system" })).toBeVisible();
});
