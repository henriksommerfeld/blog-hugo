import { test, expect } from '@playwright/test'

test.describe('Animated gif', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/find-github-repositories-locally/')
  })
  test.use({
    viewport: { width: 1600, height: 1200 },
  })

  test('Should have the animated gif visible', async ({ page }) => {
    await expect(page.getByAltText('Search repos locally')).toBeVisible()
  })
})
