import { Page, Locator, expect } from '@playwright/test'

export class boxLoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly nextButton: Locator;
    readonly password: Locator;
    readonly signIn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('input#login-email');
        this.nextButton = page.locator('button#login-submit');
        this.password = page.locator('input#password-login');
        this.signIn = page.locator('button#login-submit-password');
    }

    async boxApplicationLaunch(url: string) {
        await this.page.goto(url);
    }
    async EnterBoxLoginCredential(uname: string, password: string) {
        await this.username.pressSequentially(uname);
        await this.nextButton.click();
        await this.password.waitFor({ state: 'visible' });
        await this.password.pressSequentially(password);
        await this.signIn.click();
    }
    async verifyBoxUserLoggedIn() {
        await expect.soft(this.page).toHaveTitle('Box | Simple Online Collaboration');
    }

}