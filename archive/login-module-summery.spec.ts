/**
 * test   - imported from hooks-fixture (chain: pom-fixtures -> common-fixtures -> hooks-fixture)
 *          carries all fixtures: page, loginPage, dashboard, profile, pimPage, gotourl, logout, commonUtils
 * expect - imported from @playwright/test, used for assertions (toBeVisible, toHaveText, etc.)
 */
import {test} from "../fixtures/hooks-fixture";
import { expect } from '@playwright/test';

/**
 * Test data imported from JSON (data-driven approach)
 * Contains invalid credentials used for negative test cases
 * Valid credentials come from .env files (encrypted) and are decrypted at runtime
 */
import loginData from '../data/login-page-data.json';


/**
 * test.use() - Override config settings for THIS file only
 *
 * Problem: playwright.config.ts sets storageState: './.auth/user.json' for all tests,
 *          which means every test starts already logged in (session is reused).
 *          But login tests NEED to start logged out to test the login flow.
 *
 * Solution: Clear cookies and origins so this file starts with a fresh browser session.
 *
 * Scope options:
 *   - File level (like here)    : applies to ALL tests in this file
 *   - Inside test.describe()    : applies to all tests in that describe block
 *   - Cannot apply to a single test directly (put it in its own file or describe)
 */
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});


/**
 * test.describe() - Groups related tests together
 *
 * Benefits:
 *   - Logical grouping in HTML report (collapsible section)
 *   - Share hooks: beforeEach/afterEach apply only within this describe
 *   - Share config: test.use() inside describe applies only to its tests
 *   - Can be nested: test.describe("outer", () => { test.describe("inner", ...) })
 *
 * Modes (configure execution order):
 *   - default        : tests run in parallel (if fullyParallel is true in config)
 *   - serial         : tests run one after another, if one fails rest are skipped
 *   - parallel       : force parallel even if config says otherwise
 *
 * --- TAGS ---
 * @login    : marks entire suite as login module tests
 * @negative : for the inner describe with invalid credential tests
 * @positive : for the valid login test
 *
 * Run: npx playwright test --grep @login        (all login tests)
 *      npx playwright test --grep @negative     (only negative cases)
 *      npx playwright test --grep @positive     (only positive cases)
 *
 * --- ANNOTATIONS ---
 * feature  : which module/feature this suite covers
 * owner    : who maintains these tests
 */
test.describe("Login Module @login", {
    annotation: [
        { type: 'feature', description: 'Login Module - Authentication Tests' },
        { type: 'owner', description: 'Dharmveer' }
    ]
}, ()=>{

    /**
     * Nested describe - groups negative test cases together
     *
     * test.describe.configure({ mode: 'serial' })
     *   - Tests in this block run sequentially (one after another)
     *   - If TC1 fails, TC2 will be SKIPPED (useful when tests depend on each other)
     *   - Other modes: 'parallel' (default), 'serial'
     */
    test.describe("Negative Cases @negative", ()=>{

        // Uncomment below to make tests in this describe run sequentially
        // test.describe.configure({ mode: 'serial' });

        /**
         * TC1: Invalid Username + Valid Password
         *
         * --- TEST STEPS ---
         * test.step() groups actions into named collapsible sections in the HTML report
         * If a step fails, the report pinpoints exactly which step broke
         *
         * --- FIXTURES USED ---
         * loginPage   : page object with login form locators and methods
         * commonUtils : utility class for encrypt/decrypt (reads SECRET_KEY from env)
         *
         * --- DECRYPTION ---
         * process.env.PASSWORD! : reads encrypted password from .env file
         *   - The '!' is TypeScript's non-null assertion (tells TS "this value exists")
         *   - commonUtils.decryptData() decrypts it using AES with SECRET_KEY
         *   - SECRET_KEY must be provided via CLI or .env file
         */
        test("[Login-TC1] With Invalid Username", {
            tag: ['@smoke'],
            annotation: { type: 'severity', description: 'critical' }
        }, async({loginPage, commonUtils})=>{

            await test.step("Decrypt password from env", async()=>{
                // Password is stored encrypted in .env file for security
                // decryptData uses AES decryption with SECRET_KEY
                var decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);

                await test.step("Navigate to login page", async()=>{
                    await loginPage.gotoOrangeHRM();
                });

                await test.step("Login with invalid username and valid password", async()=>{
                    // loginData.Invalid_Username comes from login-page-data.json
                    await loginPage.loginOrangeHRM(loginData.Invalid_Username, decryptedPassword);
                });

                await test.step("Verify error message is displayed", async()=>{
                    // toBeVisible() - auto-retrying assertion
                    // Playwright keeps checking until element appears or expect.timeout hits
                    await expect(loginPage.invalidCredentialText).toBeVisible();
                });
            });
        });


        /**
         * TC2: Valid Username + Invalid Password
         */
        test("[Login-TC2] With Invalid Password", {
            tag: ['@smoke'],
            annotation: { type: 'severity', description: 'critical' }
        }, async({loginPage, commonUtils})=>{

            await test.step("Decrypt username from env", async()=>{
                var decryptedUsername = commonUtils.decryptData(process.env.USERNAME!);

                await test.step("Navigate to login page", async()=>{
                    await loginPage.gotoOrangeHRM();
                });

                await test.step("Login with valid username and invalid password", async()=>{
                    // loginData.Invalid_Password comes from login-page-data.json
                    await loginPage.loginOrangeHRM(decryptedUsername, loginData.Invalid_Password);
                });

                await test.step("Verify error message is displayed", async()=>{
                    await expect(loginPage.invalidCredentialText).toBeVisible();
                });
            });
        });

    }); // end Negative Cases


    /**
     * Positive Cases - Valid login flow
     */
    test.describe("Positive Cases @positive", ()=>{

        /**
         * TC3: Valid Username + Valid Password
         *
         * Both username and password are encrypted in .env and decrypted at runtime
         * On success, user should land on Dashboard page
         */
        test("[Login-TC3] Login with valid credentials", {
            tag: ['@smoke', '@regression'],
            annotation: [
                { type: 'severity', description: 'critical' },
                { type: 'priority', description: 'P0 - must pass before release' }
            ]
        }, async({loginPage, commonUtils})=>{

            await test.step("Decrypt credentials from env", async()=>{
                var decryptedUsername = commonUtils.decryptData(process.env.USERNAME!);
                var decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);

                await test.step("Navigate to login page", async()=>{
                    await loginPage.gotoOrangeHRM();
                });

                await test.step("Login with valid credentials", async()=>{
                    await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);
                });

                await test.step("Verify dashboard page is displayed", async()=>{
                    // dashboardPageText locator confirms successful login
                    await expect(loginPage.dashboardPageText).toBeVisible();
                });
            });
        });

    }); // end Positive Cases

}); // end Login Module
