/**
 * Data Generator utility for creating test data
 */
export class DataGenerator {
  /**
   * Generate random string
   */
  static randomString(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static randomEmail(domain = 'example.com'): string {
    const username = this.randomString(10).toLowerCase();
    return `${username}@${domain}`;
  }

  /**
   * Generate random number in range
   */
  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random phone number
   */
  static randomPhoneNumber(countryCode = '+1'): string {
    const areaCode = this.randomNumber(200, 999);
    const prefix = this.randomNumber(200, 999);
    const lineNumber = this.randomNumber(1000, 9999);
    return `${countryCode} (${areaCode}) ${prefix}-${lineNumber}`;
  }

  /**
   * Generate random date between two dates
   */
  static randomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  /**
   * Generate random boolean
   */
  static randomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Generate random item from array
   */
  static randomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generate random UUID
   */
  static randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Generate random color hex
   */
  static randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  /**
   * Generate random password
   */
  static randomPassword(length = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all = lowercase + uppercase + numbers + special;

    let password = '';
    password += this.randomItem(uppercase.split(''));
    password += this.randomItem(lowercase.split(''));
    password += this.randomItem(numbers.split(''));
    password += this.randomItem(special.split(''));

    for (let i = 4; i < length; i++) {
      password += this.randomItem(all.split(''));
    }

    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  /**
   * Generate random user object
   */
  static randomUser() {
    return {
      id: this.randomUUID(),
      firstName: this.randomString(8),
      lastName: this.randomString(10),
      email: this.randomEmail(),
      phone: this.randomPhoneNumber(),
      password: this.randomPassword(),
      createdAt: this.randomDate(
        new Date(2020, 0, 1),
        new Date()
      ).toISOString(),
    };
  }

  /**
   * Generate random address
   */
  static randomAddress() {
    return {
      street: `${this.randomNumber(1, 9999)} ${this.randomString(8)} St`,
      city: this.randomString(10),
      state: this.randomString(2).toUpperCase(),
      zipCode: this.randomNumber(10000, 99999).toString(),
      country: 'USA',
    };
  }
}
