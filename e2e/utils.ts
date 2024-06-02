import type { Browser, BrowserContext, Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

interface TestUser {
	email: string;
	password: string;
	name: string;
}

const supabase = createClient(
	process.env.VITE_PUBLIC_SUPABASE_URL!,
	process.env.VITE_PUBLIC_SUPABASE_KEY!
);

export const users: { [key: string]: TestUser } = {
	user1: {
		email: process.env.USER1_EMAIL!,
		password: process.env.USER1_PASSWORD!,
		name: process.env.USER1_NAME!
	},
	user2: {
		email: process.env.USER2_EMAIL!,
		password: process.env.USER2_PASSWORD!,
		name: process.env.USER2_NAME!
	}
};

export async function loginUser(page: Page, user: TestUser) {
	await page.goto('/auth/login');
	await page.waitForLoadState('networkidle');

	await page.fill('input[name="email"]', user.email);
	await page.fill('input[name="password"]', user.password);

	await page.click('text=Log In');

	await page.waitForURL((url) => url.pathname === '/');
	await page.waitForLoadState('networkidle');
}

export async function logoutUser(page: Page) {
	await page.goto('/profile');
	await page.waitForLoadState('networkidle');

	await page.click('text=Sign Out');

	await page.waitForURL((url) => url.pathname === '/');
	await page.waitForLoadState('networkidle');
}
export async function setupGroupWithTwoUsers(browser: Browser) {
	const context1 = await browser.newContext();
	const page1 = await context1.newPage();
	await context1.grantPermissions(['clipboard-read', 'clipboard-write']);
	await loginUser(page1, users.user1); // Log in user1
	await page1.goto('/group'); // Directly navigate to groups page
	await page1.fill('input[name="groupName"]', process.env.TEST_GROUP_NAME!);
	await page1.click('button:has-text("Create")');

	await page1.waitForLoadState('networkidle');
	await page1.click('[aria-label="copy link"]');

	const shareLink = await page1.evaluate(async () => await navigator.clipboard.readText());

	// User 2 setup (while user1 is logged out)
	const context2 = await browser.newContext();
	const page2 = await context2.newPage();
	await loginUser(page2, users.user2); // Log in user2

	await page2.goto(shareLink);

	// Optional: return contexts for further testing
	return [page1, page2];
}

export async function deleteUserFromGroup(page: Page) {
	// Implementation here
}

export async function resetE2EState() {
	// Implementation here
	await supabase.rpc('reset_e2e_test_state');
}
