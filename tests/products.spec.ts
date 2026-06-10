import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductsPage.js";

test.describe("Product Testing", () => {
  let loginPage: LoginPage;
  let productsPage: ProductPage;


  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await productsPage.goto();
  });


  test("products page loads sucessfully", async ({ page }) => {
    await productsPage.isDisplayProduct("Sauce Labs Backpack");
    await productsPage.isDisplayProduct("Sauce Labs Bike Light");
  });

  test("can view product details", async ({ page }) => {

    await productsPage.viewSingleItemDetails("Sauce Labs Backpack");
  });

  test("can filter product by category", async ({ page }) => {

    await productsPage.filterProduct("lohi");
  });

  test("can add products to cart", async ({ page }) => {

    await productsPage.addToCart("Sauce Labs Backpack");
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");


    await productsPage.addToCart("Sauce Labs Bike Light");
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");
  });
});
