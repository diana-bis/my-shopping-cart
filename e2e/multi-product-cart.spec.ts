import { test, expect } from '@playwright/test';

test('Add multiple products and check quantities and total items', async ({ page }) => {
    const email = `test${Date.now()}@test.com`;
    const password = 'Pass123';

    // Navigate to login
    await page.goto(`/`);

    // Navigate to register
    await page.click('text=Create an account');
    await expect(page).toHaveURL(`/register`);
    await page.fill('input[placeholder="Your Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    await page.fill('input[placeholder="Confirm Password"]', password);
    await page.click('button[type="submit"]');

    // Login
    await page.fill('input[placeholder="Your Email"]', email);
    await page.fill('input[placeholder="Your Password"]', password);
    await page.click('button[type="submit"]');

    // Add first product twice
    await page.locator('button:has-text("Add to Cart")').nth(0).click(); // Tshirt
    await page.locator('button:has-text("Add to Cart")').nth(0).click(); // Tshirt again

    // Add second product once
    await page.locator('button:has-text("Add to Cart")').nth(1).click(); // Blouse

    // Check header says 3 total items
    const headerText = await page.locator('nav').textContent();
    expect(headerText).toContain('3 items in cart');

    // Go to cart
    await page.click('text=Cart');
    await expect(page).toHaveURL(`/cart`);

    // Assert 2 different items
    const quantityElements = page.locator('p:has-text("Quantity:")');
    await expect(quantityElements).toHaveCount(2);

    // Check quantities
    const tshirtItem = page.locator('div:has(h3:has-text("Tshirt"))');
    const blouseItem = page.locator('div:has(h3:has-text("Blouse"))');

    await expect(tshirtItem.locator('p:has-text("Quantity:")')).toHaveText(/Quantity:\s*2/);
    await expect(blouseItem.locator('p:has-text("Quantity:")')).toHaveText(/Quantity:\s*1/);
});
