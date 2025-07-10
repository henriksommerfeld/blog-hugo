import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.describe('Desktop', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/')
    })
    test.use({
      viewport: { width: 1600, height: 1200 },
    })

    test('Should open about page and go back', async ({ page }) => {
      page.getByRole('link', { name: 'About', exact: true }).click()
      await expect(page).toHaveURL('/about/')
      await page.goBack()
      await expect(page).toHaveURL('/')
    })

    test('Should go to next page', async ({ page }) => {
      page.locator('.paging-controls').getByText('Older').click()
      await expect(page).toHaveURL('/page/2/')
      page.locator('.paging-controls').getByText('Older').click()
      await expect(page).toHaveURL('/page/3/')
    })

    test('Should go to previous page', async ({ page }) => {
      await page.goto('/page/4/')
      await page.locator('.paging-controls').getByText('Newer').click()
      await expect(page).toHaveURL('/page/3/')
    })

    test('Should go to first page', async ({ page }) => {
      await page.goto('/page/3/')
      await page.locator('.paging-controls').getByRole('button', { name: '1', exact: true }).click()
      await expect(page).toHaveURL('/')
    })

    test('Should go to first tag', async ({ page }) => {
      page.locator('.tag-cloud-tags').getByRole('link').first().click()
      await expect(page).toHaveURL(/tags/)
      await expect(page.getByText('Tag:')).toBeVisible()
    })

    test('Should go to category Coding', async ({ page }) => {
      page.locator('.all-categories').getByRole('link', { name: 'coding', exact: true }).click()
      await expect(page).toHaveURL(/categories\/coding/)
      await expect(page.getByText('Category:')).toBeVisible()
    })

    test('Should go to last post in category', async ({ page }) => {
      page.locator('.all-categories').getByRole('link', { name: 'coding', exact: true }).click()
      await expect(page).toHaveURL(/categories\/coding/)
      page.locator('main article').last().getByRole('link').filter({ hasText: 'Read' }).click()
      const link = page.locator('footer .categories-tags').getByRole('link', { name: 'Coding' })
      await expect(link).toHaveAttribute('href', '/categories/coding')
    })

    test('Should go to top of page', async ({ page }) => {
      await page.locator('#page-footer').scrollIntoViewIfNeeded()
      const footer = page.locator('#page-footer')
      const link = footer.getByRole('link', { name: 'To top', exact: true })
      await link.click()
      const siteTitle = page.locator('.site-title')
      await expect(siteTitle).toBeInViewport()
    })

    test('Should go to start page', async ({ page }) => {
      await page.getByRole('navigation').getByText('Home').click()
      await expect(page).toHaveURL('/')
    })

    test('404', async ({ page }) => {
      const isLocal = !process.env.CI
      const invalidUrl = isLocal ? '/404.html' : '/iuneriuhweruh'
      await page.goto(invalidUrl)
      const title = page.getByRole('heading', { name: 'Page Not Found (404)' })
      await expect(title).toBeVisible()
      await expect(page.getByAltText('oops')).toBeVisible()
    })
  })

  test.describe('Mobile', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/')
    })
    test.use({
      viewport: { width: 400, height: 800 },
    })

    test('Should open hamburger menu', async ({ page }) => {
      const nav = page.getByRole('navigation')
      await expect(nav).not.toBeVisible()
      page.getByRole('button', { name: 'Menu' }).click()
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    })

    test('Should open about page', async ({ page }) => {
      page.getByRole('button', { name: 'Menu' }).click()
      const nav = page.getByRole('navigation')
      await nav.getByRole('link', { name: 'About' }).click()
      await expect(page).toHaveURL('/about/')
    })
  })
})
