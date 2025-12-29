# Quick Start Guide

Get up and running with the Playwright TypeScript Framework in 5 minutes!

## 🚀 Quick Setup

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/singhdharmveer311/PLAYWRIGHT_WITH_TYPESCRIPT_FRAMEWORK.git
cd PLAYWRIGHT_WITH_TYPESCRIPT_FRAMEWORK

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env and update BASE_URL if needed
# Default is https://playwright.dev
```

### 3. Run Your First Test
```bash
# Run all tests
npm test

# Run in headed mode to see the browser
npm run test:headed

# Run with UI mode (recommended for development)
npm run test:ui
```

## 📊 View Results

```bash
# Open HTML report
npm run report

# Generate Allure report
npm run report:allure
```

## ✍️ Write Your First Test

1. **Create a new test file** in `tests/specs/`:

```typescript
// tests/specs/my-first-test.spec.ts
import { test, expect } from '../../src/core/BaseTest';

test.describe('My First Test Suite', () => {
  test('should load a page', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });
});
```

2. **Run your test**:
```bash
npx playwright test tests/specs/my-first-test.spec.ts
```

## 🎯 Create a Page Object

1. **Create a new page file** in `src/pages/`:

```typescript
// src/pages/MyPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class MyPage extends BasePage {
  private readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1');
  }

  async navigateToMyPage(): Promise<void> {
    await this.goto('/my-page');
  }

  async getHeadingText(): Promise<string> {
    return await this.getText(this.heading);
  }
}
```

2. **Use it in your test**:

```typescript
import { test, expect } from '../../src/core/BaseTest';
import { MyPage } from '../../src/pages/MyPage';

test('verify page heading', async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.navigateToMyPage();
  const heading = await myPage.getHeadingText();
  expect(heading).toBeTruthy();
});
```

## 🛠️ Common Commands

```bash
# Run tests
npm test                    # All tests
npm run test:chromium       # Chromium only
npm run test:firefox        # Firefox only
npm run test:webkit         # WebKit only
npm run test:headed         # Visible browser
npm run test:debug          # Debug mode

# Code quality
npm run lint                # Check code
npm run lint:fix            # Fix linting issues
npm run format              # Format code

# Reports
npm run report              # Open HTML report
npm run report:allure       # Generate Allure report

# Utilities
npm run codegen             # Generate test code
npm run trace               # View trace files
npm run clean               # Clean test artifacts
```

## 📚 Next Steps

1. **Read the documentation**:
   - [README.md](./README.md) - Overview and features
   - [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Detailed testing guide
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Framework architecture
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributing guidelines

2. **Explore the framework**:
   - Check out example tests in `tests/specs/`
   - Review page objects in `src/pages/`
   - Understand utilities in `src/utils/`

3. **Customize for your needs**:
   - Update `playwright.config.ts` for your project
   - Add your pages to `src/pages/`
   - Create test data in `tests/data/`
   - Configure CI/CD in `.github/workflows/`

## 💡 Pro Tips

- **Use Page Objects**: Keep test logic separate from page interactions
- **Use Fixtures**: Leverage custom fixtures for common setup tasks
- **Use Logger**: Add logging to track test execution
- **Use Data Generator**: Generate random test data
- **Use API Helper**: Test APIs alongside UI tests
- **Debug Effectively**: Use `npm run test:ui` for interactive debugging

## ❓ Need Help?

- Check the [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed examples
- Review [Playwright Documentation](https://playwright.dev)
- Create an issue in the repository

## 🎉 You're Ready!

Start writing tests and building your test automation suite with confidence!

---

**Happy Testing!** 🚀
