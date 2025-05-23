import { test, expect } from '@playwright/test';

test('Registration, Login, Add to Cart, and View Cart', async ({ page }) => {
    const email = `test${Date.now()}@test.com`;
    const password = 'Pass123';

    // Navigate to login
    await page.goto('/');
    await expect(page).toHaveURL(`/login`);

    // Click link to go to register page
    await page.click('text=Create an account');
    await expect(page).toHaveURL(`/register`);

    // Fill registration form
    await page.fill('input[placeholder="Your Email"]', email);
    await page.fill('input[placeholder="Password"]', password);
    await page.fill('input[placeholder="Confirm Password"]', password);
    await page.click('button[type="submit"]');

    // After registration, redirected back to login
    await expect(page).toHaveURL(`/login`);

    // Login
    await page.fill('input[placeholder="Your Email"]', email);
    await page.fill('input[placeholder="Your Password"]', password);
    await page.click('button[type="submit"]');

    // Products page
    await expect(page).toHaveURL(`/products`);

    // Add product to cart
    await page.locator('button:has-text("Add to Cart")').first().click();

    // Go to cart
    await page.click('text=Cart');
    await expect(page).toHaveURL(`/cart`);

    // Check if item exists in cart
    const quantityElements = page.locator('p:has-text("Quantity:")');
    await expect(quantityElements).toHaveCount(1);

    // Logout
    await page.click('text=Logout'); 
    await expect(page).toHaveURL(`/login`);

});


