import { expect } from '@playwright/test';
import { test } from './coverage_wrapper';

test('find-watman', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByAltText('This is watman')).toBeInViewport();
});

test('click-menu-a', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Site A' }).click();

    const child = page.getByRole('link', { name: 'Site A' });
    const parent = page.getByRole('listitem').filter({ has: child });
    await expect(parent).toHaveClass(/.*uk-active.*/, { timeout: 10000 });
});

test('click-div-a', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Factorial value 5! is').click();

    const child = page.getByRole('link', { name: 'Site A' });
    const parent = page.getByRole('listitem').filter({ has: child });
    await expect(parent).toHaveClass(/.*uk-active.*/, { timeout: 10000 });
});
