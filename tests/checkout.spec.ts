import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

test.describe("Checkout Test", () => {
  let loginPage: LoginPage;
  let productsPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let error: any = ''

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await productsPage.goto();

    await productsPage.addToCart("Sauce Labs Backpack");
    await productsPage.addToCart("Sauce Labs Bike Light");
    await cartPage.goto();
    
  });
  test("can complete checkout process", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.fillDetails("Chandima", "Nanayakkara", "80230");

    await checkoutPage.continueToPayment();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html",
    );

    await checkoutPage.confirmOrder();

    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html",
    );

    await checkoutPage.completeOrder();
  });

  test("checkout fails only enter first name", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.fillDetails("Chandima", "", "");

    await checkoutPage.continueToPayment();

    error = await checkoutPage.checkError()
    await expect(error).toContain("Last Name is required");
  });

  test("checkout fails only enter last name", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.fillDetails("", "Nanayakkara", "");

    await checkoutPage.continueToPayment();

    error = await checkoutPage.checkError()
    await expect(error).toContain("First Name is required");
  });

  test("checkout fails only enter zip/postal code", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.fillDetails("", "", "80230");

    await checkoutPage.continueToPayment();

    error = await checkoutPage.checkError()
    await expect(error).toContain("First Name is required");
  });

  test("checkout fails without enter zip/postal code", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.fillDetails("Chandima", "Nanayakkara", "");

    await checkoutPage.continueToPayment();

    error = await checkoutPage.checkError()
    await expect(error).toContain(
      "Postal Code is required",
    );
  });

  test("checkout fails without enter first name", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.fillDetails("", "Nanayakkara", "80230");

    await checkoutPage.continueToPayment();

    error = await checkoutPage.checkError()
    await expect(error).toContain("First Name is required");
  });

  test("checkout fails without enter last name", async ({ page }) => {
    await checkoutPage.goto();

    await checkoutPage.fillDetails("Chandima", "", "80230");

    await checkoutPage.continueToPayment();

    error = await checkoutPage.checkError()
    await expect(error).toContain("Last Name is required");
  });
});
