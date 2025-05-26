export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public isAuthError: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
