import { Page, Locator, expect } from '@playwright/test'

export class sauceDemoLoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly signIn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.signIn = page.locator('input#login-button');
    }

    async sauceDemoApplicationLaunch(url: string) {
        await this.page.goto(url);
    }
    async EnterSauceDemoLoginCredential(uname: string, password: string) {
        await this.username.pressSequentially(uname);
        await this.password.pressSequentially(password);
        await this.signIn.click();
    }
    async verifySauceDemoUserLoggedIn() {
        await expect.soft(this.page).toHaveTitle('Swag Labs');
    }

}