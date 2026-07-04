import { Page, Locator, expect } from '@playwright/test'

export class unicornLoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly signIn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder("Enter User Name");
        this.password = page.getByPlaceholder("Enter Password");
        this.signIn = page.getByText(" SIGN IN", { exact: true });
    }

    async LaunchUnicornUrl(url: string) {
        await this.page.goto(url);
    }
    async EnterUnicornLoginCredential(uname: string, password: string) {
        await this.username.pressSequentially(uname);
        await this.password.fill(password);
        await this.signIn.click();
    }
    async verifySucessLoggedIn() {
        await expect(this.page.locator("h5.dashboard-title")).toContainText("Welcome to");
    }

}