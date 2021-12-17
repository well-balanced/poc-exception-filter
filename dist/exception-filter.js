"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("exceptions");
let CustomExceptionsFilter = class CustomExceptionsFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let statusCode;
        let message;
        let errorCode;
        let error;
        const isNestException = exception instanceof common_1.HttpException;
        const isSSException = exception instanceof exceptions_1.SSE;
        const isPrivateError = Object
            .values(exceptions_1.PrivateEC)
            .includes((_a = exception) === null || _a === void 0 ? void 0 : _a.errorCode);
        if (isSSException && !isPrivateError) {
            statusCode = exception.getStatus();
            message = exception.message;
            errorCode = exception.errorCode;
        }
        else if (isNestException) {
            statusCode = exception.getStatus();
            const response = exception.getResponse();
            error = response.error;
            message = Array.isArray(response.message)
                ? response.message[0]
                : response.message;
        }
        else {
            statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            error = "Internal Server Error";
        }
        response.status(statusCode).json(Object.assign(Object.assign({ error }, (errorCode && { errorCode })), { statusCode,
            message }));
    }
};
CustomExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], CustomExceptionsFilter);
exports.CustomExceptionsFilter = CustomExceptionsFilter;
//# sourceMappingURL=exception-filter.js.map