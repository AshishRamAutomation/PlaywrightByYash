import { test, type Page } from '@playwright/test';
import data from '../TestData.json';
import { UnicornManager } from '../UnicornPages/UnicornManager';

class UnicornPagesPOM {
   readonly unicornManage: UnicornManager;

  constructor(page: Page) {
    this.unicornManage = new UnicornManager(page);
  }

  async loginAndOpenHomePage() {
    await this.unicornManage.loginPage.LaunchUnicornUrl(data.UnicornloginPage.Unicornurl);
    await this.unicornManage.loginPage.EnterUnicornLoginCredential(data.UnicornloginPage.Unicornusername, data.UnicornloginPage.Unicornpassword);
    await this.unicornManage.loginPage.verifySucessLoggedIn();
  }

  async createDeal() {
    await this.unicornManage.homePage.enterPropertyDetails(data.UnicorndealPage.propertyAddress, data.UnicorndealPage.dealNumber);
    await this.unicornManage.homePage.verifyCreatedFile();
  }

  async fillDealDetails(testInfo: any) {
    await this.unicornManage.dealsDetailPage.propertyType(data.UnicorndealPage.propertyType);
    await this.unicornManage.dealsDetailPage.selectTransactionType(data.UnicorndealPage.transactionType);
    await this.unicornManage.dealsDetailPage.enterLoanAmount(data.UnicorndealPage.loanAmount);
    await this.unicornManage.dealsDetailPage.selectBookingPeriod(data.UnicorndealPage.bookingDate);
    await this.unicornManage.dealsDetailPage.selectcloseDate(data.UnicorndealPage.closingDate);
    await this.unicornManage.dealsDetailPage.enterAgentName(data.UnicorndealPage.agentName);
    await this.unicornManage.dealsDetailPage.uploadPicture();
    await this.unicornManage.dealsDetailPage.clickSubmitBtn();
    await this.unicornManage.dealsDetailPage.clickPreviewBtn();
    await this.unicornManage.previewPage.validateEnteredDetailsInPreview(
      data.UnicorndealPage.dealNumber,
      data.UnicorndealPage.propertyType,
      data.UnicorndealPage.agentName
    );
    await this.unicornManage.previewPage.validateBookingDate(this.unicornManage.page, data.dealPage.bookingDate, testInfo);
  }
}

test('Unicorn Create Deal', async ({ page }, testInfo) => {
  const unicornPages = new UnicornPagesPOM(page);

  await test.step('Login to Unicorn', async () => {
    await unicornPages.loginAndOpenHomePage();
  });

  await test.step('Create a new deal', async () => {
    await unicornPages.createDeal();
  });

  await test.step('Fill deal details and validate preview', async () => {
    await unicornPages.fillDealDetails(testInfo);
  });
});
