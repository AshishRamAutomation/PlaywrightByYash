import { Page, Locator, expect } from '@playwright/test'

export class boxLoginPage {
    readonly page: Page;
    readonly CreateNote: Locator;
    readonly password: Locator;
    readonly signIn: Locator;
    private popupPage: Page | null;

    constructor(page: Page) {
        this.page = page;
        this.CreateNote = page.getByLabel("Create Note");
        this.password = page.locator('input#password-login');
        this.signIn = page.locator('button#login-submit-password');
        this.popupPage = null;
    }

    async boxNotesPageHandle(testInfo: any) {
        const page2Promise = this.page.waitForEvent('popup');
        this.popupPage = await page2Promise;
        await testInfo.attach('Create Note Tab', {
            body: await this.popupPage.screenshot(),
            contentType: 'image/png',
        });
    }

    async EnterBoxNotesDetails(noteTitle: string, testInfo: any) {
        await this.CreateNote.click();
        await this.boxNotesPageHandle(testInfo);

        if (!this.popupPage) {
            throw new Error('Popup page was not opened');
        }

        const frame = this.popupPage.frameLocator('iframe[name="service_iframe"]');
        await frame.locator("//div[@data-testid='navbar-new-note-button']").waitFor({ state: 'visible' });
        await frame.getByLabel("Add a Title").clear();
        await frame.getByLabel("Add a Title").fill(noteTitle);
        await frame.getByLabel("Show more options").click();
        await frame.locator("//span[text()='Delete this note']").click();
        await testInfo.attach('Delete Note', {
            body: await this.popupPage.screenshot(),
            contentType: 'image/png',
        });
        await expect(frame.locator("//div[@data-testid='notification']")).toContainText("Item successfully moved to trash.");
        await this.popupPage.close();
    }

    async LogoutFromBox() {
        await this.page.locator('xpath=//*[@data-resin-target="accountmenu"]').click();
        await this.page.locator("//a[@data-testid='account-menu-logout']").click();
        await expect(this.page.locator('//div[@class="login-container"]/h1')).toHaveText("Sign In to Your Account");
    }
}