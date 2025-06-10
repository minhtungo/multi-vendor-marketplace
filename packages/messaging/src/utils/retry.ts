export class RetryManager {
  static async executeWithRetry<T>(fn: () => Promise<T>, maxAttempts: number = 3, delay: number = 1000): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxAttempts) {
          throw lastError;
        }

        await this.sleep(delay * Math.pow(2, attempt - 1)); // Exponential backoff
      }
    }

    throw lastError!;
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
