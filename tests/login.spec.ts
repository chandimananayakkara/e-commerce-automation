import { test, expect } from "@playwright/test";

test("successful login with valid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  await page.getByPlaceholder("Username").fill("standard_user");

  await page.getByPlaceholder("Password").fill("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  await expect(page.getByText("Products")).toBeVisible();
});

test("login fails with invalid password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  await page.getByPlaceholder("Username").fill("standard_user");

  await page.getByPlaceholder("Password").fill("wrong_password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByText("Username and password do not match"),
  ).toBeVisible();
});

test("login fails with empty username", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  await page.getByPlaceholder("Password").fill("secret_sauce");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Username is required")).toBeVisible();
});

test("login fails with empty password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  await page.getByPlaceholder("Username").fill("standard_user");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Password is required")).toBeVisible();
});

test("login fails with empty username and password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveTitle("Swag Labs");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Username is required")).toBeVisible();
});
