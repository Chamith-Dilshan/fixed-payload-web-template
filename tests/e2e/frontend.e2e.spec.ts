import { test, expect } from '@playwright/test'

test.describe('Frontend layout and theme', () => {
  test('renders the homepage with its expected content', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Payload Website Template/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('keeps shared containers responsive and colors tied to theme tokens', async ({
    page,
  }) => {
    await page.goto('/')

    const container = page.locator('footer .max-width-container').first()
    await expect(container).toBeVisible()

    for (const viewport of [
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport)

      for (const dark of [false, true]) {
        const measurements = await page.evaluate((isDark) => {
          document.documentElement.classList.toggle('dark', isDark)

          const body = getComputedStyle(document.body)
          const footer = document.querySelector('footer')
          const footerStyle = footer ? getComputedStyle(footer) : null
          const tokenProbe = document.createElement('div')
          tokenProbe.style.backgroundColor = 'var(--background)'
          document.body.append(tokenProbe)
          const backgroundToken = getComputedStyle(tokenProbe).backgroundColor
          tokenProbe.style.backgroundColor = 'var(--card)'
          const cardToken = getComputedStyle(tokenProbe).backgroundColor
          tokenProbe.remove()

          return {
            bodyBackground: body.backgroundColor,
            cardBackground: footerStyle?.backgroundColor,
            backgroundToken,
            cardToken,
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
            containerWidth:
              document
                .querySelector('footer .max-width-container')
                ?.getBoundingClientRect().width ?? 0,
          }
        }, dark)

        expect(measurements.bodyBackground).toBe(measurements.backgroundToken)
        expect(measurements.cardBackground).toBe(measurements.cardToken)
        expect(measurements.documentWidth).toBeLessThanOrEqual(
          measurements.viewportWidth
        )
        expect(measurements.containerWidth).toBeLessThanOrEqual(
          measurements.viewportWidth
        )
      }
    }
  })

  test('keeps hero actions, image text, and card titles readable in both themes', async ({
    page,
  }) => {
    await page.goto('/')

    const hero = page.locator('article section.isolate').first()
    const heroAction = hero.locator('[data-slot="button"]').first()
    await expect(heroAction).toBeVisible()

    for (const dark of [false, true]) {
      const heroColors = await page.evaluate((isDark) => {
        document.documentElement.classList.toggle('dark', isDark)

        const title = document.querySelector('article section.isolate h1')
        const overlay = document.querySelector('[class*="hero-overlay"]')
        const action = document.querySelector(
          'article section.isolate [data-slot="button"]'
        )

        return {
          titleColor: title ? getComputedStyle(title).color : null,
          actionColor: action ? getComputedStyle(action).color : null,
          actionBackground: action
            ? getComputedStyle(action).backgroundColor
            : null,
          overlayColor: overlay ? getComputedStyle(overlay).backgroundColor : null,
        }
      }, dark)

      const heroForegroundColors = [
        'rgb(255, 255, 255)',
        'lab(100 0 0)',
        'oklab(1 0 0)',
      ]
      expect(heroForegroundColors).toContain(heroColors.titleColor)
      expect(heroForegroundColors).toContain(heroColors.actionColor)
      expect(heroColors.actionBackground).toBe('rgba(0, 0, 0, 0)')
      expect(heroColors.overlayColor).not.toBe('rgba(0, 0, 0, 0)')

      await page.goto('/posts')
      await page.evaluate((isDark) => {
        document.documentElement.classList.toggle('dark', isDark)
      }, dark)
      const card = page.locator('main section article').first()
      const cardTitle = card.locator('h3 a').first()
      await expect(cardTitle).toBeVisible()

      const cardColors = await card.evaluate((element) => {
        const title = element.querySelector('h3')
        const link = element.querySelector('h3 a')
        return {
          surface: getComputedStyle(element).color,
          title: title ? getComputedStyle(title).color : null,
          link: link ? getComputedStyle(link).color : null,
        }
      })

      expect(cardColors.title).toBe(cardColors.surface)
      expect(cardColors.link).toBe(cardColors.surface)

      await page.goto('/')
    }
  })
})
