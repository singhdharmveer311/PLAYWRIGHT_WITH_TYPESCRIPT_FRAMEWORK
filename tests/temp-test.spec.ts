// import { test, expect } from '../fixtures/pom-fixtures';
import { profile } from 'node:console';
import { test } from '../fixtures/hooks-fixture';
import { expect } from '@playwright/test';



// test.beforeEach("Login before each test", async({page, loginPage, profile, commonUtils})=> {
//     await loginPage.gotoOrangeHRM();
//     console.log(await page.title());
// });

// test.afterEach("Logout after each test login", async({profile})=>{
//     await profile.logout();
// });

// import { CommonUtils } from '../utils/CommonUtils';  // We can use the fixtures to get read of the imports


// import { LoginPage } from '../pages/LoginPage.spec';

// test('Temp test1', async({page}) => {
//     const loginPage = new LoginPage
//     await loginPage.gotoOrangeHRM();
//     await loginPage.loginOrangeHRM('Admin', 'admin123');
// })




// test("Encrypted data test", async({commonUtils, loginPage})=> {
//     const encryptedData = commonUtils.encryptData('Admin');
//     console.log("this is:" + encryptedData);
//     const decryptedUsername = commonUtils.decryptData(process.env.USERNAME!);
//     const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);


//     await loginPage.gotoOrangeHRM();
//     await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);

// });


// test("Auth and re use test case", async({page, loginPage})=>{
//     await loginPage.gotoOrangeHRM();
//     console.log(await page.title());
// });


test(" Logout ", async({page, gotourl})=>{
    await expect(page).toHaveTitle('OrangeHRM');
})


test(" Logout after this ", async({page, gotourl, logout})=>{
    await expect(page).toHaveTitle('OrangeHRM');
})

