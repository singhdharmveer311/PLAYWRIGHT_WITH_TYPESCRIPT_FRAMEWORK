import {Locator, Page, test} from "@playwright/test"


export class Dashboard{
    readonly page: Page;
    readonly dashboardTitleText: Locator;

    constructor(page: Page){
        this.page = page;
        this.dashboardTitleText = page.getByRole('heading', { name: 'Dashboard' });
    }
    
}