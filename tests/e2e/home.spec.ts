import { expect, test } from "@playwright/test";

test("home page presents the Nous homepage narrative", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Your personal agent, from chat to operating system."
    })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Chat mode" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Workspace mode" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The labs built the neurons. Nous builds the brain." })).toBeVisible();
});
