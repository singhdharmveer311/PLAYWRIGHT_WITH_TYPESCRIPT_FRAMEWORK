import { TodoPage } from "../pages/todo-page.ts";
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.spec.ts"



type myFixtures = {
    todopage: TodoPage;
    loginPage : LoginPage;
}

export const test = base.extend<myFixtures>({

    // todoPage fixture 
    todopage: async ({ page }, use) => {
        //fixture setup
        const todoPage = new TodoPage(page);
        await todoPage.goto();
        await todoPage.addToDo("ïtem1");
        

        // use the fixture value in test
        await use(todoPage);

        await todoPage.removeAll();
    },

    // Login Page Fixture Setup
    loginPage: async({page}, use) => {
        const loginpage = new LoginPage(page);

        await loginpage.gotoOrangeHRM();
        await loginpage.loginOrangeHRM("admin", "admin123");

        await use(loginpage);
    }
    
});

export { expect } from '@playwright/test';

