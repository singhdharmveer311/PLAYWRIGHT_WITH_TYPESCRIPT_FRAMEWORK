import { test, expect } from '../fixtures/pom-fixtures';
// import { LoginPage } from '../pages/LoginPage.spec';

// test('Temp test', async({page}) => {
//     const loginPage = new LoginPage
//     await loginPage.gotoOrangeHRM();
//     await loginPage.loginOrangeHRM('Admin', 'admin123');
// })


test("Temp test", async({todopage}) => {
    todopage.addToDo("xxx");
    todopage.removeAll();
});