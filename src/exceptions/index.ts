import { HttpStatus } from "@nestjs/common";

const errorNames: { [key in number]: string } = {
  /**
   * 4xx
   */
  [HttpStatus.BAD_REQUEST]: "Bad Request",
  [HttpStatus.UNAUTHORIZED]: "Unauthorized",
  [HttpStatus.FORBIDDEN]: "Forbidden",
  [HttpStatus.NOT_FOUND]: "Not Found",
  [HttpStatus.CONFLICT]: "Conflict",

  /**
   * 5xx
   */
  [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
} as const;

export enum PublicEC {
  Validation = "validation-fail",
  PropertyRequired = "property-required",
  NotFound = "not-found",
  NoPermission = "no-permission",
  Unauthorized = "unauthorized",
  PostExistence = "post-existence",
  TokenValidation = "token-validation-fail",
  InvalidPassword = "invalid-password",
  postLikeDisallow = "post-like-disallow",
}

export enum PrivateEC {
  Transaction = "transaction-fail",
  DuplicateKey = "duplicate-key",
}

export type SSEC = PublicEC | PrivateEC;

export class SSE extends Error {
  protected _errorCode: SSEC;
  protected _statusCode: HttpStatus;
  protected _error: string;

  constructor(msg: string) {
    super(msg);
  }

  get errorCode(): SSEC {
    return this._errorCode;
  }

  get error(): string {
    return this._error;
  }

  getStatus() {
    return this._statusCode;
  }
}

export class ValidationException extends SSE {
  _errorCode = PublicEC.Validation;
  _statusCode = HttpStatus.BAD_REQUEST;
  _error = errorNames[this._statusCode];

  constructor(msg = "validation error") {
    super(msg);

    Error.captureStackTrace(this, ValidationException);
  }
}

export class NotFoundException extends SSE {
  _errorCode = PublicEC.NotFound;
  _statusCode = HttpStatus.NOT_FOUND;
  _error = errorNames[this._statusCode];

  constructor(msg = "Result does not exist") {
    super(msg);
    Error.captureStackTrace(this, NotFoundException);
  }
}

export class NoPermissionException extends SSE {
  _errorCode = PublicEC.NoPermission;
  _statusCode = HttpStatus.FORBIDDEN;
  _error = errorNames[this._statusCode];

  constructor(msg = "no permission to access") {
    super(msg);
    Error.captureStackTrace(this, NoPermissionException);
  }
}

export class TokenValidationException extends SSE {
  _errorCode = PublicEC.TokenValidation;
  _statusCode = HttpStatus.UNAUTHORIZED;
  _error = errorNames[this._statusCode];

  constructor(msg = "invalid token") {
    super(msg);
    Error.captureStackTrace(this, TokenValidationException);
  }
}

export class UnauthorizedException extends SSE {
  _errorCode = PublicEC.Unauthorized;
  _statusCode = HttpStatus.UNAUTHORIZED;
  _error = errorNames[this._statusCode];

  constructor(msg = "unauthorized") {
    super(msg);
    Error.captureStackTrace(this, UnauthorizedException);
  }
}

export class InvalidPasswordException extends SSE {
  _errorCode = PublicEC.InvalidPassword;
  _statusCode = HttpStatus.UNAUTHORIZED;
  _error = errorNames[this._statusCode];

  constructor(msg = "failed to compare password") {
    super(msg);
    Error.captureStackTrace(this, InvalidPasswordException);
  }
}

export class TransactionFailException extends SSE {
  _errorCode = PrivateEC.Transaction;
  _statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  _error = errorNames[this._statusCode];

  constructor(msg = "transaction failed") {
    super(msg);
    Error.captureStackTrace(this, TransactionFailException);
  }
}
