import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductsPage.js";

test("cart shows added products", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();

  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await productsPage.goToCart();
});

test("can remove product from cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();

  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await page.getByTestId("remove-sauce-labs-backpack").click();
  await expect(
    page.getByTestId("remove-sauce-labs-backpack"),
  ).not.toBeVisible();
});

test("cart total item count is correct", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();

  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");
});
