/**
 * test  - imported from hooks-fixture (chain: pom-fixtures -> common-fixtures -> hooks-fixture)
 *         carries all fixtures: page, loginPage, dashboard, profile, pimPage, gotourl, logout, commonUtils
 * expect - re-exported from @playwright/test via hooks-fixture, used for assertions
 */
import {test, expect} from "../fixtures/hooks-fixture";

/**
 * Importing test data from JSON file
 * JSON imports need "resolveJsonModule": true in tsconfig.json
 * This keeps test data separate from test logic (data-driven approach)
 */
import pimData  from "../data/pim-data.json";


/**
 * Test: Adding Employee Details
 *
 * --- TAGS ---
 * tag: Used for filtering tests from CLI
 *   - @smoke  : marks this as part of smoke test suite
 *   - @pim    : marks this as PIM module test
 *
 * Run by tag:   npx playwright test --grep @smoke
 * Skip by tag:  npx playwright test --grep-invert @smoke
 * Multiple:     npx playwright test --grep "@smoke|@pim"
 *
 * --- ANNOTATIONS ---
 * annotation: Metadata that shows in the HTML report (not for filtering)
 *   - type: label shown in report    description: detail/info
 *   - feature  : which feature area this test covers
 *   - owner    : who is responsible for this test
 *   - severity : how critical this test is (critical/major/minor)
 *
 * Note: annotations support clickable URLs in description
 *       e.g. { type: 'issue', description: 'https://github.com/issues/123' }
 *
 * --- FIXTURES (in params) ---
 * gotourl : hook fixture - runs loginPage.gotoOrangeHRM() BEFORE test (setup)
 *           just declaring it activates it, no need to call it
 * pimPage : page object fixture - provides PIMPage methods and locators
 * logout  : hook fixture - runs profile.logout() AFTER test (teardown)
 *           code after use() in fixture runs as teardown/cleanup
 */


test("Adding Employee Details", {
    tag: ['@smoke', '@pim'],
    annotation: [
        { type: 'feature', description: 'PIM Module - Add Employee' },
        { type: 'owner', description: 'Dharmveer' },
        { type: 'severity', description: 'critical' }
    ]
}, async({gotourl, pimPage, logout})=>{

    /**
     * test.step() - Groups actions into named steps
     * - Shows as collapsible sections in HTML report
     * - If a step fails, the report shows exactly WHICH step failed
     * - Must be awaited since it's async
     * - Syntax: await test.step("Step Name", async () => { ...actions... })
     */
    await test.step("Navigate to PIM page", async()=>{
        await pimPage.goToPIM();
        // toBeVisible() - auto-retrying assertion, waits until element appears (up to expect.timeout)
        await expect(pimPage.pimHeading).toBeVisible();
    });

    await test.step("Fill employee details and save", async()=>{
        // Data comes from pim-data.json -> keeps test data separate from test logic
        await pimPage.fillEmployeeDetails(pimData.first_name, pimData.last_name);
    });

    await test.step("Verify employee profile name", async()=>{
        // Template literal builds expected text: "firstName lastName"
        // toHaveText() - auto-retrying assertion, waits for text to match
        await expect(pimPage.profileName).toHaveText(`${pimData.first_name} ${pimData.last_name}`);
        console.log("Adding PIM Employee successfull");
    });

})
