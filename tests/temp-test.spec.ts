// import { test, expect } from '../fixtures/pom-fixtures';
import { test } from '../fixtures/common-fixtures';
// import { CommonUtils } from '../utils/CommonUtils';  // We can use the fixtures to get read of the imports


// import { LoginPage } from '../pages/LoginPage.spec';

// test('Temp test1', async({page}) => {
//     const loginPage = new LoginPage
//     await loginPage.gotoOrangeHRM();
//     await loginPage.loginOrangeHRM('Admin', 'admin123');
// })



// test("Temp test", async({todopage}) => {
//     todopage.addToDo("xxx");
//     todopage.removeAll();
// });

test("Encrypted data test", async({commonUtils})=> {
    const encryptedData = commonUtils.encryptData('admin');
    console.log(encryptedData)
    const decryptedData = commonUtils.decryptData(encryptedData);
    console.log(decryptedData);

    // loginPage.gotoOrangeHRM();
    // loginPage.loginOrangeHRM(encryptedData, )
    
    

    // commonutils.decryptData('admin')

});