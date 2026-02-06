import {Page, Locator} from "@playwright/test";


export class NavigationPanel{
    readonly page: Page;
    readonly navigationPanelLoc: Locator;
    readonly dashboardPage: Locator;

    constructor(page: Page){
        this.page = page;
        this.navigationPanelLoc = page.locator('.oxd-sidepanel-body');
        this.dashboardPage = page.locator('.oxd-layout-context');
    }

}