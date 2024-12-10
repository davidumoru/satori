export class OpenAIServiceError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'OpenAIServiceError';
  }
}

export class InvalidResponseError extends OpenAIServiceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = 'InvalidResponseError';
  }
}

export class APIError extends OpenAIServiceError {
  constructor(message: string, cause?: unknown) {
    super(message, cause);
    this.name = 'APIError';
  }
}