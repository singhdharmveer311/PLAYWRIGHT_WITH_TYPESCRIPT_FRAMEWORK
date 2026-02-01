import {test, expect} from "../fixtures/hooks-fixture";
import pimData  from "../data/pim-data.json";


// test("Clicking on PIM Tab", async({gotourl, pimPage})=>{
//     await pimpimPage.goToPIM();
//     await expect(pimpimPage.pimHeading).toBeVisible();
// })

test("Adding Employee Details", async({gotourl, pimPage, logout})=>{
    await pimPage.goToPIM();
    await expect(pimPage.pimHeading).toBeVisible();

    await pimPage.fillEmployeeDetails(pimData.first_name, pimData.last_name);

    await expect(pimPage.profileName).toHaveText(`${pimData.first_name} ${pimData.last_name}`);
    console.log("Adding PIM Employee successfull");
})