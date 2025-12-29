import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * Base Page class with common page operations
 */
export class BasePage {
  protected page: Page;
  protected readonly baseURL: string;

  constructor(page: Page, baseURL: string = process.env.BASE_URL || 'https://playwright.dev') {
    this.page = page;
    this.baseURL = baseURL;
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = ''): Promise<void> {
    const url = `${this.baseURL}${path}`;
    Logger.step(`Navigating to: ${url}`);
    await this.page.goto(url);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    const title = await this.page.title();
    Logger.debug(`Page title: ${title}`);
    return title;
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    Logger.debug('Waiting for page to load');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click element with logging
   */
  async click(locator: Locator, description?: string): Promise<void> {
    Logger.step(`Clicking on: ${description || 'element'}`);
    await locator.click();
  }

  /**
   * Fill input field with logging
   */
  async fill(locator: Locator, value: string, description?: string): Promise<void> {
    Logger.step(`Filling ${description || 'field'} with: ${value}`);
    await locator.fill(value);
  }

  /**
   * Type into input field with logging
   */
  async type(locator: Locator, value: string, description?: string): Promise<void> {
    Logger.step(`Typing into ${description || 'field'}: ${value}`);
    await locator.type(value);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string, description?: string): Promise<void> {
    Logger.step(`Selecting option ${value} from ${description || 'dropdown'}`);
    await locator.selectOption(value);
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    const visible = await locator.isVisible();
    Logger.debug(`Element visibility: ${visible}`);
    return visible;
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, description?: string): Promise<void> {
    Logger.debug(`Waiting for ${description || 'element'} to be visible`);
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Get text from element
   */
  async getText(locator: Locator): Promise<string> {
    const text = await locator.textContent();
    Logger.debug(`Element text: ${text}`);
    return text || '';
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    Logger.debug(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    Logger.debug('Scrolling element into view');
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Get current URL
   */
  getCurrentURL(): string {
    const url = this.page.url();
    Logger.debug(`Current URL: ${url}`);
    return url;
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    Logger.step('Reloading page');
    await this.page.reload();
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    Logger.step('Navigating back');
    await this.page.goBack();
  }

  /**
   * Wait for specific time
   */
  async wait(milliseconds: number): Promise<void> {
    Logger.debug(`Waiting for ${milliseconds}ms`);
    await this.page.waitForTimeout(milliseconds);
  }
}
