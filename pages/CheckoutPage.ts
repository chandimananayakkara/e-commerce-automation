import type, { expect, type Page } from "@playwright/test";

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }

  async fillDetails(firstName: string, lastName: string, zipCode: string) {
    await this.page.getByPlaceholder("First Name").fill(firstName);
    await this.page.getByPlaceholder("Last Name").fill(lastName);
    await this.page.getByPlaceholder("Zip/Postal Code").fill(zipCode);
  }

  async continueToPayment() {
    await this.page.getByTestId("continue").click();
  }

  async confirmOrder() {
    await expect(this.page.getByText("Price Total")).toBeVisible();
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  async completeOrder() {
    await expect(this.page.getByText("Checkout: Complete!")).toBeVisible();
    await expect(
      this.page.getByText("Thank you for your order!"),
    ).toBeVisible();
  }
}
