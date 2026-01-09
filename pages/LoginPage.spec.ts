import {Locator, Page, test} from '@playwright/test'

export class LoginPage{
    readonly page:Page;
    readonly userNameInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async gotoOrangeHRM(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        
    }

    /**
     * To login to OpenHRM
     * @param username 
     * @param password 
    */
    async loginOrangeHRM(username: string, password: string){
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}


