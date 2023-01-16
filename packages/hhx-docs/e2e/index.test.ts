import { expect, test } from '@playwright/test'

test('Verify that the page renderss properly', async ({ page }) => {
  // 进入页面
  await page.goto('http://localhost:5173')

  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText
    return pageContent.includes('布局')
  })

  expect(res).toBe(true)
})
