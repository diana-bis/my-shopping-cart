import { test, expect } from '@playwright/test';

test('Cart persists after logout and login', async ({ page }) =>{
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

    // Add a product to the cart
    await page.locator('button:has-text("Add to Cart")').first().click();

    // Check header displays 1 item
    let headerText = await page.locator('nav').textContent();
    expect(headerText).toContain('1 items in cart');

    // Logout
    await page.click('text=Logout');
    await expect(page).toHaveURL(`/login`);

    // Login again with the same user
    await page.fill('input[placeholder="Your Email"]', email);
    await page.fill('input[placeholder="Your Password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(`/products`);

    // Check again that cart still has 1 item
    headerText = await page.locator('nav').textContent();
    expect(headerText).toContain('1 items in cart');
});