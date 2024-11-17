import { test, expect } from '@playwright/test'

test.describe('Post', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/firmware-update-notifications-for-my-asus-router/')
  })
  test.use({
    viewport: { width: 1600, height: 1200 },
  })
  const expectedPostTitle = 'Firmware Update Notifications for My Asus Router'

  test('Post should have expected title', async ({ page }) => {
    await expect(page.locator('article h1')).toHaveText(expectedPostTitle)
  })

  test('Should have post title in window title', async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(expectedPostTitle))
  })

  test('Should have publishing date', async ({ page }) => {
    const time = page.locator('article time.published')
    await expect(time).toHaveText('31 July 2018')
    await expect(time).toHaveAttribute('datetime', /^2018-07-31/)
  })

  test('Should open image lightbox on click and close it again', async ({ page }) => {
    await page.getByAltText('Asus router web interface for uploading and applying a firmware update').click()
    await expect(page.locator('#lightbox')).toHaveClass('open')
    const img = page.locator('#lightbox img')
    await img.click()
    await expect(img).not.toHaveClass('open')
  })

  test('Should open expanded code view', async ({ page }) => {
    await page.getByText('#!/bin/sh').scrollIntoViewIfNeeded()
    await page.getByTitle('Expand').click()
    const code = page.locator('#code-container').getByText('"w1yy39m3ysguhyfyrpk54peve8ioc8 <- just fake"')
    await expect(code).toBeVisible()
  })

  test('Should show tag Networking', async ({ page }) => {
    const tag = page.locator('article footer').getByText('Networking')
    await expect(tag).toBeVisible()
    await expect(tag).toHaveAttribute('href', '/tags/networking')
  })

  test('Should show category Tools', async ({ page }) => {
    const tag = page.locator('article footer').getByText('Tools')
    await expect(tag).toBeVisible()
    await expect(tag).toHaveAttribute('href', '/categories/tools')
  })

  test('Should have comments button', async ({ page }) => {
    await expect(page.getByText('Show Comments')).toBeVisible()
  })

  test('Should load comments on button click', async ({ page }) => {
    await expect(page.locator('#disqus_thread')).not.toBeVisible()
    await page.getByText('Show Comments').click()
    await expect(page.locator('#disqus_thread')).toBeVisible()
  })
})
