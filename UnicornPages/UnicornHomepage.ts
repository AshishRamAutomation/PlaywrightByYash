import { Page, Locator, expect } from '@playwright/test'

export class unicornHomepage {
    readonly page: Page;
    readonly PropertyAddress: Locator;
    readonly DealNumber: Locator;
    readonly transactionType: Locator;
    readonly createNew: Locator;


    constructor(page: Page) {
        this.page = page;
        this.PropertyAddress = page.getByPlaceholder("Enter Address");
        this.DealNumber = page.getByPlaceholder("Enter Deal Number");
        this.transactionType = page.getByText("Finance");
        this.createNew = page.getByText("CREATE NEW", { exact: true })
    }

    async enterPropertyDetails(propertyAddress: string, dealNumber: string) {
        await this.PropertyAddress.pressSequentially(propertyAddress);
        await this.DealNumber.fill(dealNumber);
        await this.transactionType.click();
        await this.createNew.click();
    }
    async verifyCreatedFile() {
        await expect(this.page.locator("//div[@class='app-action']")).toContainText(" Create New File ");
    }

}