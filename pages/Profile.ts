import { Page, Locator } from "@playwright/test";

export class Profile{
    readonly page: Page;
    readonly profileBtn: Locator;
    readonly logoutBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.profileBtn = page.locator('.oxd-userdropdown');
        this.logoutBtn = page.getByRole('menuitem', { name: 'Logout' });
    }

    async logout(){
        await this.profileBtn.click();
        await this.logoutBtn.click();
    }
}