import { test, expect } from '@playwright/test'
import { BaseURL } from '../playwright.config'

const darkColor = 'rgb(45, 55, 72)'
const lightColor = 'rgb(250, 250, 250)'

test.describe('Theme', () => {
  test.describe('No preference saved', () => {
    test('Should be light by default', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'no-preference' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', lightColor)
      await expect(page.getByLabel('Switch theme')).toBeChecked()
    })
    test('Should be dark when dark is preferred', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', darkColor)
      await expect(page.getByLabel('Switch theme')).not.toBeChecked()
    })
    test('Should be light when light is preferred', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', lightColor)
      await expect(page.getByLabel('Switch theme')).toBeChecked()
    })
    test('Should turn light', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await page.getByLabel('Switch theme').click()
      await expect(page.locator('body')).toHaveCSS('background-color', lightColor)
      await expect(page.getByLabel('Switch theme')).toBeChecked()
    })
    test('Should turn dark', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await page.getByLabel('Switch theme').click()
      await expect(page.locator('body')).toHaveCSS('background-color', darkColor)
      await expect(page.getByLabel('Switch theme')).not.toBeChecked()
    })
  })
  test.describe('Light reference saved', () => {
    test.use({
      storageState: {
        cookies: [],
        origins: [{ origin: BaseURL, localStorage: [{ name: 'theme', value: 'light' }] }],
      },
    })

    test('Should be light when preference is dark', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', lightColor)
      await expect(page.getByLabel('Switch theme')).toBeChecked()
    })
    test('Should be light when preference is light', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', lightColor)
      await expect(page.getByLabel('Switch theme')).toBeChecked()
    })
    test('Should be light when preference is none', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'no-preference' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', lightColor)
      await expect(page.getByLabel('Switch theme')).toBeChecked()
    })
    test('Should turn dark', async ({ page }) => {
      await page.goto('/')
      await page.getByLabel('Switch theme').click()
      await expect(page.locator('body')).toHaveCSS('background-color', darkColor)
      await expect(page.getByLabel('Switch theme')).not.toBeChecked()
    })
  })
  test.describe('Dark reference saved', () => {
    test.use({
      storageState: {
        cookies: [],
        origins: [{ origin: BaseURL, localStorage: [{ name: 'theme', value: 'dark' }] }],
      },
    })

    test('Should be dark when preference is light', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', darkColor)
      await expect(page.getByLabel('Switch theme')).not.toBeChecked()
    })
    test('Should be dark when preference is dark', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', darkColor)
      await expect(page.getByLabel('Switch theme')).not.toBeChecked()
    })
    test('Should be dark when preference is none', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'no-preference' })
      await page.goto('/')
      await expect(page.locator('body')).toHaveCSS('background-color', darkColor)
      await expect(page.getByLabel('Switch theme')).not.toBeChecked()
    })
    test('Should turn light', async ({ page }) => {
      await page.goto('/')
      await page.getByLabel('Switch theme').click()
      await expect(page.locator('body')).toHaveCSS('background-color', lightColor)
      await expect(page.getByLabel('Switch theme')).toBeChecked()
    })
  })
})
