const { test, expect } = require('@playwright/test');

test('login and navigate to profile', async ({ page }) => {

  await page.goto('http://localhost:3000/user/login');


  await page.getByLabel('Email').fill('jasiustasiu7@gmail.com');
  await page.getByLabel('Password').fill('123123');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/user/profile');
});