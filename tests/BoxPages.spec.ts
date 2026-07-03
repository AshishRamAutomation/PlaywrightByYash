import { test, type Page } from '@playwright/test';
import data from '../TestData.json';
import { BoxManager } from '../BoxPages/BoxManager';

class BoxPagesFlow {
    readonly box: BoxManager;

    constructor(page: Page) {
        this.box = new BoxManager(page);
    }

    async loginToBox() {
        await this.box.loginPage.boxApplicationLaunch(data.BoxLoginPage.BoxUrl);
        await this.box.loginPage.EnterBoxLoginCredential(data.BoxLoginPage.Boxusername, data.BoxLoginPage.Boxpassword);
        await this.box.loginPage.verifyBoxUserLoggedIn();
    }

    async openNotesTab(testInfo: any) {
        await this.box.notesPage.EnterBoxNotesDetails(data.BoxNotesPage.NoteTitle, testInfo);
    }
    async logoutFromBox(testInfo: any) {
        await this.box.notesPage.LogoutFromBox();
    }
}

test('Box Notes Create and Delete', async ({ page }, testInfo) => {
    const boxFlow = new BoxPagesFlow(page);

    await test.step('Login to Box', async () => {
        await boxFlow.loginToBox();
    });

    await test.step('Open Box notes create and delete', async () => {
        await boxFlow.openNotesTab(testInfo);
    });

    await test.step('Logout from Box', async () => {
        await boxFlow.logoutFromBox(testInfo);
    });
});
