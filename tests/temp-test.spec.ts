import {test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.spec';

test('Temp test', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM('Admin', 'admin123');
})