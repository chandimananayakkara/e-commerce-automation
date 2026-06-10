import { expect, type Page } from "@playwright/test";

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async isDisplayProducts(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async viewSingleItemDetails(productName: string) {
    await this.page.getByText(productName).click();
    await expect(this.page.getByText("Back to products")).toBeVisible();
    await expect(this.page.getByText("$")).toBeVisible();
  }

  async addToCart(productName: string) {
    await this.page.getByTestId(productName).click();
  }

  async goToCart() {
    await this.page.getByTestId("shopping-cart-link").click();
  }

  async filterProduct(category: string) {
    await this.page
      .getByTestId("product-sort-container")
      .selectOption({ value: category });
    await expect(this.page.getByText("Sauce Labs Onesie")).toBeVisible();
    await expect(this.page.getByText("Sauce Labs Fleece Jacket")).toBeVisible();
  }
}
