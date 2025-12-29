import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/BasePage';

/**
 * Getting Started Page Object Model
 */
export class GettingStartedPage extends BasePage {
  // Locators
  private readonly installationSection: Locator;
  private readonly firstTestSection: Locator;
  private readonly runningTestsSection: Locator;
  private readonly configurationSection: Locator;
  private readonly sidebarNavigation: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.installationSection = page.locator('text=Installation').first();
    this.firstTestSection = page.locator('text=First test').first();
    this.runningTestsSection = page.locator('text=Running tests').first();
    this.configurationSection = page.locator('text=Configuration').first();
    this.sidebarNavigation = page.locator('aside[class*="sidebar"]');
  }

  /**
   * Navigate to Getting Started page
   */
  async navigateToGettingStarted(): Promise<void> {
    await this.goto('/docs/intro');
  }

  /**
   * Verify Getting Started page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    await this.waitForPageLoad();
    return await this.isVisible(this.installationSection);
  }

  /**
   * Click installation section
   */
  async clickInstallationSection(): Promise<void> {
    await this.click(this.installationSection, 'Installation section');
  }

  /**
   * Verify sidebar is visible
   */
  async isSidebarVisible(): Promise<boolean> {
    return await this.isVisible(this.sidebarNavigation);
  }

  /**
   * Get page heading
   */
  async getPageHeading(): Promise<string> {
    const heading = this.page.locator('h1').first();
    return await this.getText(heading);
  }
}
