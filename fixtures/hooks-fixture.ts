import {test as baseTest} from "../fixtures/common-fixtures";


type pageFixture = {
    gotourl: any;   // because we are not using any methods isse pahle fixtures me methods use ker rahe they
    logout : any;
}

export const test = baseTest.extend<pageFixture>({

    gotourl: async({loginPage}, use)=>{
        await loginPage.gotoOrangeHRM();
        await use();
    },

    logout: async({profile}, use)=>{
        await use();
        console.log("This Is logout Excution after hook fixture")
        await profile.logout();

    }
})