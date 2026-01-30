import {test} from "../fixtures/common-fixtures";
import { expect } from "@playwright/test";
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');


test("Authentication Setup ", async({page, loginPage, dashboard, commonUtils})=>{

    // console.log(encryptedData)
    const decryptedUsername = commonUtils.decryptData(process.env.USERNAME!);
    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);


    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);
    await page.waitForURL(process.env.BASE_URL + '/web/index.php/dashboard/index');
    await expect(dashboard.dashboardTitleText).toHaveText('Dashboard');

    await page.context().storageState( { path: authFile });

})