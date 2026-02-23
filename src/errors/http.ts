export class NotFoundError extends Error {
  constructor(filter?: string) {
    super('Not found');
    this.name = 'NotFoundError';
    this.message = `O registro '${filter || ''}' não foi encontrado!`;
    this.stack = '';
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  });
}

export class ServerError extends Error {
  constructor(error: Error) {
    super('Server');
    this.name = 'ServerError';
    this.message = error?.message || (error as any);
    this.stack = '';
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  });
}

export class BadRequestError extends Error {
  constructor(error: Error) {
    super('BadRequest');
    this.name = 'BadRequestError';
    this.message = error?.message;
    this.stack = '';
  }

  error = () => ({
    name: this.name,
    message: this.message,
    stack: this.stack,
  });
}
