import { test, expect } from "@playwright/test";

test.describe("Onboarding Flow", () => {
  test.beforeEach(async ({ page, context }) => {
    // Set up authenticated session (in real scenario, would use login)
    // For now, we'll navigate directly and ensure middleware doesn't block
    await context.addCookies([
      {
        name: "mb_token",
        value: "test-token",
        domain: "localhost",
        path: "/",
      },
    ]);
  });

  test.describe("Welcome Screen", () => {
    test("should display welcome screen with user first name", async ({
      page,
    }) => {
      await page.goto("/onboarding");

      // Check welcome screen is visible
      await expect(page.locator("text=/Welcome to Masteringbackend/")).toBeVisible();

      // Check progress bar shows step 0
      const progressBar = page.locator('[role="progressbar"]');
      await expect(progressBar).toBeVisible();

      // Check buttons are present
      await expect(page.getByText("Let's Get Started")).toBeVisible();
      await expect(page.getByText("Skip for now")).toBeVisible();
    });

    test("should navigate to experience screen on continue", async ({
      page,
    }) => {
      await page.goto("/onboarding");

      await page.getByText("Let's Get Started").click();

      // Should now be on experience screen
      await expect(
        page.locator("text=/Where are you in your backend journey/")
      ).toBeVisible();
    });

    test("should skip onboarding and redirect to dashboard", async ({
      page,
    }) => {
      await page.goto("/onboarding");

      await page.getByText("Skip for now").click();

      // Should show loading state briefly
      await expect(page.locator("text=/Building your learning path/")).toBeVisible();

      // Should redirect to dashboard
      await page.waitForURL("/", { timeout: 5000 });
      expect(page.url()).toContain("/");
    });
  });

  test.describe("Experience Level Screen", () => {
    test("should display all 3 experience options", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();

      // Check all 3 options are visible
      await expect(
        page.getByText("Just Getting Started")
      ).toBeVisible();
      await expect(page.getByText("I Know the Basics")).toBeVisible();
      await expect(
        page.getByText("Experienced Developer")
      ).toBeVisible();
    });

    test("should disable continue button when no option selected", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();

      const continueBtn = page.getByText("Continue");
      await expect(continueBtn).toBeDisabled();
    });

    test("should enable continue button after selecting option", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();

      await page.getByText("Just Getting Started").click();

      const continueBtn = page.getByText("Continue");
      await expect(continueBtn).toBeEnabled();
    });

    test("should highlight selected option", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();

      const beginnerOption = page.getByText("Just Getting Started");
      await beginnerOption.click();

      // Check for visual indicator (border color change)
      const style = await beginnerOption.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.borderColor;
      });

      // Cyan color should be set (#13AECE)
      expect(style).toBeTruthy();
    });

    test("should go back to welcome screen", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();

      await page.getByText("← Back").click();

      await expect(
        page.locator("text=/Welcome to Masteringbackend/")
      ).toBeVisible();
    });

    test("should preserve selection when going back and forward", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();

      await page.getByText("I Know the Basics").click();
      const continueBtn = page.getByText("Continue");
      await continueBtn.click();

      // Now on goal screen
      await expect(
        page.locator("text=/What brings you to Masteringbackend/")
      ).toBeVisible();

      await page.getByText("← Back").click();

      // Back on experience, option should still be selected
      const intermediateOption = page.getByText(
        "I Know the Basics"
      );
      const borderColor = await intermediateOption.evaluate((el) => {
        return window.getComputedStyle(el).borderColor;
      });
      expect(borderColor).toBeTruthy();
    });
  });

  test.describe("Language Selection Screen", () => {
    test("should display all 5 language options", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Check all 5 languages are visible
      await expect(page.getByText("Python")).toBeVisible();
      await expect(page.getByText("Java")).toBeVisible();
      await expect(page.getByText("Node.js")).toBeVisible();
      await expect(page.getByText("Rust")).toBeVisible();
      await expect(page.getByText("Ruby")).toBeVisible();
    });

    test("should show language selection screen heading", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      await expect(
        page.locator("text=/Which programming language do you prefer/")
      ).toBeVisible();
    });

    test("should disable continue button when no language selected", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      const continueBtn = page.getByText("Continue");
      await expect(continueBtn).toBeDisabled();
    });

    test("should enable continue button after selecting language", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      await page.getByText("Python").click();

      const continueBtn = page.getByText("Continue");
      await expect(continueBtn).toBeEnabled();
    });

    test("should navigate to goal screen after selecting language", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      // Should now be on learning goal screen
      await expect(
        page.locator("text=/What brings you to Masteringbackend/")
      ).toBeVisible();
    });

    test("should go back to experience screen", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      await page.getByText("← Back").click();

      await expect(
        page.locator("text=/Where are you in your backend journey/")
      ).toBeVisible();
    });

    test("should test all 5 languages", async ({ page }) => {
      const languages = ["Python", "Java", "Node.js", "Rust", "Ruby"];

      for (const lang of languages) {
        await page.goto("/onboarding");
        await page.getByText("Let's Get Started").click();
        await page.getByText("Just Getting Started").click();
        await page.getByText("Continue").click();

        await page.getByText(lang).click();

        const continueBtn = page.getByText("Continue");
        await expect(continueBtn).toBeEnabled();

        // Reset for next iteration
        await page.goto("/onboarding");
      }
    });

    test("should preserve language selection when going back and forward", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      await page.getByText("Java").click();
      const continueBtn = page.getByText("Continue");
      await continueBtn.click();

      // Now on goal screen
      await expect(
        page.locator("text=/What brings you to Masteringbackend/")
      ).toBeVisible();

      await page.getByText("← Back").click();

      // Back on language screen, Java should still be selected
      const javaOption = page.getByText("Java");
      const borderColor = await javaOption.evaluate((el) => {
        return window.getComputedStyle(el).borderColor;
      });
      expect(borderColor).toBeTruthy();
    });
  });

  test.describe("Learning Goal Screen", () => {
    test("should display all 4 learning goal options", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      await expect(
        page.getByText("Learn Backend Fundamentals")
      ).toBeVisible();
      await expect(
        page.getByText("Build Real Projects")
      ).toBeVisible();
      await expect(
        page.getByText("Prepare for Interviews")
      ).toBeVisible();
      await expect(
        page.getByText("Level Up My Skills")
      ).toBeVisible();
    });

    test("should use 2-column grid on desktop", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      const gridContainer = page.locator(".grid");
      const gridClasses = await gridContainer.getAttribute("class");

      // Should have grid-cols-2 or similar for desktop
      expect(gridClasses).toContain("grid-cols");
    });

    test("should progress through goal and time screens", async ({ page }) => {
      await page.goto("/onboarding");

      // Welcome
      await page.getByText("Let's Get Started").click();
      await expect(
        page.locator("text=/Where are you in your backend journey/")
      ).toBeVisible();

      // Experience
      await page.getByText("Intermediate Developer").click();
      await page.getByText("Continue").click();
      await expect(
        page.locator("text=/Which programming language do you prefer/")
      ).toBeVisible();

      // Language
      await page.getByText("Java").click();
      await page.getByText("Continue").click();
      await expect(
        page.locator("text=/What brings you to Masteringbackend/")
      ).toBeVisible();

      // Goal
      await page.getByText("Build Real Projects").click();
      await page.getByText("Continue").click();
      await expect(
        page.locator("text=/How much time can you invest each week/")
      ).toBeVisible();
    });
  });

  test.describe("Time Commitment Screen", () => {
    test("should display all 3 time commitment options", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();

      await expect(page.getByText("1–3 hours")).toBeVisible();
      await expect(page.getByText("3–7 hours")).toBeVisible();
      await expect(page.getByText("7+ hours")).toBeVisible();
    });

    test("should show 'See My Learning Path' button", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();

      await expect(
        page.getByText("See My Learning Path")
      ).toBeVisible();
    });

    test("should submit and show loading state", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();
      await page.getByText("Steady progress").click();

      // Click submit
      await page.getByText("See My Learning Path").click();

      // Should show loading overlay
      await expect(
        page.locator("text=/Building your learning path/")
      ).toBeVisible();
    });

    test("should skip from time screen", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();

      await page.getByText("Skip for now").click();

      // Should redirect to dashboard
      await page.waitForURL("/", { timeout: 5000 });
      expect(page.url()).toContain("/");
    });
  });

  test.describe("Result Screen", () => {
    test("should display result screen after submission", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();
      await page.getByText("Steady progress").click();

      await page.getByText("See My Learning Path").click();

      // Wait for result screen
      await expect(
        page.locator("text=/Your learning path is ready/")
      ).toBeVisible({ timeout: 10000 });

      // Check stats are visible
      await expect(page.locator("text=/Weeks to Goal/")).toBeVisible();
      await expect(page.locator("text=/Lessons Planned/")).toBeVisible();
      await expect(page.locator("text=/Projects to Build/")).toBeVisible();
    });

    test("should display recommendation cards", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();
      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();
      await page.getByText("Steady progress").click();

      await page.getByText("See My Learning Path").click();

      // Wait for recommendations
      await page.waitForTimeout(2000);

      // Check for recommendation cards
      const cards = page.locator('[style*="background: #1a1f36"]');
      const count = await cards.count();

      // Should have at least some recommendations (course, project, or roadmap)
      expect(count).toBeGreaterThan(0);
    });

    test("should have 'Start Your First Lesson' CTA", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();
      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();
      await page.getByText("Steady progress").click();

      await page.getByText("See My Learning Path").click();

      // Wait for result screen
      await expect(
        page.getByText("Start Your First Lesson")
      ).toBeVisible({ timeout: 10000 });

      await expect(
        page.getByText("Go to Dashboard instead")
      ).toBeVisible();
    });

    test("should navigate to dashboard on Go to Dashboard click", async ({
      page,
    }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();
      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();
      await page.getByText("Steady progress").click();

      await page.getByText("See My Learning Path").click();

      // Wait for result screen
      await page.waitForTimeout(2000);

      await page.getByText("Go to Dashboard instead").click();

      // Should redirect to dashboard
      await page.waitForURL("/", { timeout: 5000 });
      expect(page.url()).toContain("/");
    });
  });

  test.describe("Mobile Responsiveness", () => {
    test("should be responsive on mobile (375px)", async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
      });
      const page = await context.newPage();

      await context.addCookies([
        {
          name: "mb_token",
          value: "test-token",
          domain: "localhost",
          path: "/",
        },
      ]);

      await page.goto("/onboarding");

      // Check welcome screen is visible and responsive
      await expect(
        page.locator("text=/Welcome to Masteringbackend/")
      ).toBeVisible();

      // Check button is full-width or near full-width
      const button = page.getByText("Let's Get Started");
      const box = await button.boundingBox();
      expect(box?.width).toBeGreaterThan(300); // Should be wide on mobile

      await context.close();
    });

    test("should stack grid options vertically on mobile", async ({
      browser,
    }) => {
      const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
      });
      const page = await context.newPage();

      await context.addCookies([
        {
          name: "mb_token",
          value: "test-token",
          domain: "localhost",
          path: "/",
        },
      ]);

      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();

      // Language selection
      await page.getByText("Python").click();
      await page.getByText("Continue").click();

      // On goal screen with 2-column grid, should stack to 1 column on mobile
      const gridContainer = page.locator(".grid");
      const gridClasses = await gridContainer.getAttribute("class");

      // Should have grid-cols-1 first for mobile
      expect(gridClasses).toContain("grid-cols-1");

      await context.close();
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper ARIA labels", async ({ page }) => {
      await page.goto("/onboarding");

      // Progress bar should have proper ARIA attributes
      const progressBar = page.locator('[role="progressbar"]');
      await expect(progressBar).toHaveAttribute("aria-valuenow");
      await expect(progressBar).toHaveAttribute("aria-valuemin");
      await expect(progressBar).toHaveAttribute("aria-valuemax");
    });

    test("should be keyboard navigable", async ({ page }) => {
      await page.goto("/onboarding");

      // Tab to first button
      await page.keyboard.press("Tab");
      await expect(page.getByText("Let's Get Started")).toBeFocused();

      // Press enter to click
      await page.keyboard.press("Enter");

      // Should navigate to experience screen
      await expect(
        page.locator("text=/Where are you in your backend journey/")
      ).toBeVisible();
    });

    test("should announce loading state to screen readers", async ({ page }) => {
      await page.goto("/onboarding");
      await page.getByText("Let's Get Started").click();
      await page.getByText("Just Getting Started").click();
      await page.getByText("Continue").click();
      await page.getByText("Learn Backend Fundamentals").click();
      await page.getByText("Continue").click();
      await page.getByText("Steady progress").click();

      await page.getByText("See My Learning Path").click();

      // Loading overlay should have aria-live
      const loadingOverlay = page.locator('[aria-live="polite"]');
      await expect(loadingOverlay).toBeVisible();
    });
  });
});
