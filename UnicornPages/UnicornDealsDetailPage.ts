import { Page, Locator, expect } from '@playwright/test'

export class unicornDealsDetail {
  readonly page: Page;
  readonly PropertyType: Locator;
  readonly transactionType: Locator;
  readonly LoanAmount: Locator;
  readonly SelectBookingPeriod: Locator;
  readonly closeDate: Locator;
  readonly AgentName: Locator;
  readonly uploadpicture: Locator;
  readonly submitBtn: Locator;
  readonly previewBtn: Locator;


  constructor(page: Page) {
    this.page = page;
    this.PropertyType = page.locator("//input[@id='disclosureType']");
    this.transactionType = page.locator("//*[@name='transactionType']");
    this.LoanAmount = page.locator("#loanAmount");
    this.SelectBookingPeriod = page.locator("//label[text()='Booking Date']/..//input");
    this.closeDate = page.locator("//input[@id='disbursementDate']");
    this.AgentName = page.locator("//input[@id='dealAgentName']");
    this.uploadpicture = page.locator("//input[@id='file-input']");
    this.submitBtn = page.locator("//input[@type='submit']");
    this.previewBtn = page.locator("//button[text()=' Preview']");
  }

  async propertyType(PropertyType: string) {
    await this.PropertyType.click();
    await this.page.locator("//span[text()='" + PropertyType + "']").click();
  }
  async selectTransactionType(TransactionType: string) {
    await this.transactionType.click();
    await this.page.locator("//span[text()='" + TransactionType + "']").click();
  }
  async enterLoanAmount(LoanAmount: string) {
    await this.LoanAmount.clear();
    await this.LoanAmount.fill(LoanAmount);
  }
  async selectBookingPeriod(BookingPeriod: string) {
    await this.SelectBookingPeriod.clear();
    await this.SelectBookingPeriod.fill(BookingPeriod);
  }
  async selectcloseDate(CloseDate: string) {
    await this.closeDate.clear();
    await this.closeDate.fill(CloseDate);
  }
  async enterAgentName(AgentName: string) {
    await this.AgentName.clear();
    await this.AgentName.fill(AgentName);
  }
  async uploadPicture() {
    await this.uploadpicture.setInputFiles('C:/Users/ashish.ram/Pictures/API Test-Playwright.png');
  }
  async clickSubmitBtn() {
    await this.page.locator("//input[@type='submit']").click();
  }
  async clickPreviewBtn() {
    await this.page.locator("//button[text()=' Preview']").click();
  }
}