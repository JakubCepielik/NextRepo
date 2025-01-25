const { test, expect } = require('@playwright/test');

test('navigation for non-logged-in user', async ({ page }) => {

  await page.goto('http://localhost:3000/user/profile');
  await expect(page).toHaveURL('http://localhost:3000/user/login');
});