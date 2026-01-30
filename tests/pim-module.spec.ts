import {test} from "../fixtures/hooks-fixture";
import { expect } from "@playwright/test";


// test("Clicking on PIM Tab", async({gotourl, pimPage})=>{
//     await pimpimPage.goToPIM();
//     await expect(pimpimPage.pimHeading).toBeVisible();
// })

test("Adding Employee Details", async({gotourl, pimPage, logout})=>{
    await pimPage.goToPIM();
    await expect(pimPage.pimHeading).toBeVisible();
    await pimPage.addBtn.click();

    await pimPage.firstNameInput.fill("raj");
    await pimPage.lastNameInput.fill("Singh");
    await pimPage.empIDInput.fill("9999");
    await pimPage.saveBtn.click();
    const empID = Math.floor(10000 + Math.random() * 90000).toString();
    await pimPage.fillEmployeeDetails("raj", "singh", empID);
    await expect(pimPage.successText).toBeVisible();
    console.log("Adding PIM Employee successfullsadfads");
})