import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";

test("can complete checkout process", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await cartPage.goto();

  await cartPage.goToCheckout();

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
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await cartPage.goto();

  await cartPage.goToCheckout();

  await checkoutPage.fillDetails("Chandima", "", "");

  await checkoutPage.continueToPayment();

  await expect(page.getByText("Last Name is required")).toBeVisible();
});

test("checkout fails only enter last name", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await cartPage.goto();

  await cartPage.goToCheckout();

  await checkoutPage.fillDetails("", "Nanayakkara", "");

  await checkoutPage.continueToPayment();

  await expect(page.getByText("First Name is required")).toBeVisible();
});

test("checkout fails only enter zip/postal code", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await cartPage.goto();

  await cartPage.goToCheckout();

  await checkoutPage.fillDetails("", "", "80230");

  await checkoutPage.continueToPayment();

  await expect(page.getByText("First Name is required")).toBeVisible();
});

test("checkout fails without enter zip/postal code", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await cartPage.goto();

  await cartPage.goToCheckout();

  await checkoutPage.fillDetails("Chandima", "Nanayakkara", "");

  await checkoutPage.continueToPayment();

  await expect(page.getByText("Postal Code is required")).toBeVisible();
});

test("checkout fails without enter first name", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await cartPage.goto();

  await cartPage.goToCheckout();

  await checkoutPage.fillDetails("", "Nanayakkara", "80230");

  await checkoutPage.continueToPayment();

  await expect(page.getByText("First Name is required")).toBeVisible();
});

test("checkout fails without enter last name", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.goto();
  await productsPage.addToCart("add-to-cart-sauce-labs-backpack");
  await productsPage.addToCart("add-to-cart-sauce-labs-bike-light");

  await cartPage.goto();

  await cartPage.goToCheckout();

  await checkoutPage.fillDetails("Chandima", "", "80230");

  await checkoutPage.continueToPayment();

  await expect(page.getByText("Last Name is required")).toBeVisible();
});
