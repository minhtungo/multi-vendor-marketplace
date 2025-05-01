export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational?: boolean;
	public readonly details?: any;

	constructor(message: string, statusCode: number, isOperational?: boolean, details?: any) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.details = details;

		Error.captureStackTrace(this);
	}
}

export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404, true);
	}
}

export class ValidationError extends AppError {
	constructor(message = "Invalid request data", details?: any) {
		super(message, 422, true, details);
	}
}

export class AuthError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(message, 403);
	}
}

export class InternalServerError extends AppError {
	constructor(message = "Internal server error") {
		super(message, 500);
	}
}

export class DatabaseError extends AppError {
	constructor(message = "Database error") {
		super(message, 500);
	}
}

export class RateLimitError extends AppError {
	constructor(message = "Too many requests. Please try again later.") {
		super(message, 429);
	}
}
