import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductsPage.js";

test("products page loads sucessfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await expect(page.getByText("Sauce Labs Fleece Jacket")).toBeVisible();
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
});

test("can view product details", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();

  await page.getByText("Sauce Labs Backpack").click();
  await expect(page).toHaveURL(/.*inventory-item\.html\?id=\d+/);
  await expect(page.getByText("Back to products")).toBeVisible();
  await expect(page.getByText("$")).toBeVisible();
});

test("can filter product by category", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();

  await productsPage.filterProduct("lohi");
  await expect(page.getByText("Sauce Labs Onesie")).toBeVisible();
  await expect(page.getByText("Sauce Labs Fleece Jacket")).toBeVisible();
});

test("can add products to cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();

  productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
  await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();

  productsPage.addToCart("add-to-cart-sauce-labs-bike-light");
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");
});
