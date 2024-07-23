import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";

test.describe("app", () => {
  test("sign in and search by filling input and hit enter", async ({
    page,
  }) => {
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
    await page.click("data-testid=login-password-preview");
    await page.click(".Indicator-sc-acu4qz-0");
    await page.click("data-testid=login-button");
    await page.waitForURL("http://localhost:3000");
    await page.waitForSelector("text=Recently played tracks");
    await page.screenshot({ path: "home.png" });

    await page.click("text=Search");
    await page.waitForURL("/search");
    await page.waitForSelector("data-testid=loadingSpinner", {
      state: "hidden",
    }); // Replace '.spinner-selector' with the actual selector for the spinner
    const searchInput = page.getByPlaceholder("What do you want to play?");
    await searchInput.waitFor({ state: "attached" });
    await searchInput.fill("radiohead");
    await searchInput.press("Enter");
    await page.waitForURL("/search/radiohead");
    const inRainbowsAlbum = page.getByText("In Rainbows");
    await expect(inRainbowsAlbum).toBeVisible();
    await page.screenshot({ path: "search.png" });
  });
});
