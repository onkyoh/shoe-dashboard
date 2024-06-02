import { test, expect } from '@playwright/test';
import { loginUser, logoutUser, resetE2EState, setupGroupWithTwoUsers, users } from './utils';
import { formatName } from '$lib/utils';

const GROUP_NAME = process.env.TEST_GROUP_NAME!;

test.describe('Group functionality', () => {
	test.afterEach(async () => {
		// Call your reset_e2e_state utility function here
		await resetE2EState();
	});

	test.skip('should create group successfully', async ({ page }) => {
		// Log in as user1
		await loginUser(page, users.user1);

		// Open the sidebar navigation
		await page.click('[aria-label="open sidebar"]');

		// Click on "Groups" in the sidebar
		await page.click('text=Groups');

		// Wait for initial group list loading
		await page.waitForLoadState('networkidle');

		// Check if the "Create a Group" heading exists
		await expect(page.locator('h3', { hasText: 'Create a Group' })).toBeVisible();

		// Type group name into the input field with `name="name"`
		await page.fill('input[name="groupName"]', GROUP_NAME);

		await page.click('button:has-text("Create")');

		// Wait for the page to reload or update after group creation
		await page.waitForLoadState('networkidle');

		// Assert that the "Invite members to <group name>" heading is visible
		await expect(page.locator('h3', { hasText: `Invite members to ${GROUP_NAME}` })).toBeVisible();

		await page.goto('/');
		await page.waitForLoadState('networkidle');
		// Re-open the sidebar (assuming it closed automatically)
		await page.click('[aria-label="open sidebar"]');

		// Ensure the <p> tag is visible
		await expect(page.locator(`p:has-text("${GROUP_NAME}")`)).toBeVisible();
	});

	test.skip('should create group and user 2 should join via shared link', async ({
		page,
		context,
		browser
	}) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		// User 1 actions:
		await loginUser(page, users.user1); // Log in as user1

		await page.click('[aria-label="open sidebar"]');
		await page.click('text=Groups');
		await page.waitForLoadState('networkidle');

		await expect(page.locator('h3:has-text("Create a Group")')).toBeVisible();

		await page.fill('input[name="groupName"]', GROUP_NAME);
		await page.click('button:has-text("Create")');
		await page.waitForLoadState('networkidle');

		await expect(page.locator(`h3:has-text("Invite members to ${GROUP_NAME}")`)).toBeVisible();

		await page.click('[aria-label="copy link"]');
		const shareLink = await page.evaluate(async () => await navigator.clipboard.readText());

		await logoutUser(page);

		// User 2 actions (in a new context and page):
		const context2 = await browser.newContext();
		const page2 = await context2.newPage();

		await loginUser(page2, users.user2); // Log in as user2

		await page2.goto(shareLink); // Use the same page after logging out User 1
		await page2.waitForLoadState('networkidle');

		// Click on the anchor link to navigate to the group dashboard
		await page2.click('a:has-text("group page")'); // Assuming this is how the link appears
		await page2.waitForLoadState('networkidle');

		// Check for the presence of both users with their roles
		const user1NameFormatted = formatName(users.user1.name);
		const user2NameFormatted = formatName(users.user2.name);

		await expect(
			page2.locator(`div:has-text("${user1NameFormatted}") >> p:has-text("owner")`)
		).toBeVisible();
		await expect(
			page2.locator(`div:has-text("${user2NameFormatted}") >> p:has-text("viewer")`)
		).toBeVisible();
	});

	test('should allow users to create and view bulletins', async ({ browser }) => {
		const [page1, page2] = await setupGroupWithTwoUsers(browser);

		await page1.goto('/group');

		await page1.waitForLoadState('networkidle');

		await page1.click('[aria-label="create bulletin"]');

		await page1.waitForTimeout(1000);

		await page1.locator('button[name="priority"]').nth(3).click();
		await page1.locator('button[name="expiryDate"]').nth(4).click();
		await page1.locator('textarea[name="content"]').nth(1).fill('Test bulletin content');
		await page1.locator('button:has-text("Create Bulletin")').nth(1).click();

		await page1.waitForLoadState('networkidle');

		await expect(page1.locator(`p:has-text("Test bulletin content")`).nth(1)).toBeVisible();
		await expect(
			page1.locator(`span:has-text("${formatName(users.user1.name)}`).nth(1)
		).toBeVisible();

		await page2.goto('/group');

		await expect(page2.locator(`p:has-text("Test bulletin content")`).nth(1)).toBeVisible();
		await expect(
			page2.locator(`span:has-text("${formatName(users.user1.name)}`).nth(1)
		).toBeVisible();
	});
});
