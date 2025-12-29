# Testing Guide

## Running Tests

### Prerequisites
Ensure you have installed dependencies and Playwright browsers:
```bash
npm install
npx playwright install
```

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode (interactive)
npm run test:ui
```

### Browser-Specific Tests

```bash
# Run on specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run on mobile viewports
npm run test:mobile
```

### Parallel vs Serial Execution

```bash
# Run tests in parallel (4 workers)
npm run test:parallel

# Run tests serially (1 worker)
npm run test:serial
```

### Run Specific Tests

```bash
# Run a specific test file
npx playwright test tests/specs/navigation.spec.ts

# Run tests matching a pattern
npx playwright test --grep "Home Page"

# Run tests in a specific project
npx playwright test --project=chromium
```

## Viewing Reports

### HTML Report
```bash
npm run report
```
The HTML report provides:
- Test results summary
- Screenshots of failures
- Video recordings
- Execution traces
- Detailed error messages

### Allure Report
```bash
npm run report:allure
```
Allure provides:
- Beautiful visual reports
- Test history
- Trend charts
- Test categorization
- Detailed attachments

### Trace Viewer
For debugging failed tests:
```bash
npm run trace
# Then select the trace file to view
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '../../src/core/BaseTest';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test('should do something', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    // Test assertions
    expect(await homePage.verifyHomePageLoaded()).toBeTruthy();
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });
});
```

### Using Page Objects

```typescript
import { test, expect } from '../../src/core/BaseTest';
import { HomePage } from '../../src/pages/HomePage';

test('navigate and verify', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  await homePage.clickGetStarted();
  expect(page.url()).toContain('docs');
});
```

### Using Custom Fixtures

```typescript
import { test, expect } from '../../src/fixtures/pageFixtures';

test('using fixtures', async ({ homePage }) => {
  await homePage.navigateToHome();
  const isLoaded = await homePage.verifyHomePageLoaded();
  expect(isLoaded).toBeTruthy();
});
```

### Using Logger

```typescript
import { test, expect } from '../../src/core/BaseTest';

test('with logging', async ({ page, logger }) => {
  logger.info('Starting test');
  await page.goto('https://example.com');
  logger.success('Navigation completed');
});
```

## Test Organization

### Directory Structure
```
tests/
├── specs/               # Test specifications
│   ├── navigation.spec.ts
│   └── smoke.spec.ts
└── data/               # Test data
    └── testData.ts
```

### Grouping Tests

```typescript
test.describe('Feature Group', () => {
  test.describe('Sub-feature 1', () => {
    test('test 1', async ({ page }) => {});
    test('test 2', async ({ page }) => {});
  });

  test.describe('Sub-feature 2', () => {
    test('test 3', async ({ page }) => {});
  });
});
```

### Tags and Annotations

```typescript
test('critical test', {
  tag: '@critical',
  annotation: { type: 'issue', description: 'JIRA-123' },
}, async ({ page }) => {
  // Test implementation
});

// Run tagged tests
// npx playwright test --grep "@critical"
```

## Debugging Tests

### Debug Mode
```bash
npm run test:debug tests/specs/navigation.spec.ts
```
This opens Playwright Inspector for step-by-step debugging.

### Headed Mode
```bash
npm run test:headed
```
Watch tests execute in a visible browser.

### Screenshots on Failure
Screenshots are automatically captured on test failure and saved in `test-results/`.

### Video Recording
Videos are recorded for failed tests (configured in `playwright.config.ts`).

### Trace Files
Traces are captured on first retry and can be viewed with:
```bash
npx playwright show-trace test-results/trace.zip
```

## Test Data Management

### Using Test Data Files
```typescript
import { testUsers } from '../data/testData';

test('login test', async ({ page }) => {
  await page.fill('#email', testUsers.validUser.email);
  await page.fill('#password', testUsers.validUser.password);
});
```

### Generating Random Data
```typescript
import { DataGenerator } from '../../src/utils/DataGenerator';

test('signup with random data', async ({ page }) => {
  const user = DataGenerator.randomUser();
  await page.fill('#email', user.email);
  await page.fill('#password', user.password);
});
```

## Best Practices

### 1. Use Page Objects
Keep test logic separate from page interactions.

### 2. Use Meaningful Test Names
```typescript
// Good
test('should display error when submitting empty form', async ({ page }) => {});

// Avoid
test('test1', async ({ page }) => {});
```

### 3. Use Proper Waits
```typescript
// Good - wait for element
await page.waitForSelector('#element');

// Avoid - hardcoded wait
await page.waitForTimeout(3000);
```

### 4. One Assertion Per Test Concept
Focus each test on a single behavior or feature.

### 5. Clean Up Test Data
Use `afterEach` or `afterAll` hooks to clean up test data.

### 6. Use Fixtures for Setup
Leverage fixtures for common setup tasks.

### 7. Tag Tests Appropriately
Use tags for categorization: `@smoke`, `@regression`, `@critical`

## CI/CD Integration

Tests run automatically on:
- Push to main/develop branches
- Pull requests
- Manual workflow dispatch

Results are:
- Uploaded as artifacts
- Published to GitHub Pages (Allure reports)
- Available in workflow summaries

## Troubleshooting

### Tests Not Running
- Ensure browsers are installed: `npx playwright install`
- Check Node.js version: `node --version` (should be 16+)
- Verify dependencies: `npm install`

### Tests Timing Out
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify page load performance

### Flaky Tests
- Use proper waits instead of timeouts
- Check for race conditions
- Review element selectors
- Add retry logic where appropriate

### Network Issues
If tests fail due to network restrictions:
- Use local test servers
- Mock API responses
- Configure proxy settings
- Update BASE_URL in .env

## Environment Configuration

### Development
```bash
ENV=dev npm test
```

### Staging
```bash
ENV=staging BASE_URL=https://staging.example.com npm test
```

### Production
```bash
ENV=prod BASE_URL=https://production.example.com npm test
```

## Performance

### Parallel Execution
Adjust workers in `playwright.config.ts`:
```typescript
workers: process.env.CI ? 1 : 4
```

### Selective Test Execution
Run only changed tests or specific suites to save time during development.

### Resource Optimization
- Use headless mode for faster execution
- Disable video for non-critical tests
- Limit trace collection to failures

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Framework Architecture](./ARCHITECTURE.md)
- [Contributing Guide](./CONTRIBUTING.md)
