# Playwright with TypeScript Automation Framework

## Overview
This project is a Playwright + TypeScript automation framework designed for OrangeHRM-focused UI and API validation. It uses the Page Object Model with layered fixtures for reusable test flows, supports API testing through `APIRequestContext`, loads environment-specific settings via `dotenv`, and reuses authenticated browser state through Playwright project dependencies.

## Tech Stack
- Node.js
- TypeScript
- Playwright Test (`@playwright/test`)
- `dotenv`
- `crypto-js`
- `cross-env`

## Project Architecture
- `tests/`: UI and API test specs
- `pages/`: Page Object Model classes
- `fixtures/`: Custom fixture layers and reusable test context
- `data/`: JSON test data files
- `env-files/`: Environment-specific `.env` files
- `utils/`: Shared utility classes

Fixture chain used in UI specs:
- `pom-fixtures` -> `common-fixtures` -> `hooks-fixture`

## Authentication Model
This framework uses a project-dependency pattern for authentication:
- `SetupAuth` project runs `tests/global-setup.spec.ts`
- `chromium` project depends on `SetupAuth`
- Auth state is stored in `.auth/user.json`

For API-only or targeted runs where setup dependency is not needed, use `--no-deps`:

```bash
npx playwright test tests/api/temp.spec.ts --project=chromium --no-deps
```

## Prerequisites
- Node.js LTS
- npm
- Playwright browser binaries

## Installation
```bash
npm install
npx playwright install
```

## Environment Configuration
`playwright.config.ts` loads env files based on `ENV_NAME`:
- If `ENV_NAME` is set, it loads `./env-files/.env.<ENV_NAME>`
- If `ENV_NAME` is not set, it loads `./env-files/.env`

Safe environment variable contract example:

```env
BASE_URL=https://example-app-url
USERNAME=<encrypted-or-placeholder-username>
PASSWORD=<encrypted-or-placeholder-password>
SECRET_KEY=<secret-key>
```

Run with environment selection:

```bash
ENV_NAME=demo npx playwright test --project=chromium
ENV_NAME=dev npx playwright test
```

## Running Tests
Available package scripts:

```bash
npm run test_dev
npm run test_demo_cr_hl
npm run test_demo_cr_hd
npm run test_last_failed
```

Useful targeted runs:

```bash
npx playwright test tests/api/temp.spec.ts --project=chromium --no-deps
npx playwright test --grep "<tag>"
```

Headed vs headless:
- Headed mode (`--headed`) is useful for local debugging and observing UI behavior.
- Headless mode is faster and better suited for CI and regular regression runs.

## Reporting and Debugging
Current behavior from `playwright.config.ts`:
- HTML report is generated and configured to open automatically.
- Screenshot capture: `only-on-failure`
- Video capture: `on`
- Trace: `retain-on-failure`

Useful rerun pattern for failed tests:

```bash
npm run test_last_failed
```

## API Testing Notes
Use `tests/api/temp.spec.ts` as the API learning and experimentation file.

Current examples include:
- GET calls
- POST calls
- PUT calls
- Response header validation pattern (for example validating `content-type` and status)

## Security and Best Practices
- Never commit real credentials, tokens, or decrypted secret values.
- Treat `.auth/user.json` as sensitive session state and keep it local-only when possible.
- Prefer environment variables over hardcoded credentials in test files.
- Avoid logging decrypted credentials in test output.

## Current Limitations / Next Improvements
- Add `tsconfig.json` with `resolveJsonModule` for reliable JSON imports in TypeScript.
- Extract a reusable API client fixture for cleaner API test setup.
- Separate UI and API projects more cleanly in Playwright config.
- Tighten secret handling and reduce sensitive logging paths.
