"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFailException = exports.InvalidPasswordException = exports.UnauthorizedException = exports.TokenValidationException = exports.NoPermissionException = exports.NotFoundException = exports.ValidationException = exports.SSE = exports.PrivateEC = exports.PublicEC = void 0;
const common_1 = require("@nestjs/common");
const errorNames = {
    [common_1.HttpStatus.BAD_REQUEST]: "Bad Request",
    [common_1.HttpStatus.UNAUTHORIZED]: "Unauthorized",
    [common_1.HttpStatus.FORBIDDEN]: "Forbidden",
    [common_1.HttpStatus.NOT_FOUND]: "Not Found",
    [common_1.HttpStatus.CONFLICT]: "Conflict",
    [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: "Internal Server Error",
};
var PublicEC;
(function (PublicEC) {
    PublicEC["Validation"] = "validation-fail";
    PublicEC["PropertyRequired"] = "property-required";
    PublicEC["NotFound"] = "not-found";
    PublicEC["NoPermission"] = "no-permission";
    PublicEC["Unauthorized"] = "unauthorized";
    PublicEC["PostExistence"] = "post-existence";
    PublicEC["TokenValidation"] = "token-validation-fail";
    PublicEC["InvalidPassword"] = "invalid-password";
    PublicEC["postLikeDisallow"] = "post-like-disallow";
})(PublicEC = exports.PublicEC || (exports.PublicEC = {}));
var PrivateEC;
(function (PrivateEC) {
    PrivateEC["Transaction"] = "transaction-fail";
    PrivateEC["DuplicateKey"] = "duplicate-key";
})(PrivateEC = exports.PrivateEC || (exports.PrivateEC = {}));
class SSE extends Error {
    constructor(msg) {
        super(msg);
    }
    get errorCode() {
        return this._errorCode;
    }
    get error() {
        return this._error;
    }
    getStatus() {
        return this._statusCode;
    }
}
exports.SSE = SSE;
class ValidationException extends SSE {
    constructor(msg = "validation error") {
        super(msg);
        this._errorCode = PublicEC.Validation;
        this._statusCode = common_1.HttpStatus.BAD_REQUEST;
        this._error = errorNames[this._statusCode];
        Error.captureStackTrace(this, ValidationException);
    }
}
exports.ValidationException = ValidationException;
class NotFoundException extends SSE {
    constructor(msg = "Result does not exist") {
        super(msg);
        this._errorCode = PublicEC.NotFound;
        this._statusCode = common_1.HttpStatus.NOT_FOUND;
        this._error = errorNames[this._statusCode];
        Error.captureStackTrace(this, NotFoundException);
    }
}
exports.NotFoundException = NotFoundException;
class NoPermissionException extends SSE {
    constructor(msg = "no permission to access") {
        super(msg);
        this._errorCode = PublicEC.NoPermission;
        this._statusCode = common_1.HttpStatus.FORBIDDEN;
        this._error = errorNames[this._statusCode];
        Error.captureStackTrace(this, NoPermissionException);
    }
}
exports.NoPermissionException = NoPermissionException;
class TokenValidationException extends SSE {
    constructor(msg = "invalid token") {
        super(msg);
        this._errorCode = PublicEC.TokenValidation;
        this._statusCode = common_1.HttpStatus.UNAUTHORIZED;
        this._error = errorNames[this._statusCode];
        Error.captureStackTrace(this, TokenValidationException);
    }
}
exports.TokenValidationException = TokenValidationException;
class UnauthorizedException extends SSE {
    constructor(msg = "unauthorized") {
        super(msg);
        this._errorCode = PublicEC.Unauthorized;
        this._statusCode = common_1.HttpStatus.UNAUTHORIZED;
        this._error = errorNames[this._statusCode];
        Error.captureStackTrace(this, UnauthorizedException);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class InvalidPasswordException extends SSE {
    constructor(msg = "failed to compare password") {
        super(msg);
        this._errorCode = PublicEC.InvalidPassword;
        this._statusCode = common_1.HttpStatus.UNAUTHORIZED;
        this._error = errorNames[this._statusCode];
        Error.captureStackTrace(this, InvalidPasswordException);
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
class TransactionFailException extends SSE {
    constructor(msg = "transaction failed") {
        super(msg);
        this._errorCode = PrivateEC.Transaction;
        this._statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this._error = errorNames[this._statusCode];
        Error.captureStackTrace(this, TransactionFailException);
    }
}
exports.TransactionFailException = TransactionFailException;
