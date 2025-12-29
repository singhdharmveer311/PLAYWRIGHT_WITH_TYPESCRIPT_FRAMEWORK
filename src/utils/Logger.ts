import fs from 'fs';
import path from 'path';

/**
 * Logger utility for enterprise-level logging
 */
export class Logger {
  private static logsDir = path.join(process.cwd(), 'logs');

  /**
   * Ensure logs directory exists
   */
  private static ensureLogsDir(): void {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  /**
   * Get timestamp in ISO format
   */
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Write log to file
   */
  private static writeToFile(level: string, message: string): void {
    this.ensureLogsDir();
    const logFile = path.join(this.logsDir, `test-${new Date().toISOString().split('T')[0]}.log`);
    const logMessage = `[${this.getTimestamp()}] [${level}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  /**
   * Log info message
   */
  static info(message: string): void {
    const msg = `ℹ️  ${message}`;
    console.log(msg);
    this.writeToFile('INFO', message);
  }

  /**
   * Log error message
   */
  static error(message: string): void {
    const msg = `❌ ${message}`;
    console.error(msg);
    this.writeToFile('ERROR', message);
  }

  /**
   * Log warning message
   */
  static warn(message: string): void {
    const msg = `⚠️  ${message}`;
    console.warn(msg);
    this.writeToFile('WARN', message);
  }

  /**
   * Log debug message
   */
  static debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      const msg = `🔍 ${message}`;
      console.log(msg);
      this.writeToFile('DEBUG', message);
    }
  }

  /**
   * Log success message
   */
  static success(message: string): void {
    const msg = `✅ ${message}`;
    console.log(msg);
    this.writeToFile('SUCCESS', message);
  }

  /**
   * Log step message
   */
  static step(message: string): void {
    const msg = `📍 STEP: ${message}`;
    console.log(msg);
    this.writeToFile('STEP', message);
  }
}
