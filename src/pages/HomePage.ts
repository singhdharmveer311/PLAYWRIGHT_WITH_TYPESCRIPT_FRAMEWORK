import { Page, Locator } from '@playwright/test';
import { BasePage } from '../core/BasePage';

/**
 * Home Page Object Model
 */
export class HomePage extends BasePage {
  // Locators
  private readonly getStartedLink: Locator;
  private readonly searchButton: Locator;
  private readonly navigationMenu: Locator;
  private readonly docsLink: Locator;
  private readonly apiLink: Locator;
  private readonly communityLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.navigationMenu = page.locator('nav[aria-label="Main"]');
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.apiLink = page.getByRole('link', { name: 'API' });
    this.communityLink = page.getByRole('link', { name: 'Community' });
  }

  /**
   * Navigate to home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/');
  }

  /**
   * Click Get Started
   */
  async clickGetStarted(): Promise<void> {
    await this.click(this.getStartedLink, 'Get Started link');
  }

  /**
   * Click Docs
   */
  async clickDocs(): Promise<void> {
    await this.click(this.docsLink, 'Docs link');
  }

  /**
   * Click API
   */
  async clickAPI(): Promise<void> {
    await this.click(this.apiLink, 'API link');
  }

  /**
   * Click Community
   */
  async clickCommunity(): Promise<void> {
    await this.click(this.communityLink, 'Community link');
  }

  /**
   * Verify home page is loaded
   */
  async verifyHomePageLoaded(): Promise<boolean> {
    await this.waitForPageLoad();
    return await this.isVisible(this.getStartedLink);
  }

  /**
   * Get navigation menu
   */
  getNavigationMenu(): Locator {
    return this.navigationMenu;
  }
}
