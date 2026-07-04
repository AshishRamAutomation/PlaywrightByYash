import { Page, Locator, expect } from '@playwright/test'

export class sauceDemoHomePage {
readonly page: Page;
    readonly addToCartButtons: Locator;
    readonly sortDropdown: Locator;
    readonly inventoryPrices: Locator;
     readonly cartButton: Locator;
    readonly firstProductBuyButton: Locator;
    readonly firstProductName: Locator;
    readonly firstProductPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('button:has-text("Add to cart")');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryPrices = page.locator('[data-test="inventory-item-price"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.firstProductBuyButton = page.locator('[data-test^="add-to-cart"]').first();
    this.firstProductName = page.locator('[data-test="inventory-item-name"]').first();
    this.firstProductPrice = page.locator('[data-test="inventory-item-price"]').first();
  }

  async verifyAddToCartButtonCount(expectedCount:any) {
    // Step-2: Use expect to assert count
    await expect(this.addToCartButtons).toHaveCount(expectedCount);
  }

  async verifyPriceSorting() {
    // Step-3: Verify ascending sorting (Price: Low to High)
    await this.sortDropdown.selectOption('lohi');
    let pricesLoHi = await this.inventoryPrices.allInnerTexts();
    let numericPricesLoHi = pricesLoHi.map(p => parseFloat(p.replace('$', '')));
    expect(numericPricesLoHi).toEqual([...numericPricesLoHi].sort((a, b) => a - b));

    // Step-3: Verify descending sorting (Price: High to Low)
    await this.sortDropdown.selectOption('hilo');
    let pricesHiLo = await this.inventoryPrices.allInnerTexts();
    let numericPricesHiLo = pricesHiLo.map(p => parseFloat(p.replace('$', '')));
    expect(numericPricesHiLo).toEqual([...numericPricesHiLo].sort((a, b) => b - a));
  }

  async addFirstProductToCart() {
    // Needed to have an item in the cart to successfully proceed to payment verification steps
    const name = await this.firstProductName.innerText();
    const price = await this.firstProductPrice.innerText();
    await this.firstProductBuyButton.click();
    return { name, price };
  }

  async goToCart() {
    // Step-4: Click on cart button
    expect.soft(this.cartButton).toBeVisible();
    await this.cartButton.click();
  }
}

