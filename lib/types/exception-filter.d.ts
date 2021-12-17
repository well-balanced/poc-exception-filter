import { ArgumentsHost, ExceptionFilter, HttpException as NestHttpException } from "@nestjs/common";
import { SSE } from "exceptions";
export declare class CustomExceptionsFilter implements ExceptionFilter {
    catch(exception: SSE | NestHttpException | unknown, host: ArgumentsHost): void;
}
//# sourceMappingURL=exception-filter.d.ts.map