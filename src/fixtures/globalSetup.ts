import { FullConfig } from '@playwright/test';
import { Logger } from '../src/utils/Logger';
import ConfigManager from '../src/utils/ConfigManager';

/**
 * Global setup that runs before all tests
 */
async function globalSetup(config: FullConfig) {
  Logger.info('='.repeat(80));
  Logger.info('Starting Global Setup');
  Logger.info('='.repeat(80));

  // Log configuration
  Logger.info('Test Configuration:');
  Logger.info(`- Base URL: ${ConfigManager.get('BASE_URL')}`);
  Logger.info(`- Environment: ${ConfigManager.get('ENV')}`);
  Logger.info(`- Browser: ${ConfigManager.get('BROWSER')}`);
  Logger.info(`- Headless: ${ConfigManager.get('HEADLESS')}`);
  Logger.info(`- CI Mode: ${ConfigManager.get('CI')}`);

  // Log test directories
  Logger.info(`- Test Directory: ${config.projects[0]?.testDir || 'tests'}`);

  // You can add any setup logic here:
  // - Database setup
  // - API authentication
  // - Test data preparation
  // - Starting servers
  // - Environment validation

  Logger.success('Global Setup Completed');
  Logger.info('='.repeat(80));
}

export default globalSetup;
