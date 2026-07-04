import { Page, Locator, expect } from '@playwright/test'

export class sauceDemoCartPage {
readonly page: Page;
    readonly checkoutButton: Locator;
    


  constructor(page : Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async clickCheckout() {
    // Step-5: Click checkout
    await this.checkoutButton.click();
  }
}

