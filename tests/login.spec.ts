import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("successful login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto()

  await expect(page).toHaveTitle("Swag Labs");

  await loginPage.login('standard_user','secret_sauce')

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  const isLoggedIn = await loginPage.isLoggedIn()
  expect(isLoggedIn).toBe(true)

  await expect(page.getByText("Products")).toBeVisible();
});

test("login fails with invalid password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto()

  await expect(page).toHaveTitle("Swag Labs");

  await loginPage.login('standard_user','wrong_password')

  const errorMessage = await loginPage.getErrorMessage()
  expect (errorMessage).toContain('Username and password do not match')
});

test("login fails with empty username", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto()

  await expect(page).toHaveTitle("Swag Labs");

  await loginPage.login('','wrong_password')

  const errorMessage = await loginPage.getErrorMessage()
  expect(errorMessage).toContain("Username is required");
});

test("login fails with empty password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto()

  await expect(page).toHaveTitle("Swag Labs");

  await loginPage.login('standard_user','')

  const errorMessage = await loginPage.getErrorMessage()
  expect(errorMessage).toContain("Password is required");
});

test("login fails with empty username and password", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto()

  await expect(page).toHaveTitle("Swag Labs");

  await loginPage.login('','')

  const errorMessage = await loginPage.getErrorMessage()
  expect(errorMessage).toContain("Username is required");
});
