import { expect, test } from "@playwright/test";

async function login(page: any) {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
}

test("can complete checkout process", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await page.getByRole("button", { name: "Add to cart" }).last().click();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  await page.getByPlaceholder("First Name").fill("Chandima");
  await page.getByPlaceholder("Last Name").fill("Nanayakkara");
  await page.getByPlaceholder("Zip/Postal Code").fill("80230");

  await page.getByTestId("continue").click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html",
  );

  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await expect(
    page.getByText("Test.allTheThings() T-Shirt (Red)"),
  ).toBeVisible();
  await expect(page.getByText("Price Total")).toBeVisible();
  await page.getByRole("button", { name: "Finish" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html",
  );

  await expect(page.getByText("Checkout: Complete!")).toBeVisible();
  await expect(page.getByText("Thank you for your order!")).toBeVisible();
});

test("checkout fails only enter first name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await page.getByRole("button", { name: "Add to cart" }).last().click();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  await page.getByPlaceholder("First Name").fill("Chandima");

  await page.getByTestId("continue").click();

  await expect(page.getByText('Last Name is required')).toBeVisible()
});

test("checkout fails only enter last name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await page.getByRole("button", { name: "Add to cart" }).last().click();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  await page.getByPlaceholder("Last Name").fill("Nanayakkara");

  await page.getByTestId("continue").click();

  await expect(page.getByText('Error: First Name is required')).toBeVisible()
});

test("checkout fails only enter zip/postal code", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await page.getByRole("button", { name: "Add to cart" }).last().click();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  await page.getByPlaceholder("Zip/Postal Code").fill("80230");

  await page.getByTestId("continue").click();

  await expect(page.getByText('First Name is required')).toBeVisible()
});

test("checkout fails without enter zip/postal code", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await page.getByRole("button", { name: "Add to cart" }).last().click();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  await page.getByPlaceholder("First Name").fill("Chandima");
  await page.getByPlaceholder("Last Name").fill("Nanayakkara");

  await page.getByTestId("continue").click();

  await expect(page.getByText('Postal Code is required')).toBeVisible()
});

test("checkout fails without enter first name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await page.getByRole("button", { name: "Add to cart" }).last().click();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  await page.getByPlaceholder("Last Name").fill("Nanayakkara");
  await page.getByPlaceholder("Zip/Postal Code").fill("80230");

  await page.getByTestId("continue").click();

  await expect(page.getByText('First Name is required')).toBeVisible()
});

test("checkout fails without enter last name", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  await page.getByRole("button", { name: "Add to cart" }).last().click();

  await page.getByTestId("shopping-cart-link").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  await page.getByRole("button", { name: "Checkout" }).click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );

  await page.getByPlaceholder("First Name").fill("Chandima");
  await page.getByPlaceholder("Zip/Postal Code").fill("80230");

  await page.getByTestId("continue").click();

  await expect(page.getByText('Last Name is required')).toBeVisible()
});



