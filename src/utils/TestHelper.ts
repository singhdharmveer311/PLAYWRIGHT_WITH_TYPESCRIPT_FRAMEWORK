import { Page } from '@playwright/test';
import { Logger } from './Logger';

/**
 * Helper utilities for common test operations
 */
export class TestHelper {
  /**
   * Wait for element and click
   */
  static async waitAndClick(page: Page, selector: string): Promise<void> {
    Logger.debug(`Waiting for element: ${selector}`);
    await page.waitForSelector(selector);
    await page.click(selector);
  }

  /**
   * Wait for element and fill
   */
  static async waitAndFill(page: Page, selector: string, value: string): Promise<void> {
    Logger.debug(`Waiting for element: ${selector}`);
    await page.waitForSelector(selector);
    await page.fill(selector, value);
  }

  /**
   * Wait for navigation
   */
  static async waitForNavigation(page: Page, url?: string): Promise<void> {
    if (url) {
      Logger.debug(`Waiting for navigation to: ${url}`);
      await page.waitForURL(url);
    } else {
      Logger.debug('Waiting for navigation');
      await page.waitForLoadState('load');
    }
  }

  /**
   * Get element count
   */
  static async getElementCount(page: Page, selector: string): Promise<number> {
    const count = await page.locator(selector).count();
    Logger.debug(`Element count for ${selector}: ${count}`);
    return count;
  }

  /**
   * Wait for element to be visible
   */
  static async waitForVisible(page: Page, selector: string, timeout = 30000): Promise<void> {
    Logger.debug(`Waiting for element to be visible: ${selector}`);
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  static async waitForHidden(page: Page, selector: string, timeout = 30000): Promise<void> {
    Logger.debug(`Waiting for element to be hidden: ${selector}`);
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Check if element exists
   */
  static async elementExists(page: Page, selector: string): Promise<boolean> {
    const count = await page.locator(selector).count();
    return count > 0;
  }

  /**
   * Get random number between min and max
   */
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Format date
   */
  static formatDate(date: Date, format = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  }

  /**
   * Sleep for specified milliseconds
   */
  static async sleep(ms: number): Promise<void> {
    Logger.debug(`Sleeping for ${ms}ms`);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Retry function with exponential backoff
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        Logger.warn(`Attempt ${i + 1} failed: ${lastError.message}`);
        
        if (i < maxRetries - 1) {
          const waitTime = delay * Math.pow(2, i);
          Logger.debug(`Retrying in ${waitTime}ms...`);
          await this.sleep(waitTime);
        }
      }
    }
    
    throw lastError;
  }
}
