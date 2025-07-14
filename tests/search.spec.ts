import { test, expect, Page } from '@playwright/test'

test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  test.use({
    viewport: { width: 1600, height: 1200 },
  })

  test('Should open searchbox', async ({ page }) => {
    page.locator('nav').getByRole('link', { name: 'Search' }).click()
    await expect(page.locator('#search-input')).toBeVisible()
  })

  const searchForAsusFirmware = async (page: Page) => {
    const responsePromise = page.waitForResponse('/search-index.json')
    page.locator('nav').getByRole('link', { name: 'Search' }).click()
    await responsePromise
    return await page.locator('#search-input').fill('asus firmware')
  }

  const expectedPostTitle = 'Firmware Update Notifications for My Asus Router'
  test(`Should find post with title '${expectedPostTitle}' search for "asus firmware"`, async ({ page }) => {
    await searchForAsusFirmware(page)
    await expect(page.locator('#search-output .result-list').getByText(expectedPostTitle)).toBeVisible()
  })

  // test('Should set focus on first hit on enter', async ({ page }) => {
  //   await searchForAsusFirmware(page)
  //   await page.locator('#search-input').press('Enter')
  //   const firstResult = page.locator('#search-output .result-list li').first().getByRole('link')
  //   await expect(firstResult).toBeFocused()
  // })

  test('Should set focus on first hit on down-arrow', async ({ page }) => {
    await searchForAsusFirmware(page)
    const firstResult = page.locator('#search-output .result-list li').first().getByRole('link')
    await expect(firstResult).toBeVisible()
    await page.locator('#search-input').press('ArrowDown')
    await expect(firstResult).toBeFocused()
  })

  test('Should navigate to post when clicked', async ({ page }) => {
    await searchForAsusFirmware(page)
    const resultList = page.locator('#search-output .result-list')
    await resultList.getByRole('link', { name: expectedPostTitle }).click()
    await expect(page).toHaveURL('/firmware-update-notifications-for-my-asus-router/')
  })

  test('Should close on ESC key', async ({ page }) => {
    await searchForAsusFirmware(page)
    await page.locator('#search-input').press('Escape')
    await expect(page.locator('#search-input')).not.toBeVisible()
  })

  test('Should close on click outside', async ({ page }) => {
    await searchForAsusFirmware(page)
    await page.getByLabel('Close search modal').click()
    await expect(page.locator('#search-input')).not.toBeVisible()
  })

  test.describe('With hamburger visible', () => {
    test.use({
      viewport: { width: 1000, height: 2000 },
    })
    test('Should close on searchbox close click', async ({ page }) => {
      await page.getByRole('button', { name: 'Menu' }).click()
      await page.locator('nav').getByRole('link', { name: 'Search', exact: true }).click()
      await page.getByRole('button', { name: 'Close search' }).click()
      await expect(page.locator('#search-input')).not.toBeVisible()
    })
  })
})
