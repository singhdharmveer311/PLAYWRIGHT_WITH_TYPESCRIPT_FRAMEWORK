# Contributing to Playwright TypeScript Framework

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

Please be respectful and constructive in your interactions with other contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue describing:
   - The problem it solves
   - Proposed solution
   - Alternative solutions considered

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes following our coding standards
4. Write/update tests for your changes
5. Ensure all tests pass
6. Update documentation if needed
7. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
8. Push to your branch (`git push origin feature/AmazingFeature`)
9. Open a Pull Request

## Coding Standards

### TypeScript Guidelines

- Use TypeScript strict mode
- Define proper types and interfaces
- Avoid using `any` type when possible
- Use meaningful variable and function names
- Add JSDoc comments for public methods

### Testing Guidelines

- Write tests for new features
- Maintain or improve code coverage
- Follow existing test structure
- Use descriptive test names
- Use Page Object Model pattern

### Code Style

- Use ESLint and Prettier configurations provided
- Run `npm run lint` before committing
- Run `npm run format` to format code
- Keep functions small and focused
- Use async/await for asynchronous operations

### Commit Messages

Follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test changes
- `refactor:` for code refactoring
- `chore:` for maintenance tasks

Example: `feat: add login page object model`

## Development Setup

1. Clone your fork
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`
4. Create `.env` file from `.env.example`
5. Run tests: `npm test`

## Pull Request Process

1. Update README.md with details of changes if needed
2. Ensure all tests pass
3. Update documentation
4. Request review from maintainers
5. Address review feedback
6. Once approved, your PR will be merged

## Questions?

Feel free to create an issue for questions or discussions.

Thank you for contributing! 🎉
