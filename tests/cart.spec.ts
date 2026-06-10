import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";

test.describe("Cart Tests", () => {
  let loginPage: LoginPage;
  let productsPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductPage(page);
    cartPage = new CartPage(page)

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await productsPage.goto();

    await productsPage.addToCart("Sauce Labs Backpack");
    await productsPage.addToCart("Sauce Labs Bike Light");
  });
  test("cart shows added products", async ({ page }) => {
    await cartPage.goto();
  });

  test("can remove product from cart", async ({ page }) => {

   await cartPage.removeFromCart("Sauce Labs Backpack");
  });

  test("cart total item count is correct", async ({ page }) => {

    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");
  });
});
