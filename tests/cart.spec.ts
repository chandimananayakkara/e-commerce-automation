import { expect, test } from "@playwright/test";

async function login(page: any) {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
}

test("cart shows added products", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);

  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByTestId("shopping-cart-link").click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
});

test("can remove product from cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByTestId("shopping-cart-link").click();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  await page.getByText("Remove").click();
  await expect(page.getByText("Sauce Labs Backpack")).not.toBeVisible();
});

test("cart total item count is correct", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await login(page);
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");
});
