import loginData from '../data/loginPageData.json';
import {test} from "../fixtures/hooks-fixture";


test("[Login-TC1] With Invalid Username", async({page, loginPage, commonUtils})=>{

    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(loginData.Invalid_Username, decryptedPassword);
})

test("[Login-TC2] With Invalid Username", async({page, loginPage, commonUtils})=>{

    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(loginData.Invalid_Username, decryptedPassword);
})