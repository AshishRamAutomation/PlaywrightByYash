import { Page } from '@playwright/test';
import { boxLoginPage } from './BoxLoginPage';
import { boxLoginPage as boxNotesPageClass } from './BoxNotesPage';

export class BoxManager {
    readonly page: Page;
    readonly loginPage: boxLoginPage;
    readonly notesPage: boxNotesPageClass;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new boxLoginPage(page);
        this.notesPage = new boxNotesPageClass(page);
    }
}
