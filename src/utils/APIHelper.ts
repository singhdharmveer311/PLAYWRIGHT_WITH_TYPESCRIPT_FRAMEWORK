import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from './Logger';

/**
 * API Helper for making HTTP requests
 */
export class APIHelper {
  private context: APIRequestContext;
  private baseURL: string;

  constructor(context: APIRequestContext, baseURL: string) {
    this.context = context;
    this.baseURL = baseURL;
  }

  /**
   * Make GET request
   */
  async get(endpoint: string, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    Logger.info(`GET: ${url}`);
    
    const response = await this.context.get(url, options);
    Logger.debug(`Response Status: ${response.status()}`);
    
    return response;
  }

  /**
   * Make POST request
   */
  async post(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    Logger.info(`POST: ${url}`);
    
    const response = await this.context.post(url, {
      ...options,
      data,
    });
    Logger.debug(`Response Status: ${response.status()}`);
    
    return response;
  }

  /**
   * Make PUT request
   */
  async put(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    Logger.info(`PUT: ${url}`);
    
    const response = await this.context.put(url, {
      ...options,
      data,
    });
    Logger.debug(`Response Status: ${response.status()}`);
    
    return response;
  }

  /**
   * Make PATCH request
   */
  async patch(endpoint: string, data?: any, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    Logger.info(`PATCH: ${url}`);
    
    const response = await this.context.patch(url, {
      ...options,
      data,
    });
    Logger.debug(`Response Status: ${response.status()}`);
    
    return response;
  }

  /**
   * Make DELETE request
   */
  async delete(endpoint: string, options?: any): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`;
    Logger.info(`DELETE: ${url}`);
    
    const response = await this.context.delete(url, options);
    Logger.debug(`Response Status: ${response.status()}`);
    
    return response;
  }

  /**
   * Validate response status
   */
  validateStatus(response: APIResponse, expectedStatus: number): void {
    const actualStatus = response.status();
    if (actualStatus !== expectedStatus) {
      Logger.error(
        `Expected status ${expectedStatus}, but got ${actualStatus}`
      );
      throw new Error(
        `Status code mismatch: expected ${expectedStatus}, got ${actualStatus}`
      );
    }
    Logger.success(`Status code validation passed: ${actualStatus}`);
  }

  /**
   * Get response body as JSON
   */
  async getJSON(response: APIResponse): Promise<any> {
    try {
      const json = await response.json();
      Logger.debug(`Response Body: ${JSON.stringify(json, null, 2)}`);
      return json;
    } catch (error) {
      Logger.error('Failed to parse JSON response');
      throw error;
    }
  }

  /**
   * Get response body as text
   */
  async getText(response: APIResponse): Promise<string> {
    const text = await response.text();
    Logger.debug(`Response Body: ${text}`);
    return text;
  }
}
