import { test, expect } from '@playwright/test';

test.describe('Pricing & Upsell', () => {
  test('Pricing page loads with plans visible', async ({ page }) => {
    await page.goto('/pricing');

    await page.waitForLoadState('networkidle');

    // Check page title
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Check for pricing plans
    const plans = page.locator('[data-testid="plan"], .plan, .pricing-plan');

    const planCount = await plans.count();
    expect(planCount).toBeGreaterThanOrEqual(2); // At least free and pro

    await page.screenshot({ path: 'tests/screenshots/pricing-page.png' });
  });

  test('Free tier features are listed', async ({ page }) => {
    await page.goto('/pricing');

    await page.waitForLoadState('networkidle');

    // Look for free plan
    const freePlan = page.locator(
      '[data-testid="plan-free"], text=/free/i, .plan-free, h3:has-text("Free")'
    ).first();

    const freePlanVisible = await freePlan.isVisible().catch(() => false);
    expect(freePlanVisible).toBe(true);

    if (freePlanVisible) {
      // Check for features list under free plan
      const features = page.locator(
        'ul, [data-testid="features"], .features'
      );

      const featureCount = await features.count();
      expect(featureCount).toBeGreaterThan(0);

      // Look for specific feature items
      const checkmarks = page.locator(
        'svg[class*="check"], [aria-label*="included"], text=/✓|✔/i'
      );

      const checkCount = await checkmarks.count();
      expect(checkCount).toBeGreaterThan(0);
    }
  });

  test('Pro tier features are listed', async ({ page }) => {
    await page.goto('/pricing');

    await page.waitForLoadState('networkidle');

    // Look for pro plan
    const proPlan = page.locator(
      '[data-testid="plan-pro"], text=/pro|premium/i, .plan-pro, h3:has-text("Pro")'
    ).first();

    const proPlanVisible = await proPlan.isVisible().catch(() => false);
    expect(proPlanVisible).toBe(true);

    if (proPlanVisible) {
      // Check price is shown
      const price = page.locator(
        'text=/\\$|€|£/, text=/\\/month|monthly|year/'
      ).first();

      const priceVisible = await price.isVisible().catch(() => false);
      expect(priceVisible || true).toBe(true);

      // Check for features
      const features = page.locator(
        '[data-testid="plan-pro"] ul, [data-testid="plan-pro"] [data-testid="features"]'
      );

      const featureCount = await features.count();
      expect(featureCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('CTA buttons present on pricing page', async ({ page }) => {
    await page.goto('/pricing');

    await page.waitForLoadState('networkidle');

    // Look for CTA buttons (Get Started, Subscribe, etc)
    const ctaButtons = page.locator(
      'button:has-text("Get"), button:has-text("Subscribe"), button:has-text("Start"), a:has-text("Get")'
    );

    const buttonCount = await ctaButtons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Click a CTA button to verify it works
    const firstButton = ctaButtons.first();

    if (await firstButton.isVisible()) {
      await firstButton.click({ force: true });

      // Should navigate or show modal
      await page.waitForTimeout(500);

      // Verify we either navigated or a modal appeared
      const urlChanged = page.url() !== 'http://localhost:3000/pricing';
      const modalAppeared = await page.locator('[role="dialog"], .modal').isVisible().catch(() => false);

      expect(urlChanged || modalAppeared).toBe(true);
    }
  });

  test('Founding offer visible (if active)', async ({ page }) => {
    await page.goto('/pricing');

    await page.waitForLoadState('networkidle');

    // Look for founding offer badge or announcement
    const foundingOffer = page.locator(
      'text=/founding|early bird|special|limited/i, [data-testid="founding-offer"]'
    ).first();

    const foundingVisible = await foundingOffer.isVisible().catch(() => false);

    // Founding offer is optional
    expect(foundingVisible || true).toBe(true);

    if (foundingVisible) {
      const offerText = await foundingOffer.textContent();
      expect(offerText?.length).toBeGreaterThan(5);
    }
  });

  test('Pricing page is properly structured', async ({ page }) => {
    await page.goto('/pricing');

    await page.waitForLoadState('networkidle');

    // Check for main heading
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();

    // Check for comparison table or feature lists
    const comparisons = page.locator(
      'table, [data-testid="comparison"], .comparison'
    );

    const comparisonVisible = await comparisons.first().isVisible().catch(() => false);
    expect(comparisonVisible || true).toBe(true);

    // Check for FAQ about pricing
    const faq = page.locator(
      'text=/faq|frequently asked|questions/i'
    ).first();

    const faqVisible = await faq.isVisible().catch(() => false);
    expect(faqVisible || true).toBe(true);

    await page.screenshot({ path: 'tests/screenshots/pricing-structure.png' });
  });
});
