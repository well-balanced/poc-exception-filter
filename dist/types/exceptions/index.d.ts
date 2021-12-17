import { HttpStatus } from "@nestjs/common";
export declare enum PublicEC {
    Validation = "validation-fail",
    PropertyRequired = "property-required",
    NotFound = "not-found",
    NoPermission = "no-permission",
    Unauthorized = "unauthorized",
    PostExistence = "post-existence",
    TokenValidation = "token-validation-fail",
    InvalidPassword = "invalid-password",
    postLikeDisallow = "post-like-disallow"
}
export declare enum PrivateEC {
    Transaction = "transaction-fail",
    DuplicateKey = "duplicate-key"
}
export declare type SSEC = PublicEC | PrivateEC;
export declare class SSE extends Error {
    protected _errorCode: SSEC;
    protected _statusCode: HttpStatus;
    protected _error: string;
    constructor(msg: string);
    get errorCode(): SSEC;
    get error(): string;
    getStatus(): HttpStatus;
}
export declare class ValidationException extends SSE {
    _errorCode: PublicEC;
    _statusCode: HttpStatus;
    _error: string;
    constructor(msg?: string);
}
export declare class NotFoundException extends SSE {
    _errorCode: PublicEC;
    _statusCode: HttpStatus;
    _error: string;
    constructor(msg?: string);
}
export declare class NoPermissionException extends SSE {
    _errorCode: PublicEC;
    _statusCode: HttpStatus;
    _error: string;
    constructor(msg?: string);
}
export declare class TokenValidationException extends SSE {
    _errorCode: PublicEC;
    _statusCode: HttpStatus;
    _error: string;
    constructor(msg?: string);
}
export declare class UnauthorizedException extends SSE {
    _errorCode: PublicEC;
    _statusCode: HttpStatus;
    _error: string;
    constructor(msg?: string);
}
export declare class InvalidPasswordException extends SSE {
    _errorCode: PublicEC;
    _statusCode: HttpStatus;
    _error: string;
    constructor(msg?: string);
}
export declare class TransactionFailException extends SSE {
    _errorCode: PrivateEC;
    _statusCode: HttpStatus;
    _error: string;
    constructor(msg?: string);
}
