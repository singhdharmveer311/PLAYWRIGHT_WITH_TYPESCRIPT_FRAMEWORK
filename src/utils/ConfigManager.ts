import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration manager for environment-specific settings
 */
export class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, string>;

  private constructor() {
    this.config = new Map();
    this.loadConfig();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Load configuration from environment variables
   */
  private loadConfig(): void {
    // Application URLs
    this.config.set('BASE_URL', process.env.BASE_URL || 'https://playwright.dev');
    this.config.set('API_URL', process.env.API_URL || 'https://api.example.com');

    // Environment
    this.config.set('ENV', process.env.ENV || 'dev');
    this.config.set('CI', process.env.CI || 'false');

    // Timeouts
    this.config.set('DEFAULT_TIMEOUT', process.env.DEFAULT_TIMEOUT || '30000');
    this.config.set('ACTION_TIMEOUT', process.env.ACTION_TIMEOUT || '15000');

    // Browser settings
    this.config.set('HEADLESS', process.env.HEADLESS || 'true');
    this.config.set('BROWSER', process.env.BROWSER || 'chromium');

    // Credentials (should be stored securely in actual enterprise environments)
    this.config.set('TEST_USERNAME', process.env.TEST_USERNAME || 'test@example.com');
    this.config.set('TEST_PASSWORD', process.env.TEST_PASSWORD || 'password123');

    // Feature flags
    this.config.set('ENABLE_TRACING', process.env.ENABLE_TRACING || 'true');
    this.config.set('ENABLE_VIDEO', process.env.ENABLE_VIDEO || 'false');
    this.config.set('ENABLE_SCREENSHOTS', process.env.ENABLE_SCREENSHOTS || 'true');

    // Reporting
    this.config.set('REPORT_TYPE', process.env.REPORT_TYPE || 'html');
  }

  /**
   * Get configuration value
   */
  public get(key: string): string {
    const value = this.config.get(key);
    if (value === undefined) {
      throw new Error(`Configuration key "${key}" not found`);
    }
    return value;
  }

  /**
   * Get configuration value as number
   */
  public getNumber(key: string): number {
    return parseInt(this.get(key), 10);
  }

  /**
   * Get configuration value as boolean
   */
  public getBoolean(key: string): boolean {
    return this.get(key).toLowerCase() === 'true';
  }

  /**
   * Set configuration value
   */
  public set(key: string, value: string): void {
    this.config.set(key, value);
  }

  /**
   * Get all configuration as object
   */
  public getAll(): Record<string, string> {
    return Object.fromEntries(this.config);
  }
}

export default ConfigManager.getInstance();
