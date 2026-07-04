import { Page, Locator, expect } from '@playwright/test'

export class unicornpreviewpage {
    readonly page: Page;
    readonly DealNumberPreview: Locator;
    readonly PropertyTypePreview: Locator;
    readonly AgentNamePreview: Locator;
    readonly BookingDatePreview: Locator;


    constructor(page: Page) {
        this.page = page;
        this.DealNumberPreview = page.locator('//th[text()="Deal Number"]/following-sibling::*');
        this.PropertyTypePreview = page.locator('//th[text()="Property Type"]/following-sibling::*');
        this.AgentNamePreview = page.locator('//th[text()="Agent Name"]/following-sibling::*');
        this.BookingDatePreview = page.locator('//th[text()="Booking Date"]/following-sibling::*');
    }

    async validateEnteredDetailsInPreview(dealnumber: string, propertytype: string, agentname: string) {
        await expect(this.DealNumberPreview).toContainText(dealnumber);
        await expect(this.PropertyTypePreview).toContainText("Single Family");
        await expect(this.AgentNamePreview).toContainText("Ashish Ram");
    }
    async validateBookingDate(page: Page, BookingDate: string, testInfo: any) {
        const dateString = BookingDate;
        const dateObj = new Date(dateString); // Converts MM-DD-YYYY to a date object
        const options = { month: 'short', day: 'numeric', year: 'numeric' } as const;
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
        console.log(formattedDate);

        await expect(page.locator('//th[text()="Booking Date"]/following-sibling::*')).toContainText(formattedDate);
        await testInfo.attach('Preview Screen', {
            body: await page.screenshot(),
            contentType: 'image/png',
        })
    }
}