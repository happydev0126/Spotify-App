import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";

test.describe("app", () => {
  test("sign in", async ({ page }) => {
    await setupClerkTestingToken({ page });

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Spotify clone");
    await page.waitForSelector("text=Sign in with Clerk", {
      state: "attached",
    });
    await page
      .locator("text=Sign in with Clerk")
      .screenshot({ path: "Clerk.png" });
    await page.click("text=Sign in with Clerk");
    await page.waitForSelector(".cl-socialButtonsBlockButton", {
      state: "attached",
    });
    await page.screenshot({ path: "Continue with spotify.png" });
    await page.click("text=Continue with Spotify");
    await page.waitForSelector("data-testid=login-button");
    await page.screenshot({ path: "log-in.png" });
    await page
      .locator("data-testid=login-username")
      .fill(process.env.E2E_CLERK_USER_USERNAME!);
    await page
      .locator("data-testid=login-password")
      .fill(process.env.E2E_CLERK_USER_PASSWORD!);
    await page.click("data-testid=login-button");
    await page.waitForURL("http://localhost:3000");
    await page.screenshot({ path: "home.png" });
  });
});
