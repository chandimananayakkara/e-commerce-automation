import { expect, test } from "@playwright/test";

async function login(page: any) {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
}

test("products page loads sucessfully", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await login(page);

  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await expect(page.getByText("Sauce Labs Fleece Jacket")).toBeVisible();
});

test("can view product details", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await login(page);

  await page.getByText("Sauce Labs Backpack").click();
  await expect(page).toHaveURL(/.*inventory-item\.html\?id=\d+/);
  expect(page.getByText("Back to products")).toBeVisible();
  expect(page.getByText("$")).toBeVisible();
});

test("can filter product by Name(A to Z", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await login(page);

  await page
    .getByTestId("product-sort-container")
    .selectOption({ label: "Price (low to high)" });
  await expect(page.getByText("Sauce Labs Onesie")).toBeVisible();
  await expect(page.getByText("Sauce Labs Fleece Jacket")).toBeVisible();
});

test("can add products to cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await login(page);

  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
  await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();

  await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");
});
