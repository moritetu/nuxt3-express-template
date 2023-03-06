import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export class BaseError extends Error {
  constructor(e?: string) {
    super(e)
    this.name = new.target.name

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }

    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class HttpError extends BaseError {
  public statusCode: number
  public statusMessage: string
  public description?: string

  constructor(status: number, message?: string, description?: string) {
    super(message)
    this.statusCode = status || StatusCodes.INTERNAL_SERVER_ERROR
    this.statusMessage = getReasonPhrase(status)
    this.description = description
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      statusMessage: this.statusMessage,
      description: this.description,
    }
  }
}

export class ApplicationError extends HttpError {
  constructor(message?: string, description?: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message)
    this.statusMessage = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    this.description = description
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string, description?: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message)
    this.statusMessage = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    this.description = description
  }
}
