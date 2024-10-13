import { expect } from '@playwright/test';
import { test } from './coverage_wrapper';

test('fi-change-lang', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://fi.muni.cz/index.html.cs');
    await page.getByRole('link', { name: 'English' }).click();

    await expect(page.getByRole('link', { name: 'Česky' })).toBeVisible({ timeout: 60000 });
});

test('fi-scroll-carousel', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://fi.muni.cz/index.html.cs');

    // test sanity
    await expect(
        page.locator('#slick-slide00').getByRole('heading', { name: 'Erasmus Days 2024 na FI' })
    ).toBeInViewport();

    await page.getByRole('link', { name: 'Následující ' }).hover();
    await page.getByRole('link', { name: 'Následující ' }).click({ delay: 1000 });

    await expect(
        page.locator('#slick-slide00').getByRole('heading', { name: 'Erasmus Days 2024 na FI' })
    ).not.toBeInViewport({ timeout: 60000 });
});

test('fi-search-keyboard', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://fi.muni.cz/index.html.cs');

    await page.getByPlaceholder('Hledat...').focus();
    await page.getByPlaceholder('Hledat...').fill('programy');
    await page.getByPlaceholder('Hledat...').press('Enter');

    await expect(page.locator('h1', { hasText: 'Vyhledávání' })).toBeInViewport({ timeout: 60000 });
});

test('fi-heading-hover', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://fi.muni.cz/index.html.cs');

    await page
        .getByRole('heading', { name: /Aktuality.*/ })
        .getByRole('link')
        .hover({ position: { x: 10, y: 10 } });
    await page
        .getByRole('heading', { name: /Aktuality.*/ })
        .getByRole('link')
        .click({ position: { x: 10, y: 10 } });

    // console.log(await page.getByRole('heading', { name: /Aktuality.*/ }).boundingBox());

    expect(page.url()).toContain('news');
});
