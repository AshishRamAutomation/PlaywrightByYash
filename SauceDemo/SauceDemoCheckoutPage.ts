import { Page, Locator, expect } from '@playwright/test'

export class sauceDemoCheckoutPage {
readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly paymentPageItemName: Locator;
    readonly paymentPageItemPrice: Locator;
    readonly finishButton: Locator;
    readonly thankYouHeader: Locator;
    




  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    
    this.paymentPageItemName = page.locator('[data-test="inventory-item-name"]');
    this.paymentPageItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.thankYouHeader = page.locator('[data-test="complete-header"]');
  }

  async fillFormAndContinue(firstName: string, lastName: string, postalCode: string) {
    // Step-6: Complete intermediary fields and click continue to transition to payment information page
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async verifyProductDetails(expectedName: string, expectedPrice: string) {
    // Step-7: On this page verify product name and price are correct
    await expect(this.paymentPageItemName).toHaveText(expectedName);
    await expect(this.paymentPageItemPrice).toHaveText(expectedPrice);
  }

  async clickFinish() {
    // Step-8: Click finish
    await this.finishButton.click();
  }

  async verifyThankYouMessage() {
    // Step-9: Verify thank you message
    await expect(this.thankYouHeader).toHaveText('Thank you for your order!');
  }
}

