import { test, expect } from '@playwright/test';
import { users } from './utils';

test.describe('Auth functionality', () => {
	test.skip('should log in successfully', async ({ page }) => {
		await page.goto(process.env.VITE_BASE_URL!);

		await page.waitForLoadState('networkidle');

		await page.click('[aria-label="open sidebar"]');

		await page.click('text=Login');

		await page.waitForLoadState('networkidle');

		await page.fill('input[name="email"]', users.user1.email!);
		await page.fill('input[name="password"]', users.user1.password!);

		await page.click('button:has-text("Log In")');

		await page.waitForURL((url) => url.pathname === '/');

		await page.waitForLoadState('networkidle');

		await page.waitForSelector('[aria-label="open sidebar"]');
		await page.click('[aria-label="open sidebar"]');

		await expect(page.locator(`text=${users.user1.name}`)).toBeVisible();
	});

	test.skip('should log out successfully', async ({ page }) => {
		await page.goto(process.env.VITE_BASE_URL! + '/auth/login');
		await page.waitForLoadState('networkidle');

		await page.fill('input[name="email"]', users.user1.email!);
		await page.fill('input[name="password"]', users.user1.password!);

		await page.click('text=Log In');

		await page.waitForURL((url) => url.pathname === '/');
		await page.waitForLoadState('networkidle');

		await page.click('[aria-label="open sidebar"]');
		await page.click('text=Profile');

		await page.waitForURL((url) => url.pathname === '/profile');
		await page.waitForLoadState('networkidle');

		await page.click('text=Sign Out');

		await page.waitForURL((url) => url.pathname === '/');

		await page.click('[aria-label="open sidebar"]');

		await expect(page.locator(`text=${users.user1.name}`)).not.toBeVisible();
		await expect(page.locator('text=Login')).toBeVisible();
	});
});
