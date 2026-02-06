import loginData from '../data/login-page-data.json';
import {test} from "../fixtures/hooks-fixture";
import { expect, Expect } from '@playwright/test';
import { Dashboard } from '../pages/Dashboard.spec';


// Tests that require fresh login (no pre-existing storage state)
test.describe("Login Tests - Without Storage State", ()=>{
    
    test.use({       // Clear storage state for login tests
        storageState: {
            cookies: [],
            origins: []
        }
    });

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

});


test.describe("Visual testing with tag groping and annotation", {
    tag: ["@visual", "@UAT"],
    annotation: [
        {type: 'feature', description: 'visual testing module'},
        {type: 'JIRA-ID', description: 'PLQA1'}
    ]
}, ()=>{

    test("Visual testing - Navigation Panel Screenshot", {
        tag: ["@visual", "@regression"],
        annotation: [
            {type: 'feature', description: 'visual testing module'},
            {type: 'JIRA-ID', description: 'PLQA1'}
        ]
    }, async({page, gotourl, loginPage, commonUtils, navigationPanel, logout})=>{

    await loginPage.gotoOrangeHRM();
    await expect(loginPage.dashboardPageText).toBeVisible();
    await expect(navigationPanel.navigationPanelLoc).toHaveScreenshot();
    })

    test("Visual testing - Dashboard Page", {
        tag: ["@visual", "@regression"],
        annotation: [
            {type: 'feature', description: 'visual testing module'},
            {type: 'JIRA-ID', description: 'PLQA1'}
        ]
    }, async({page, gotourl, loginPage, commonUtils, navigationPanel, logout})=>{
        console.log(page.title);
        await loginPage.gotoOrangeHRM();
    })

});


