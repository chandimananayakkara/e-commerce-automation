import type { Page } from "@playwright/test";

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async addToCart(productName: string) {
    await this.page.getByText(productName).click();
    await this.page.getByText("Add to cart").click();
  }

  async goToCart() {
    await this.page.getByTestId("shopping-cart-link").click();
  }

  async filterProduct(category: string){
     await this.page
    .getByTestId("product-sort-container")
    .selectOption({ label: category });
 
  }
}
