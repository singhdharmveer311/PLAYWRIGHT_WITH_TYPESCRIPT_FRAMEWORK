# Playwright with TypeScript Framework - Enterprise Level

A comprehensive, enterprise-level test automation framework built with Playwright and TypeScript, featuring Page Object Model architecture, robust reporting, and CI/CD integration.

## 🚀 Features

- **TypeScript Support**: Strongly typed test automation for better code quality
- **Page Object Model**: Clean separation of page logic and test code
- **Multi-Browser Testing**: Support for Chromium, Firefox, and WebKit
- **Mobile Testing**: Built-in mobile viewport testing
- **Parallel Execution**: Run tests in parallel for faster execution
- **Rich Reporting**: HTML reports, Allure reports, and JUnit XML
- **CI/CD Ready**: GitHub Actions workflow included
- **Logging**: Comprehensive logging with file and console output
- **Configuration Management**: Environment-based configuration
- **Fixtures & Hooks**: Custom test fixtures and global setup/teardown
- **Code Quality**: ESLint and Prettier integration
- **Screenshots & Videos**: Automatic capture on test failure
- **Trace Viewer**: Debug failed tests with Playwright trace viewer

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/singhdharmveer311/PLAYWRIGHT_WITH_TYPESCRIPT_FRAMEWORK.git
cd PLAYWRIGHT_WITH_TYPESCRIPT_FRAMEWORK
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Create environment file:
```bash
cp .env.example .env
```

## 🏗️ Project Structure

```
PLAYWRIGHT_WITH_TYPESCRIPT_FRAMEWORK/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD configuration
├── src/
│   ├── core/
│   │   ├── BasePage.ts            # Base page class with common methods
│   │   └── BaseTest.ts            # Base test with custom fixtures
│   ├── pages/
│   │   ├── HomePage.ts            # Home page object model
│   │   └── GettingStartedPage.ts  # Getting started page object
│   ├── utils/
│   │   ├── Logger.ts              # Logging utility
│   │   ├── ConfigManager.ts       # Configuration management
│   │   └── TestHelper.ts          # Test helper utilities
│   └── fixtures/
│       ├── globalSetup.ts         # Global setup hooks
│       └── globalTeardown.ts      # Global teardown hooks
├── tests/
│   ├── specs/
│   │   ├── navigation.spec.ts     # Navigation test suite
│   │   └── smoke.spec.ts          # Smoke test suite
│   └── data/
│       └── testData.ts            # Test data
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
├── .eslintrc.js                   # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run mobile tests
```bash
npm run test:mobile
```

### Run tests in parallel
```bash
npm run test:parallel
```

### Run tests serially
```bash
npm run test:serial
```

### Run tests with UI mode
```bash
npm run test:ui
```

## 📊 Reports

### View HTML report
```bash
npm run report
```

### Generate and view Allure report
```bash
npm run report:allure
```

### View trace for failed tests
```bash
npm run trace
```

## 🎨 Code Quality

### Lint code
```bash
npm run lint
```

### Fix linting issues
```bash
npm run lint:fix
```

### Format code
```bash
npm run format
```

### Check formatting
```bash
npm run format:check
```

## 🔧 Configuration

### Environment Variables

Configure the framework using `.env` file:

- `BASE_URL`: Base URL for the application
- `API_URL`: API endpoint URL
- `ENV`: Environment (dev/staging/prod)
- `BROWSER`: Default browser (chromium/firefox/webkit)
- `HEADLESS`: Run in headless mode (true/false)
- `ENABLE_TRACING`: Enable trace collection (true/false)
- `ENABLE_VIDEO`: Enable video recording (true/false)
- `ENABLE_SCREENSHOTS`: Enable screenshots (true/false)

### Playwright Configuration

Edit `playwright.config.ts` to customize:
- Test directory
- Number of workers
- Retry logic
- Timeout values
- Browser projects
- Reporter configuration

## 📝 Writing Tests

### Example Test

```typescript
import { test, expect } from '../../src/core/BaseTest';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Example Test Suite', () => {
  test('should perform action', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    
    const isLoaded = await homePage.verifyHomePageLoaded();
    expect(isLoaded).toBeTruthy();
  });
});
```

### Creating Page Objects

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/BasePage';

export class MyPage extends BasePage {
  private readonly myElement: Locator;

  constructor(page: Page) {
    super(page);
    this.myElement = page.locator('#my-element');
  }

  async performAction(): Promise<void> {
    await this.click(this.myElement, 'My Element');
  }
}
```

## 🚀 CI/CD Integration

The framework includes a GitHub Actions workflow that:
- Runs tests on push and pull requests
- Executes tests across multiple browsers
- Generates and publishes test reports
- Uploads artifacts for failed tests
- Deploys Allure reports to GitHub Pages

## 🔍 Debugging

### Debug single test
```bash
npm run test:debug tests/specs/navigation.spec.ts
```

### Generate code
```bash
npm run codegen
```

### View traces
After test execution, traces are saved in `test-results/`. View them with:
```bash
npx playwright show-trace test-results/trace.zip
```

## 📦 Dependencies

### Main Dependencies
- `@playwright/test`: Playwright testing framework
- `typescript`: TypeScript compiler
- `dotenv`: Environment variable management

### Dev Dependencies
- `@typescript-eslint/eslint-plugin`: TypeScript ESLint plugin
- `eslint`: Code linting
- `prettier`: Code formatting
- `allure-playwright`: Allure reporting
- `allure-commandline`: Allure CLI

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Created by Dharmveer Singh

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - The amazing test automation framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with types
- [Allure](http://allure.qatools.ru/) - Beautiful test reports

## 📞 Support

For issues and questions:
- Create an issue in the GitHub repository
- Check Playwright documentation: https://playwright.dev/

---

**Happy Testing! 🎉**
