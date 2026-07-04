import { test, expect } from '@playwright/test';

const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
];

  for (const user of users) {
    test(`Login using Multiple user - ${user.username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      
      await page.getByPlaceholder('Username').fill(user.username);
      await page.getByPlaceholder('Password').fill(user.password); 
      await page.locator('input#login-button').click();

    });
  }

