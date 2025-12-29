/**
 * Test data for user-related tests
 */
export const testUsers = {
  validUser: {
    email: 'test@example.com',
    password: 'Test@12345',
    firstName: 'John',
    lastName: 'Doe',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrong123',
  },
  adminUser: {
    email: 'admin@example.com',
    password: 'Admin@12345',
    role: 'admin',
  },
};

/**
 * Test data for navigation links
 */
export const navigationLinks = {
  home: '/',
  docs: '/docs/intro',
  api: '/docs/api/class-playwright',
  community: '/community/welcome',
};

/**
 * Test data for search queries
 */
export const searchQueries = {
  valid: ['playwright', 'test', 'browser', 'automation'],
  invalid: ['xyzabc123', '!@#$%^&*()'],
};

/**
 * Test data for timeouts
 */
export const timeouts = {
  short: 5000,
  medium: 15000,
  long: 30000,
  extraLong: 60000,
};
