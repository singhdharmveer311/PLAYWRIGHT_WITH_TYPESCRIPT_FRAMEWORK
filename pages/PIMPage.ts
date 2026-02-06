import { Page, Locator } from "@playwright/test";

export class PIMPage{
    readonly page:Page;
    readonly pimBoard:Locator;
    readonly addBtn:Locator;
    readonly firstNameInput:Locator;
    readonly lastNameInput: Locator;
    readonly empIDInput: Locator;
    readonly saveBtn: Locator;


    readonly profileName: Locator;
    readonly pimHeading: Locator;

    constructor(page: Page){
        this.page = page;
        this.pimBoard = page.getByRole('link', { name: 'PIM' });

        this.pimHeading = page.getByRole('heading', { name: 'Employee Information' })
        this.addBtn = page.locator('.oxd-button--secondary').last();
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.empIDInput = page.getByRole('textbox').nth(4);
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.profileName = page.locator('.orangehrm-edit-employee-name');
    }


    async goToPIM(){
        await this.pimBoard.click();
    }

    async fillEmployeeDetails(firstName: string, lastName: string){
        await this.addBtn.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.saveBtn.click();
    }
}