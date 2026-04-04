# Playwright with TypeScript Automation Framework

## Overview
This project is a Playwright + TypeScript automation framework designed for OrangeHRM UI coverage and enterprise-style API automation. It uses the Page Object Model with layered UI fixtures, a dedicated API client layer for Restful Booker, environment-aware configuration through `dotenv`, and Playwright project boundaries so UI and API suites can evolve independently.

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
- `api/`: API clients, config, models, factories, and assertion helpers
- `data/`: JSON test data files
- `env-files/`: Environment-specific `.env` files
- `utils/`: Shared utility classes

Fixture chain used in UI specs:
- `pom-fixtures` -> `common-fixtures` -> `hooks-fixture`

Fixture chain used in API specs:
- `api-fixtures` -> domain clients / domain contracts / workflows / shared HTTP assertions

Scalable API layout:
- `api/core/`: cross-domain config, HTTP primitives, and generic assertions
- `api/domains/<domain>/clients`: endpoint clients for one domain
- `api/domains/<domain>/contracts`: response shape and business contract assertions
- `api/domains/<domain>/data`: factories/builders for domain payloads
- `api/domains/<domain>/services`: reusable multi-step workflows
- `tests/api/<domain>/...`: specs grouped by business capability, not HTTP verb

## Authentication Model
This framework uses a project-dependency pattern for UI authentication:
- `SetupAuth` project runs `tests/ui/global-setup.spec.ts`
- `chromium` project depends on `SetupAuth`
- Auth state is stored in `.auth/user.json`

API auth for Restful Booker is handled by the API client layer using `/auth` token generation or centralized Basic Auth headers.

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
- If `ENV_NAME` is not set, it falls back to `./env-files/.env.demo`

Safe environment variable contract example:

```env
BASE_URL=https://example-app-url
USERNAME=<encrypted-or-placeholder-username>
PASSWORD=<encrypted-or-placeholder-password>
API_BASE_URL=https://restful-booker.herokuapp.com
API_USERNAME=admin
API_PASSWORD=password123
API_REQUEST_TIMEOUT_MS=30000
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
npm run test:api
npm run test:api:booker
```

Useful targeted runs:

```bash
npx playwright test tests/api/restful-booker --project=api
npx playwright test tests/api/restful-booker/auth/auth.spec.ts --project=api
npx playwright test tests/api/restful-booker/booking/booking.spec.ts --project=api
npx playwright test --grep "<tag>"
```

Headed vs headless:
- Headed mode (`--headed`) is useful for local debugging and observing UI behavior.
- Headless mode is faster and better suited for CI and regular regression runs.

## Reporting and Debugging
Current behavior from `playwright.config.ts`:
- List reporter in terminal and HTML report on disk
- Screenshot capture: `only-on-failure`
- Video capture: `retain-on-failure`
- Trace: `retain-on-failure`

Useful rerun pattern for failed tests:

```bash
npm run test_last_failed
```

## API Testing Notes
The API framework now centers on reusable abstractions instead of direct `request` calls inside specs.

Key components:
- `api/core/config/api-config.ts`: central API environment contract
- `api/core/http/base-api-client.ts`: typed request wrapper with shared timeout handling
- `api/domains/restful-booker/clients/*.ts`: Booker endpoint clients
- `api/domains/restful-booker/contracts/*.ts`: Booker response and contract validation
- `api/domains/restful-booker/data/*.ts`: Booker payload builders
- `api/domains/restful-booker/services/*.ts`: Booker business workflows
- `api/core/assertions/api-expect.ts`: reusable HTTP-level assertions
- `fixtures/api-fixtures.ts`: Playwright fixtures exposing the API layer to tests

Current API coverage includes:
- Fetch all bookings
- Fetch a booking by ID
- Create a booking
- Update a booking with token auth
- Update a booking with basic auth
- Negative auth validation

## Security and Best Practices
- Never commit real credentials, tokens, or decrypted secret values.
- Treat `.auth/user.json` as sensitive session state and keep it local-only when possible.
- Prefer environment variables over hardcoded credentials in test files.
- Avoid logging decrypted credentials in test output.

## Current Limitations / Next Improvements
- Add deletion and cleanup flows if the target API starts enforcing test data quotas.
- Introduce schema validation tooling if you want full response contract enforcement against OpenAPI or JSON Schema.
- Add CI pipelines that split `@smoke`, `@regression`, and `@negative` API suites into separate jobs.
