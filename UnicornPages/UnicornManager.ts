import { Page } from '@playwright/test';
import { unicornHomepage } from './UnicornHomepage';
import { unicornLoginPage } from './UnicornLoginPage';
import { unicornpreviewpage } from './UnicornPreviewPage';
import { unicornDealsDetail } from './UnicornDealsDetailPage';

export class UnicornManager {
    readonly page: Page;
    readonly loginPage: unicornLoginPage;
    readonly homePage: unicornHomepage;
    readonly previewPage: unicornpreviewpage;
    readonly dealsDetailPage: unicornDealsDetail;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new unicornLoginPage(page);
        this.homePage = new unicornHomepage(page);
        this.previewPage = new unicornpreviewpage(page);
        this.dealsDetailPage = new unicornDealsDetail(page);
    }
}
