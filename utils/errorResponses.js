class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequest extends ErrorResponse {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

const isCustomError = error => error instanceof BadRequest;

module.exports = {
  ErrorResponse,
  BadRequest,
  isCustomError,
};