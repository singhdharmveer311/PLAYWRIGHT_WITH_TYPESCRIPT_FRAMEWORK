import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';
import { Logger } from './Logger';

/**
 * Screenshot utility for capturing and managing screenshots
 */
export class ScreenshotHelper {
  private static screenshotsDir = path.join(process.cwd(), 'screenshots');

  /**
   * Ensure screenshots directory exists
   */
  private static ensureScreenshotsDir(): void {
    if (!fs.existsSync(this.screenshotsDir)) {
      fs.mkdirSync(this.screenshotsDir, { recursive: true });
    }
  }

  /**
   * Take full page screenshot
   */
  static async takeFullPageScreenshot(
    page: Page,
    name: string
  ): Promise<string> {
    this.ensureScreenshotsDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}_${timestamp}.png`;
    const filepath = path.join(this.screenshotsDir, filename);

    Logger.info(`Taking full page screenshot: ${filename}`);
    await page.screenshot({ path: filepath, fullPage: true });
    Logger.success(`Screenshot saved: ${filepath}`);

    return filepath;
  }

  /**
   * Take viewport screenshot
   */
  static async takeViewportScreenshot(
    page: Page,
    name: string
  ): Promise<string> {
    this.ensureScreenshotsDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}_${timestamp}.png`;
    const filepath = path.join(this.screenshotsDir, filename);

    Logger.info(`Taking viewport screenshot: ${filename}`);
    await page.screenshot({ path: filepath });
    Logger.success(`Screenshot saved: ${filepath}`);

    return filepath;
  }

  /**
   * Take element screenshot
   */
  static async takeElementScreenshot(
    page: Page,
    selector: string,
    name: string
  ): Promise<string> {
    this.ensureScreenshotsDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}_${timestamp}.png`;
    const filepath = path.join(this.screenshotsDir, filename);

    Logger.info(`Taking element screenshot: ${filename}`);
    const element = page.locator(selector);
    await element.screenshot({ path: filepath });
    Logger.success(`Screenshot saved: ${filepath}`);

    return filepath;
  }

  /**
   * Clean old screenshots
   */
  static cleanOldScreenshots(daysOld = 7): void {
    this.ensureScreenshotsDir();
    const files = fs.readdirSync(this.screenshotsDir);
    const now = Date.now();
    const maxAge = daysOld * 24 * 60 * 60 * 1000;

    files.forEach((file) => {
      const filepath = path.join(this.screenshotsDir, file);
      const stats = fs.statSync(filepath);
      const age = now - stats.mtimeMs;

      if (age > maxAge) {
        Logger.debug(`Deleting old screenshot: ${file}`);
        fs.unlinkSync(filepath);
      }
    });

    Logger.info(`Cleaned screenshots older than ${daysOld} days`);
  }
}
