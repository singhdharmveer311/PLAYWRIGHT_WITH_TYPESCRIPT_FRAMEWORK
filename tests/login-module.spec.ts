import loginData from '../data/login-page-data.json';
import {test} from "../fixtures/hooks-fixture";
import { expect, Expect } from '@playwright/test';

test.use(       // so that current test cases will not fail because of already logged in used in the storage state in the playwright.config.ts
    {
        storageState: {
            cookies: [],
            origins: []
        }
    }
);


test("[Login-TC1] With Invalid Username", async({page, loginPage, commonUtils})=>{

    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(loginData.Invalid_Username, decryptedPassword);
    await expect(loginPage.invalidCredentialText).toBeVisible();
});

test("[Login-TC2] With Invalid Username", async({page, loginPage, commonUtils})=>{

    const decryptedUsername = commonUtils.decryptData(process.env.USERNAME!);
    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(decryptedUsername, loginData.Invalid_Password);
    await expect(loginPage.invalidCredentialText).toBeVisible();
});


test("[Login-TC3] Login with valid credentials", async({loginPage, commonUtils})=>{
    const decryptedUsername = commonUtils.decryptData(process.env.USERNAME!);
    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);

    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);
    await expect(loginPage.dashboardPageText).toBeVisible();
});


