import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.spec.ts"
import { Dashboard } from "../pages/Dashboard.spec.ts";
import { Profile } from "../pages/Profile.spec.ts"
import { PIMPage } from "../pages/PIMPage.spec.ts";
import { NavigationPanel } from "../pages/NavigationPanel.spec.ts";



type myFixtures = {
    loginPage : LoginPage;
    dashboard: Dashboard;
    profile: Profile;
    pimPage: PIMPage;
    navigationPanel: NavigationPanel;
}

export const test = base.extend<myFixtures>({

    // Login Page Fixture Setup
    loginPage: async({page}, use) => {
        const loginpage = new LoginPage(page);
        await use(loginpage);
    },

    // Dashboard Page fixture setup
    dashboard: async({page}, use)=>{
        const dashboard = new Dashboard(page);
        await use(dashboard);
    },

    profile: async({page}, use)=>{
        const profile = new Profile(page);
        await use(profile);
    },

    // PIM Page Fixture
    pimPage: async({page}, use)=>{
        const pimPage = new PIMPage(page);
        await use(pimPage);
    },

    // Navigation Panel fixture
    navigationPanel: async({page}, use)=>{
        await use(new NavigationPanel(page));
    }
});


