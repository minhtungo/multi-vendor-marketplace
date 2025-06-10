export class MessagingError extends Error {
  constructor(
    message: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'MessagingError';
  }
}

export class ConnectionError extends MessagingError {
  constructor(message: string) {
    super(message, 'CONNECTION_ERROR');
    this.name = 'ConnectionError';
  }
}

export class PublishError extends MessagingError {
  constructor(message: string) {
    super(message, 'PUBLISH_ERROR');
    this.name = 'PublishError';
  }
}

export class ConsumeError extends MessagingError {
  constructor(message: string) {
    super(message, 'CONSUME_ERROR');
    this.name = 'ConsumeError';
  }
}
