import { expect, type Page } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.getByTestId("shopping-cart-link").click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
  }

  async removeFromCart(productName: string) {
    await this.page.getByText(productName);
    await this.page.getByRole("button", { name: "Remove" }).click();
    await expect(
      this.page.getByRole("button", { name: "Remove" }),
    ).toBeVisible();
    await this.page.getByRole("button", { name: "Back to products" }).click();
  }

  async goToCheckout() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
}
